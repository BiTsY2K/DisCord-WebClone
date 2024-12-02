import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile"
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ServerSidebar } from "@/components/server/ServerSidebar";

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
    <div className="relative flex flex-grow overflow-hidden">
      <div className="min-h-svh min-w-0 flex flex-col items-stretch flex-start bg-[#2b2d31]">
        <div className="sidebar min-h-0 w-60 flex flex-auto flex-col overflow-hidden">
          <ServerSidebar id={serverId}/>
                    
          {/* User Area */}
          <div className="panel bg-[#232428]" aria-label="User Area">
            <div className="relative w-[3.312rem] flex items-center flex-auto px-2 py-0.5">
              <div className="avatar-wrapper min-w-28 flex flex-grow gap-x-2 items-center" tabIndex={0}>
                <div className="wrapper avater">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" width={32} height={32} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="name-tag min-w-0 flex-grow select-text p-y-1">
                  <div className="panelTitle text-sm text-nowrap text-ellipsis overflow-hidden font-semibold">BiTS DEVELOPEMENT</div>
                  <div className="panelSubtext text-xs text-nowrap text-ellipsis overflow-hidden">Online</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main className="w-svw h-full flex flex-1 flex-col overflow-hidden">
        { children }
      </main>
    </div>
  )
}