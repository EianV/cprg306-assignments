"use client";
export const dynamic = "force-dynamic";


import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  // Part 5: landing page starts
  const { user, gitHubSignIn, firebaseSignOut: logOut } = useUserAuth();

  return (
    <main style={{ padding: "20px" }}>
      {/* If the user is not logged in, show login button */}
      {!user && (
        <>
          <h1>Welcome!</h1>
          <button onClick={gitHubSignIn}>Login with GitHub</button>
        </>
      )}

      {/* If the user is logged in, show welcome message */}
      {user && (
        <>
          <p>
            Welcome, {user.displayName} ({user.email})
          </p>

          <button onClick={logOut}>Logout</button>

          <br /><br />

          <Link href="/week-9/shopping-list">
            Go to Shopping List
          </Link>
        </>
      )}
    </main>
  );
}
