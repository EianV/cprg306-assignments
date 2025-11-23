"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut, loading, error } = useUserAuth();

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-900 p-8 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </main>
    );
  }

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Login error:", error);
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
      
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-4 max-w-md">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}
      
      {!user ? (
        <div className="text-center">
          <p className="text-white mb-4">Please log in to continue</p>
          <button 
            onClick={handleLogin}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Login with GitHub
          </button>
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