// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// ADD THIS LINE:
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
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
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export the database
export const db = getFirestore(app);

// (Optional) Initialize analytics only if needed on the client side
// export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;