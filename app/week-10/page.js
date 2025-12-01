"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed: " + error.message);
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
    <main className="min-h-screen p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-black mb-8">Shopping List App</h1>
      
      
      {!user ? (
        <div className="text-center">
          <p className="text-black mb-4">Please log in to continue</p>
          <button 
            onClick={handleLogin}
            className="px-6 py-3 bg-green-500 text-black rounded-lg hover:bg-green-600 transition-colors"
          >
            Login with GitHub
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-black mb-4">
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
              href="/week-10/shopping-list"
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