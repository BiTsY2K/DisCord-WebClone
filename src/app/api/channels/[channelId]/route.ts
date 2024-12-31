import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    // Retrieves the current authenticated user's profile. And checks if the profile exists
    // to ensure the request is made by an authenticated user, return 401 if not.
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Parses the URL of the request to extract the query parameters.
    const { searchParams } = new URL(req.url);

    // Retrieve the 'serverId' query param from the URL to identify which server needs to acted upon.
    // And checks if 'serverId' is provided. If not, responds with a 400 Bad Request error
    // indicating the missing parameter.
    const serverId = searchParams.get("serverId");
    if (!serverId)
      return new NextResponse("Missing Server Id", { status: 400 });

    // Extracts the 'channelId' from the request parameters to delete the channel corresponding to the ID
    // and checks if it's provided, if not returns a 400 Bad Request response.
    const { channelId } = await params;
    if (!channelId)
      return new NextResponse("Missing Channel Id.", { status: 400 });
console.log("before serverupdate");
    // Updates the server by verifying the user has appropriate roles (ADMIN or MODERATOR), 
    // then deletes a specific channel (except the 'general' channel) by its ID.
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
          delete: {
            id: channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });
console.log("after serverupdate");
    
    // Returns the updated server details as a JSON response.
    return NextResponse.json(server);
  } catch (error) {
    // Logs any errors that occur during the request for easier debugging and tracing in the server logs.
    // and returns a 500 Internal Server Error response to indicate an unexpected server issue. 
    console.error("[CHANNEL_ID_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
