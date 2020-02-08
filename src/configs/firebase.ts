import firebase from 'firebase';

// export const firebaseConfig = {
//   apiKey: 'AIzaSyAlXZS45GPlrvyxkM81NsoKnj5D8fK5CKk',
//   authDomain: 'white-zebra-dev.firebaseapp.com',
//   databaseURL: 'https://white-zebra-dev.firebaseio.com',
//   projectId: 'white-zebra-dev',
//   storageBucket: 'white-zebra-dev.appspot.com',
//   messagingSenderId: '975945165729',
//   appId: '1:975945165729:web:04f22216a1d13f908fb9e0',
//   measurementId: 'G-VV6Y43CCFX',
// };

export const firebaseConfig = {
  apiKey: 'AIzaSyDysrApwcn1GCRyjA_rhecZlQICmhR4poU',
  authDomain: 'white-zebra-5096f.firebaseapp.com',
  databaseURL: 'https://white-zebra-5096f.firebaseio.com',
  projectId: 'white-zebra-5096f',
  storageBucket: 'white-zebra-5096f.appspot.com',
  messagingSenderId: '862039416371',
  appId: '1:862039416371:web:6d61bcf6228ac65c9a4d46',
  measurementId: 'G-X65F72V219',
};
export const facebookConfig = { ApplicationKey: '2532280790373478' };
export const googleConfig = {
  androidClientId:
    '975945165729-l58crudfj4bqs737hi2a8m9use1asjrg.apps.googleusercontent.com',
  iosClientId:
    '975945165729-dlspp12h2bbol4ecvdm6g06gte1k0adr.apps.googleusercontent.com',
};

export const { FacebookAuthProvider, GoogleAuthProvider } = firebase.auth;

export default firebase;
