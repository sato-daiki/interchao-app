# リリース方法  
- masterにmergeする。（CircleCIでチェクOKなら次へ。結果はslackのdevelopチャンネルに返ってくる）
- ビルドする
expo build:ios

Choose the build type you would like →　archiveを選択
 Do you have access to the Apple account that will be used for submitting this 
app to the App Store?　→　Yes
 
.env 　は渡して上げる必要ある
firebase deploy --only firestore:rules
