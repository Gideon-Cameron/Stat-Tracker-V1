// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ✅ Replace this with your own config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDr5UjOR52yvAW7FGvsuzMvNhJ8tF_RGWE",
  authDomain: "stats-dbd2c.firebaseapp.com",
  projectId: "stats-dbd2c",
  storageBucket: "stats-dbd2c.firebasestorage.app",
  messagingSenderId: "945569963249",
  appId: "1:945569963249:web:b5e8d442d77715b9651d50",
  measurementId: "G-KWWH8Q8V4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
