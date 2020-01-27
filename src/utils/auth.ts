import firebase from '../configs/firebase';

// ユーザ登録
export const emailSignup = (email: string, password: string): void => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      if (user) {
        console.log('Success to Signup');
      }
    })
    .catch(error => {
      console.log(error);
    });
};

// メール＆パスワードログイン
export const emailLogin = (email: string, password: string): void => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(response => {
      // alert("Login Success!");
    })
    .catch(error => {
      // alert(error.message);
    });
};

export default firebase;
