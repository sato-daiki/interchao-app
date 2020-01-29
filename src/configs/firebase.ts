import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: 'AIzaSyAlXZS45GPlrvyxkM81NsoKnj5D8fK5CKk',
  authDomain: 'white-zebra-dev.firebaseapp.com',
  databaseURL: 'https://white-zebra-dev.firebaseio.com',
  projectId: 'white-zebra-dev',
  storageBucket: 'white-zebra-dev.appspot.com',
  messagingSenderId: '975945165729',
  appId: '1:975945165729:web:04f22216a1d13f908fb9e0',
  measurementId: 'G-VV6Y43CCFX',
};

const { GoogleAuthProvider, FacebookAuthProvider } = firebase.auth;

export { FacebookAuthProvider, GoogleAuthProvider };
export default firebase;
