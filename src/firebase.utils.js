import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAHCxFTVA7B9E_xMHiIBVw8sH6XcTZIlbM",
    authDomain: "crwn-db-51b08.firebaseapp.com",
    projectId: "crwn-db-51b08",
    storageBucket: "crwn-db-51b08.appspot.com",
    messagingSenderId: "364737806723",
    appId: "1:364737806723:web:1bff18cc083445be45b6b6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider)
