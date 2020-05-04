# 環境構築

yarn install

.env 　は渡して上げる必要ある
firebase deploy --only firestore:rules -P default

# リリース方法

- master に merge する。（CircleCI でチェク OK なら次へ。結果は slack の develop チャンネルに返ってくる）
  https://github.com/interchao/interchao-app/compare/master...develop

- ビルドする
  expo build:ios --release-channel production

## リリース

expo upload:ios

## OTA Update

expo publish --release-channel production
