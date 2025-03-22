// Import Firebase SDK modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDADmfH9IPuALKlFfopPtd2pS-nbVGwHQ0",
  authDomain: "focusgenie-18842.firebaseapp.com",
  projectId: "focusgenie-18842",
  storageBucket: "focusgenie-18842.appspot.com", // Fixed storageBucket URL
  messagingSenderId: "891843812616",
  appId: "1:891843812616:web:6b9b125ed18329ebdc20bd",
  measurementId: "G-92QW2DXS42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export only what you need
export { app, auth, db };
