FROM redmine:5.0.2

RUN set -eux; \
  apt-get update; \
  apt-get install -y --no-install-recommends libfaketime; \
  rm -rf /var/lib/apt/lists/*;

COPY ./custom-entrypoint.sh /
ENTRYPOINT ["/custom-entrypoint.sh"]

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]
