# 環境構築

yarn install

.env 　は渡して上げる必要ある
firebase deploy --only firestore:rules -P dev

### Publish

Expo XDE で「Publish」をクリックする。  
もしくは`exp publish`を実行

Expo クライアントアプリで PUBLISHED PROJECT から interchao を選択すると起動する。

## Prduction

- 中身の JS だけ更新する場合 → 2,3 だけで OK
- アプリをビルドし直して app store に申請する場合 → 1,2,4 を実行

### 1. version 更新

まず`app.json`の`version`, `buildNumber`, `versionCode`を更新する。

### 2. revision 更新

`app.json`の`revision`を更新する。  
publish する度に+1。新 version を build するときは 0 に戻す。

### 3-1. Publish

ターミナルで publish。（Expo XDE にて予めログインしておくこと)

.env を変更したときは`--clear`が必要

```
expo publish --release-channel production
expo publish --clear --release-channel production
```

### 3-2. UpdateFirebae

```
firebase deploy --only firestore:rules -P product
```

### 4. Build

※app.json の特定の項目を編集した場合 build が必要。そうでなければ publish だけで最新プログラムが反映される。
https://docs.expo.io/versions/latest/guides/publishing.html#limitations

```
expo build:ios --release-channel production
expo build:android --release-channel production
```

### 5.upload

```
expo upload:ios
expo upload:android
```

## メモ

firebase deploy --only firestore:rules -P product
expo publish --release-channel production

- master に merge する。（CircleCI でチェク OK なら次へ。結果は slack の develop チャンネルに返ってくる）
  https://github.com/interchao/interchao-app/compare/master...develop
