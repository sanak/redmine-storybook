#!/usr/bin/env bash
set -Eeo pipefail

# Ref: https://github.com/docker-library/redmine/blob/master/6.0/bookworm/docker-entrypoint.sh

_fix_permissions() {
	# https://www.redmine.org/projects/redmine/wiki/RedmineInstall#Step-8-File-system-permissions
	local dirs=( config log public/plugin_assets tmp ) args=()
	if [ "$(id -u)" = '0' ]; then
		args+=( ${args[@]:+,} '(' '!' -user redmine -exec chown redmine:redmine '{}' + ')' )

		# https://github.com/docker-library/redmine/issues/268 - scanning "files" might be *really* expensive, so we should skip it if it seems like it's "already correct"
		local filesOwnerMode
		filesOwnerMode="$(stat -c '%U:%a' files)"
		if [ "$files" != 'redmine:755' ]; then
			dirs+=( files )
		fi
	fi
	# directories 755, files 644:
	args+=( ${args[@]:+,} '(' -type d '!' -perm 755 -exec sh -c 'chmod 755 "$@" 2>/dev/null || :' -- '{}' + ')' )
	args+=( ${args[@]:+,} '(' -type f '!' -perm 644 -exec sh -c 'chmod 644 "$@" 2>/dev/null || :' -- '{}' + ')' )
	find "${dirs[@]}" "${args[@]}"
}

_fix_permissions

# install additional gems for Gemfile.local and plugins
bundle check || bundle install

if [ ! -f config/initializers/secret_token.rb ]; then
	rake generate_secret_token
fi

rake db:migrate
rake redmine:plugins:migrate

# load customized fixtures
rake db:fixtures:load FIXTURES_PATH=./fixtures

# remove PID file to enable restarting the container
rm -f tmp/pids/server.pid

exec "$@"
