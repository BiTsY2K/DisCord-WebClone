import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  _req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    // Retrieves the current authenticated user's profile. And checks if the profile exists
    // to ensure the request is made by an authenticated user, return 401 if not.
    const profile = await currentProfile();
    if (!profile)
      return new NextResponse("Unauthorized", { status: 401 });

    if (!params.serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    // Remove the member and pdates the server record for the specified server ID and profile ID.
    // Ensuring the update is scoped to the current user's profile for security.
    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: {
          not: profile.id,
        },
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });

    // Returns the updated server details as a JSON response.
    return NextResponse.json(server);
  } catch (error) {
    // Logs any errors that occur during the request for easier debugging and tracing in the server logs.
    // and returns a 500 Internal Server Error response to indicate an unexpected server issue.
    console.error("[SERVER_ID_LEAVE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
