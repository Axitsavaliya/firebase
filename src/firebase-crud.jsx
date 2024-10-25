// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import {getAuth, GoogleAuthProvider} from "@firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDy4dGIrpnZs7YP3fiTmJv3JNZVVvfuAB0",
  authDomain: "fir-crud-24617.firebaseapp.com",
  projectId: "fir-crud-24617",
  storageBucket: "fir-crud-24617.appspot.com",
  messagingSenderId: "541253199054",
  appId: "1:541253199054:web:07c7f2c93bddfd4bf45c9f",
  measurementId: "G-07BRQXGRTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const Provider =new GoogleAuthProvider()
const auth = getAuth(app);
export const db =getFirestore(app);
export {auth,Provider}

