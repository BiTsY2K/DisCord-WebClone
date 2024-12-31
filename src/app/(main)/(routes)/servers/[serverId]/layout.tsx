import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile"
import { redirect } from "next/navigation";
import { ServerSidebar } from "@/components/server/ServerSidebar";
import { UserPanel } from "@/components/UserPanel";

export default async function ServerLayout ({
  children,
  params
}:{
  children: React.ReactNode,
  params: { serverId: string }
}) {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/sign-in");
  }

  const { serverId } = await params;
  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="relative h-full w-full flex flex-auto items-stretch justify-start overflow-hidden">
      <div className="min-h-full min-w-0 flex flex-col items-stretch flex-start bg-[#f2f3f5] dark:bg-[#2b2d31]">
        <div className="sidebar min-h-0 w-60 flex flex-auto flex-col overflow-hidden">
          <ServerSidebar id={serverId} />
          <UserPanel userprofile={profile} />
        </div>
      </div>

      <div className="relative min-w-0 min-h-0 flex flex-col flex-auto overflow-hidden">
        { children }
      </div>
    </div>
  )
}