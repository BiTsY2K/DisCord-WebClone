import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

interface ServerProps {
  params: {serverId: string}
}

const Server = async ({params}: ServerProps) => {
  const profile = await currentProfile();
  if (!profile) return redirect("/sign-in");

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id
        }
      }
    },
    include: {
      channels: {
        where: {
          name: "general"
        },
        orderBy: {createdAt: "asc"}
      }
    }
  });

  const initialChannel = server?.channels[0];
  if (initialChannel?.name !== "general") return null;

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`)
  // (
  //   <div className="">Server Id Page</div>
  // )
}

export default Server