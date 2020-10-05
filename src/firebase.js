import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDex9MUyy7nGUjprvg9tuxqCtJEnpJk98c",
  authDomain: "instagram-clone-react-c5187.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-c5187.firebaseio.com",
  projectId: "instagram-clone-react-c5187",
  storageBucket: "instagram-clone-react-c5187.appspot.com",
  messagingSenderId: "157349259840",
  appId: "1:157349259840:web:60b3f712b885a60bdc8da5",
  measurementId: "G-VB9JTRE5WS",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
