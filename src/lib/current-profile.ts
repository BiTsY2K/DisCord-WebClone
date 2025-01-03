import { db } from "@/lib/db";
import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";
import { redirect } from "next/navigation";

// Fetches the authenticated user's profile from the database.
// Ensures only authenticated users can access their account data.
export const currentProfile = async (req?: NextApiRequest) => {
  
  // Retrieves the user ID from the authentication token. Uses `auth()` for server-side calls without a request and 
  // `getAuth(req)` for API route requests, ensuring flexibility in usage
  const { userId } = !req ? await auth() : getAuth(req);

  // Returns null if the user is not authenticated,
  // Preventing further processing for unauthenticated users, ensuring secure access control
  if (!userId) return null;

  // If User is authenticated, get the user details.
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  
  // Queries the database for the profile associated with the authenticated user's ID.
  // And provides the profile for further operations.
  const profile = await db.profile.findUnique({ where: { userId: user?.id } });
  if (profile) return profile;

  const newProfile = await db.profile.create({
    data: {
      userId: user?.id,
      name: `${user?.firstName} ${user?.lastName}`,
      imageUrl: user?.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  })

  return newProfile;
};
