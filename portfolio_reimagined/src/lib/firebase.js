// src/lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// 1. IMPORT AUTHENTICATION
import { getAuth } from "firebase/auth"; 
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD_U9derA18BplaDOdzWGyL62WPXRSIcq4",
  authDomain: "portfolio-8ce12.firebaseapp.com",
  projectId: "portfolio-8ce12",
  storageBucket: "portfolio-8ce12.firebasestorage.app",
  messagingSenderId: "390786794248",
  appId: "1:390786794248:web:3be4dabbc2c2f61edba2bd",
  measurementId: "G-MV7H2L9S6K"
};

// Initialize Firebase safely for Next.js
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 2. EXPORT DATABASE AND AUTH
export const db = getFirestore(app);
export const auth = getAuth(app);

// (Optional) Initialize analytics only on the client side
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;