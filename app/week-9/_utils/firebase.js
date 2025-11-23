// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Check if we're in a browser environment
const isClient = typeof window !== 'undefined';

let app;
let auth;

if (isClient) {
  try {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    console.log('Initializing Firebase with config:', {
      apiKey: firebaseConfig.apiKey ? 'Set' : 'Missing',
      authDomain: firebaseConfig.authDomain ? 'Set' : 'Missing',
      projectId: firebaseConfig.projectId ? 'Set' : 'Missing'
    });

    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Firebase initialization error:', error);
    // Create a mock auth object if initialization fails
    auth = {
      currentUser: null,
      onAuthStateChanged: (callback) => {
        callback(null);
        return () => {};
      },
      signInWithPopup: () => Promise.reject(new Error('Firebase initialization failed')),
      signOut: () => Promise.reject(new Error('Firebase initialization failed'))
    };
  }
} else {
  // Server-side - create mock
  auth = {
    currentUser: null,
    onAuthStateChanged: () => () => {},
    signInWithPopup: () => Promise.reject(new Error('Firebase not available on server')),
    signOut: () => Promise.reject(new Error('Firebase not available on server'))
  };
}

export { auth };