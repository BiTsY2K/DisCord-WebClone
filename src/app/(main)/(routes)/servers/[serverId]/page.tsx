"use client"

import { useEffect } from "react";
import { Prisma, Profile } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ServerProps {
  children: React.ReactNode,
  userProfile: Profile,
  server: Prisma.ServerGetPayload<{
    include: {
      members: { include: { profile: true } },
      channels: true,
    };
  }>,
}

const ServerLayoutPage = ({ children, userProfile, server }: ServerProps) => {
  const router = useRouter();

  useEffect(() => {
    const initialChannel = server?.channels.find((channel) => channel.name === "general");
    if (initialChannel) router.push(`/servers/${server.id}/channels/${initialChannel.id}`);
  }, [server?.id, server?.channels, router]);

  return (
    <div className="relative min-w-0 min-h-0 flex flex-col flex-auto overflow-hidden">
      {children}
    </div>
  )
}

export default ServerLayoutPage