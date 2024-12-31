import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

export async function POST(req: Request) {
  try {
    // Retrieves the current authenticated user's profile. And checks if the profile exists
    // to ensure the request is made by an authenticated user, return 401 if not.
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    // Extracts the 'name' and 'type' of the channel
    // from the JSON body of the incoming request.
    const { name, type } = await req.json();

    // Parses the URL of the request to extract the query parameters.
    const { searchParams } = new URL(req.url);

    // Retrieve the 'serverId' query param from the URL to identify which server needs to acted upon.
    // And checks if 'serverId' is provided. If not, responds with a 400 Bad Request error
    // indicating the missing parameter.
    const serverId = searchParams.get("serverId");
    if (!serverId)
      return new NextResponse("Server ID is missing.", { status: 400 });

    // Updates the server by ensuring the user has the correct roles (ADMIN or MODERATOR),
    // then adds a new channel to the server with the specified name and type, associating it with the user's profile.
    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name: name,
            type: type,
          },
        },
      },
    });

    // Returns the updated server details as a JSON response.
    return NextResponse.json(server);
  } catch (error) {
    // Logs any errors that occur during the request for easier debugging and tracing in the server logs.
    // and returns a 500 Internal Server Error response to indicate an unexpected server issue.
    console.error("[CHANNEL_POST] ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
