// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-65ca2.firebaseapp.com",
  projectId: "mern-estate-65ca2",
  storageBucket: "mern-estate-65ca2.firebasestorage.app",
  messagingSenderId: "975582073025",
  appId: "1:975582073025:web:8bf0dde50b746f7ff20440",
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
