# Data

## 概要

RedmineのフィクスチャデータとDocker設定を管理するディレクトリです。

## Dockerコンテナの起動

```sh
cd data
docker compose up
```

## フィクスチャの保存

```sh
docker compose exec redmine rake -R ./tasks extract_fixtures_ext \
  DIR=./fixtures \
  SKIP_TABLES=tokens \
  OMIT_DEFAULT_OR_NIL=true
```
