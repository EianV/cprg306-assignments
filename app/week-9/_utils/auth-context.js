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
  const [error, setError] = useState(null);

  const gitHubSignIn = async () => {
    try {
      setError(null);
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const firebaseSignOut = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, 
        (currentUser) => {
          setUser(currentUser);
          setLoading(false);
          setError(null);
        },
        (error) => {
          console.error('Auth state error:', error);
          setError(error.message);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error('Auth setup error:', error);
      setError(error.message);
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      gitHubSignIn, 
      firebaseSignOut, 
      loading,
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(AuthContext);
};