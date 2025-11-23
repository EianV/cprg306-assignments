
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app;
let auth;

if (typeof window !== 'undefined') {
  // Client-side only
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} else {
  // Server-side 
  auth = {
    currentUser: null,
    onAuthStateChanged: () => () => {},
    signInWithPopup: () => Promise.reject(new Error('Firebase auth not available on server')),
    signOut: () => Promise.reject(new Error('Firebase auth not available on server'))
  };
}

export { auth };