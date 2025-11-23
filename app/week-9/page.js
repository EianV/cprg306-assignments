"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";
import { useEffect } from "react";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut, loading } = useUserAuth();

  useEffect(() => {
    console.log('Page: Auth state -', { user, loading });
  }, [user, loading]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-900 p-8 flex flex-col items-center justify-center">
        <p className="text-white text-xl mb-4">Loading authentication...</p>
        <p className="text-gray-400 text-sm">
          If this takes more than 5 seconds, there may be an issue with Firebase.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded"
        >
          Reload Page
        </button>
      </main>
    );
  }

  const handleLogin = async () => {
    console.log('Login button clicked');
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Login error:", error);
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8">Shopping List App</h1>
      
      {!user ? (
        <div className="text-center">
          <p className="text-white mb-4">Please log in to continue</p>
          <button 
            onClick={handleLogin}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Login with GitHub
          </button>
          <p className="text-gray-400 text-sm mt-4">
            Check browser console (F12) for debug information
          </p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-white mb-4">
            Welcome, {user.displayName} ({user.email})
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={handleLogout}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
            <Link 
              href="/week-9/shopping-list"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Go to Shopping List
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}