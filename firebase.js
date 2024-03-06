// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,onAuthStateChanged,signInWithEmailAndPassword,sendPasswordResetEmail,createUserWithEmailAndPassword ,signOut} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCBNsCiEHPZpIcRmqu2A5_MxS9mmA9U_cs",
    authDomain: "waterreminder-96013.firebaseapp.com",
    projectId: "waterreminder-96013",
    storageBucket: "waterreminder-96013.appspot.com",
    messagingSenderId: "966088423908",
    appId: "1:966088423908:web:d5b12abc18b1f11bbceff1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
 const auth = getAuth();


export {app,db,auth,onAuthStateChanged,signInWithEmailAndPassword,sendPasswordResetEmail,createUserWithEmailAndPassword,signOut}