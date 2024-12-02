import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorised", { status: 401});
    }

    const { name, type, serverId } = await req.json();
    
    console.log("Server_Id: ", serverId);
    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR]
            }
          }
        }
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name: name,
            type: type
          }
        }
      }
    });
    console.log("Server: ",server);
    return NextResponse.json(server);

  } catch (error) {
    console.log("[CHANNEL_POST] ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}