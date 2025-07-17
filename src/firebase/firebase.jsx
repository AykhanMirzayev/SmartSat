// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // <-- 1. Import getAuth

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFLhIEsxlnTwUCoY-tENSIJmuv7MeMXCA",
  authDomain: "smart-771f2.firebaseapp.com",
  projectId: "smart-771f2",
  storageBucket: "smart-771f2.firebasestorage.app",
  messagingSenderId: "228417381831",
  appId: "1:228417381831:web:71620d5cb6c3173ab1a5e2",
  measurementId: "G-5WW2RKBCY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app); // <-- 2. Initialize and export auth

const analytics = getAnalytics(app);