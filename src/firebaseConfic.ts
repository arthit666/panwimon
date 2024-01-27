// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYVy4aEl0aX7rCGGxbRVh4_Gd08DWBA_s",
    authDomain: "panwimon-9aa00.firebaseapp.com",
    projectId: "panwimon-9aa00",
    storageBucket: "panwimon-9aa00.appspot.com",
    messagingSenderId: "623290963415",
    appId: "1:623290963415:web:26542aef13f50809e2a792"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
