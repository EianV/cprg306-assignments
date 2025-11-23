"use client";

export default function Page() {
  // Test if environment variables are loading
  const envVars = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  console.log('Environment Variables Test:', envVars);

  const allSet = Object.values(envVars).every(value => value);

  return (
    <main className="min-h-screen bg-gray-900 p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8">Environment Variables Test</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg max-w-md">
        <div className="space-y-3">
          {Object.entries(envVars).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="text-white text-sm">{key}:</span>
              <span className={value ? "text-green-400" : "text-red-400"}>
                {value ? "✅" : "❌"}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-gray-700 rounded">
          <p className="text-white text-center font-bold">
            {allSet ? "All variables are set! 🎉" : "Some variables are missing 😞"}
          </p>
          {allSet && (
            <p className="text-green-400 text-sm text-center mt-2">
              Firebase should work now!
            </p>
          )}
        </div>
      </div>

      {allSet && (
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Again
        </button>
      )}
    </main>
  );
}