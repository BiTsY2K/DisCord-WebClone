import React from "react";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

import MainLayoutPage from "@/app/(main)/page";
import { NavigationSidebar } from "@/components/navigation/NavigationSidebar";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await currentProfile();
  if (!profile) return redirect("/sign-in");

  const servers = await db.server.findMany({
    where: { members: { some: { profileId: profile?.id } } }
  });

  return (
    <div className="layer absolute top-0 right-0 bottom-0 left-0 flex flex-col ">
      <div className="_container relative h-full w-full flex flex-auto">
        <NavigationSidebar userprofile={profile} servers={servers} />
        <MainLayoutPage profile={profile} servers={servers}>{children}</MainLayoutPage>
      </div>
    </div>
  );
}
