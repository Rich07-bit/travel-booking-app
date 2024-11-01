// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgGEG5Uq4cZ_lQfOWi38qlEvr-FMBSxU0",
  authDomain: "booking-plataform.firebaseapp.com",
  projectId: "booking-plataform",
  storageBucket: "booking-plataform.appspot.com",
  messagingSenderId: "831691929533",
  appId: "1:831691929533:web:77442740369885cce004d4",
  measurementId: "G-DR2G5BWXJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);