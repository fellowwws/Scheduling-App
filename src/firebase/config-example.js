import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import 'firebase/storage';
import 'firebase/functions';

firebase.initializeApp({
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
});

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const functions = firebase.app().functions('europe-west2');
// export const storage = firebase.storage();
// firestore.settings({ timestampsInSnapshots: true });

export default firebase;