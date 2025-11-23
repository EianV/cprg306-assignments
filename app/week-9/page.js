"use client";

import Link from "next/link";
import { useAuth } from "./_utils/use-auth";

export default function Page() {
  const { user, loading, error, signInWithGitHub, logout } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-900 p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-2">Loading...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        </div>
      </main>
    );
  }

  const handleLogin = async () => {
    try {
      await signInWithGitHub();
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8">Shopping List App</h1>
      
      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-6 max-w-md text-center">
          <p className="font-bold">Error</p>
          <p className="text-sm mt-1">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-3 py-1 bg-red-600 text-white text-xs rounded"
          >
            Reload Page
          </button>
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