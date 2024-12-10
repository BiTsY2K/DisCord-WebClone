import { db } from "@/lib/db";
import { auth, getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";

// Fetches the authenticated user's profile from the database.
// Ensures only authenticated users can access their account data.
export const currentProfile = async (req?: NextApiRequest) => {
  
  // Retrieves the user ID from the authentication token.
  // Uses `auth()` for server-side calls without a request and 
  // `getAuth(req)` for API route requests, ensuring flexibility in usage
  const { userId } = !req ? await auth() : getAuth(req);

  // Returns null if the user is not authenticated,
  // Preventing further processing for unauthenticated users, ensuring secure access control
  if (!userId) {
    return null;
  }

  // Queries the database for the profile associated with the authenticated user's ID.
  const profile = await db.profile.findUnique({ where: { userId } });

  // Provides the profile for further operations.
  return profile;
};
