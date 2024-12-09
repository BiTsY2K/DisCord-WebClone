import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import { v4 as uuidv4 } from "uuid";
import { MemberRole } from "@prisma/client";

// Function to handle POST requests for creating new server.
export async function POST(req: Request) {
  try {
    // Retrieves the current authenticated user's profile. And checks if the profile exists
    // to ensure the request is made by an authenticated user, return 401 if not.
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extracts the name and imageUrl fields from the request body
    const { name, imageUrl } = await req.json();

    // Create new server record, associates the server with the current user's profile ID,
    // Creates a default "general" channel for the server and adds the user as an admin member of the server.
    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    // Returns the new server details as a JSON response.
    return NextResponse.json(server);
  } catch (error) {
    // Logs any errors that occur during the request for easier debugging and tracing in the server logs.
    // and returns a 500 Internal Server Error response to indicate an unexpected server issue.
    console.error("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
