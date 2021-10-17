import firebase from "firebase";

import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import "firebase/analytics";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDnF_QBMZsz_O3H6VD9AGrkAWmrSaa6-c4",
  authDomain: "chattapp-c8fb9.firebaseapp.com",
  projectId: "chattapp-c8fb9",
  storageBucket: "chattapp-c8fb9.appspot.com",
  messagingSenderId: "3864752712",
  appId: "1:3864752712:web:980adea9aa7b7bffb55e7d",
  measurementId: "G-MV7RCCXGTQ"
});

export default firebaseConfig;
