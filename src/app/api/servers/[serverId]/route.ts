import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

// Function to handle PATCH requests for updating server data based on a given serverId.
export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    // Retrieves the current authenticated user's profile. And checks if the profile exists
    // to ensure the request is made by an authenticated user, return 401 if not.
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extracts the name and imageUrl fields from the request body
    const { name, imageUrl } = await req.json();

    // Updates the server record for the specified server ID and profile ID.
    // Ensuring the update is scoped to the current user's profile for security.
    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    // Returns the updated server details as a JSON response.
    return NextResponse.json(server);
  } catch (error) {
    // Logs any errors that occur during the request for easier debugging and tracing in the server logs.
    // and returns a 500 Internal Server Error response to indicate an unexpected server issue.
    console.error("[SERVER_ID_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


// Function to handle DELETE requests for deleting server data based on a given serverId.
export async function DELETE(
  _req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    // Retrieves the current authenticated user's profile. And checks if the profile exists
    // to ensure the request is made by an authenticated user, return 401 if not.
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Delete the server record  for the specified server ID and profile ID.
    // Ensuring the delete is scoped to the current user's profile for security.
    const server = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
    });

    // Returns the updated server details as a JSON response.
    return NextResponse.json(server);
  } catch (error) {
    // Logs any errors that occur during the request for easier debugging and tracing in the server logs.
    // and returns a 500 Internal Server Error response to indicate an unexpected server issue.
    console.error("[SERVER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
