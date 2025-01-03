import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile"
import { redirect } from "next/navigation";
import { ServerSidebar } from "@/components/server/ServerSidebar";
import React from "react";

export default async function ServerLayout ({
  children,
  params
}:{
  children: React.ReactNode,
  params: { serverId: string }
}) {
  const profile = await currentProfile();
  if (!profile) return redirect("/sign-in");

  const { serverId } = await params;
  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: { some: { profileId: profile.id } },
    },
    include: {
      members:  { include: { profile: true }, orderBy: { role: "asc" }},
      channels: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!server) {
    return redirect("/");
  }
  
  return (
    <React.Fragment>
      <ServerSidebar id={serverId} server={server} userProfile={profile}/>
      <div className="relative min-w-0 min-h-0 flex flex-col flex-auto overflow-hidden">
        { children }
      </div>
    </React.Fragment>
  )
}