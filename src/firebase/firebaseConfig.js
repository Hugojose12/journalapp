import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB4QFu4tzUT5cOxrmi995QkrI99FIKopJM",
    authDomain: "react-mern-curso.firebaseapp.com",
    databaseURL: "https://react-mern-curso.firebaseio.com",
    projectId: "react-mern-curso",
    storageBucket: "react-mern-curso.appspot.com",
    messagingSenderId: "315199936784",
    appId: "1:315199936784:web:3862ac219a718f35c12d95"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
    db,
    googleAuthProvider,
    firebase
  }