import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import { NavigationSidebar } from "@/components/navigation/NavigationSidebar";
import { UserPanel } from "@/components/UserPanel";
import { currentProfile } from "@/lib/current-profile";

export default async function Home() {
  const profile = await currentProfile();
  if (!profile) return redirect("/sign-in");

  const servers = await db.server.findMany({
    where: { members: { some: { profileId: profile?.id } } }
  });

  // const server = await db.server.findFirst({ where: { members: {some: { profileId: profile.id }} } });
  // if (server) redirect(`/servers/${server.id}`);
  return (
    <div className="relative w-full h-svh flex">
      <NavigationSidebar userprofile={profile} servers={servers} />

      {/* <div className="relative min-w-0 min-h-0 flex flex-col flex-auto overflow-hidden">
        <div className="relative h-full w-full flex flex-auto items-stretch justify-start overflow-hidden">
          <div className="min-h-full min-w-0 flex flex-col items-stretch flex-start bg-[#2b2d31]">
            <div className="sidebar min-h-0 w-60 flex flex-auto flex-col overflow-hidden">
              <ServerSidebar id={serverId} />
              <UserPanel userprofile={profile} />
            </div>
          </div>

          <div className="relative min-w-0 min-h-0 flex flex-col flex-auto overflow-hidden">
            <header
              className="relative h-12 flex items-center justify-between gap-1 font-semibold shadow-md 
              hover:bg-[#35373c] px-4 py-3 transition-colors duration-100 ease-linear"
            ></header>
          </div>
        </div>
      </div> */}
    </div>
  );
}
