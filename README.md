# 環境構築

yarn install

.env 　は渡して上げる必要ある

### Publish

Expo XDE で「Publish」をクリックする。  
もしくは`exp publish`を実行

Expo クライアントアプリで PUBLISHED PROJECT から interchao を選択すると起動する。

## Prduction

- 中身の JS だけ更新する場合 → 2,3,4,5 だけで OK
- アプリをビルドし直して app store に申請する場合 → 1,2,4,5,6,7 を実行

### 1. version 更新

まず`app.json`の`version`, `buildNumber`, `versionCode`を更新する。

### 2. revision 更新

`app.json`の`revision`を更新する。  
publish する度に+1。新 version を build するときは 0 に戻す。

### 3. Publish

ターミナルで publish。（Expo XDE にて予めログインしておくこと)

.env を変更したときは`--clear`が必要

```
expo publish --release-channel production
expo publish --clear --release-channel production
```

### 4. UpdateFirebae（変更があった場合）

```
firebase deploy --only firestore:rules -P product
```

### 5. Firebase Fuction の更新（変更があった場合）

別プロジェクトの方

### 6. Build

※app.json の特定の項目を編集した場合 build が必要。そうでなければ publish だけで最新プログラムが反映される。
https://docs.expo.io/versions/latest/guides/publishing.html#limitations

```
expo build:ios --release-channel production
expo build:android --release-channel production
app bundleを選択
```

### 7.upload

```
expo upload:ios
expo upload:android
```

## Publish（web）

### 1.version を書く

webRevision を上げる。（基本はアプリと合わせたいが、web のみリリースする場合はずれる）

## 2.ビルド

```
1: npx expo-optimize
2: expo build:web --no-pwa
```

### デプロイ

```
1: web-build/index.htmlのdescriptionを手動で消す
2: firebase deploy --only hosting -P product
```

### デプロイ（検証）

```
firebase deploy --only hosting -P default
```

https://white-zebra-dev.web.app

## メモ

試験用アカウント

- データたくさんあり
  bigdata@aa.aa
  aaaaaa

firebase deploy --only firestore:rules -P default
androi がうまく起動しない時
expo start --tunnel

- master に merge する。（CircleCI でチェク OK なら次へ。結果は slack の develop チャンネルに返ってくる）
  https://github.com/interchao/interchao-app/compare/master...develop
