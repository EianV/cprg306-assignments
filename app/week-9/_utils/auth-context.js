"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const gitHubSignIn = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const firebaseSignOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    console.log('AuthContext: Setting up auth state listener');
    
    // Safety timeout - if auth takes too long, stop loading
    const timeoutId = setTimeout(() => {
      console.log('AuthContext: Safety timeout reached');
      setLoading(false);
    }, 5000); // 5 second timeout

    // Only run on client side
    if (typeof window === 'undefined') {
      setLoading(false);
      clearTimeout(timeoutId);
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, 
        (currentUser) => {
          console.log('AuthContext: Auth state changed:', currentUser);
          clearTimeout(timeoutId);
          setUser(currentUser);
          setLoading(false);
        },
        (error) => {
          console.error('AuthContext: Auth state error:', error);
          clearTimeout(timeoutId);
          setLoading(false);
        }
      );

      return () => {
        clearTimeout(timeoutId);
        unsubscribe();
      };
    } catch (error) {
      console.error('AuthContext: Setup error:', error);
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      gitHubSignIn, 
      firebaseSignOut, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(AuthContext);
};