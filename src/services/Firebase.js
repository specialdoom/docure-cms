import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD7PwK_VCBVFr05RNjIfo1Bd7xHMltsXS0",
  authDomain: "docure-9a8dd.firebaseapp.com",
  projectId: "docure-9a8dd",
  storageBucket: "docure-9a8dd.appspot.com",
  messagingSenderId: "232653407671",
  appId: "1:232653407671:web:1c93f808df816815ec1432",
  databaseURL: "https://docure-9a8dd-default-rtdb.europe-west1.firebasedatabase.app/"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export {
  firebase, database
}