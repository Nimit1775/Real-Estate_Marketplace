// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-699ca.firebaseapp.com",
  projectId: "real-estate-699ca",
  storageBucket: "real-estate-699ca.appspot.com",
  messagingSenderId: "48932113526",
  appId: "1:48932113526:web:5343d716e39186ea9de357",
  measurementId: "G-V6BRZF35PD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);