# 環境構築

yarn install

.env 　は渡して上げる必要ある
firebase deploy --only firestore:rules -P default

# リリース方法

- master に merge する。（CircleCI でチェク OK なら次へ。結果は slack の develop チャンネルに返ってくる）
  https://github.com/interchao/interchao-app/compare/master...develop

- ビルドする
  expo build:ios --release-channel production
  expo build:android --release-channel production

## リリース

expo upload:ios
expo upload:android

## OTA Update

firebase deploy --only firestore:rules -P product
expo publish --release-channel production
