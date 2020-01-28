import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyAlXZS45GPlrvyxkM81NsoKnj5D8fK5CKk',
  authDomain: 'white-zebra-dev.firebaseapp.com',
  projectId: 'white-zebra-dev',
});

const { GoogleAuthProvider, FacebookAuthProvider } = firebase.auth;

export { FacebookAuthProvider, GoogleAuthProvider };
export default firebase;
