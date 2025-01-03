"use client"

import { useEffect } from "react";
import { useProfile, useServers } from "@/hooks/UseDBStore";
import { Profile, Server } from "@prisma/client";

export default function MainLayoutPage({
  profile, servers, children,
}: {
  profile: Profile;
  servers: Server[];
  children: React.ReactNode;
}) {
  const setProfile = useProfile((state: any) => state.setProfile);
  const setServers = useServers((state: any) => state.setServers);

  useEffect(() => {
    setProfile(profile);
    setServers(servers);
  }, [profile, servers, setProfile, setServers]);

  return (
      <div className="base relative h-full w-full flex-col flex-auto overflow-hidden">
        <div className="content relative h-full w-full flex flex-grow items-stretch justify-start overflow-hidden">
          {children}
        </div>
      </div>
  );
}