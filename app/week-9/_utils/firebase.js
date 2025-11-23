// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Simple Firebase initialization that only runs on client side
function initializeFirebase() {
  // Only initialize on client side
  if (typeof window === 'undefined') {
    return {
      auth: {
        currentUser: null,
        onAuthStateChanged: () => () => {},
        signInWithPopup: () => Promise.reject(new Error('Firebase not available on server')),
        signOut: () => Promise.reject(new Error('Firebase not available on server'))
      }
    };
  }

  try {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    
    return { app, auth };
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    return {
      auth: {
        currentUser: null,
        onAuthStateChanged: () => () => {},
        signInWithPopup: () => Promise.reject(new Error('Firebase initialization failed')),
        signOut: () => Promise.reject(new Error('Firebase initialization failed'))
      }
    };
  }
}

const { auth } = initializeFirebase();
export { auth };