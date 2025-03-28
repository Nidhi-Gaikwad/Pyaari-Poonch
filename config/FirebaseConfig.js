import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-adoption-5d41d.firebaseapp.com",
  projectId: "pet-adoption-5d41d",
  storageBucket: "pet-adoption-5d41d.appspot.com",
  messagingSenderId: "704145477424",
  appId: "1:704145477424:web:c6d88a919aad4075c102f5",
};
console.log("AIzaSyC7GfWjofHmXdRMfcwn_jSE-J7inVVZW0U: ", process.env.EXPO_PUBLIC_FIREBASE_API_KEY);
// Initialize Firebase app or reuse existing one
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
