# リリース方法

- master に merge する。（CircleCI でチェク OK なら次へ。結果は slack の develop チャンネルに返ってくる）
- ビルドする
  expo build:ios

Choose the build type you would like → 　 archive を選択
Do you have access to the Apple account that will be used for submitting this
app to the App Store?　 → 　 Yes

.env 　は渡して上げる必要ある
firebase deploy --only firestore:rules
