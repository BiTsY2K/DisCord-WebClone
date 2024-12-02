import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

import Link from "next/link";
import { redirect } from "next/navigation";
import { FaCompass, FaDiscord } from "react-icons/fa6";
import { ActionTooltip } from "../action-tooltips";
import { NavigationItem } from "./nav-item";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationActionAddServer } from "./nav-action-AddServer";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }
    
  const servers = await db.server.findMany({ 
    where: { 
      members: { 
        some: { profileId: profile?.id }
      }
    }
  });

  return (
    <nav className="relative w-[72px] h-full hidden md:flex flex-col flex-shrink-0 overflow-hidden bg-[#1e1f22]" aria-label="Servers sidebar">
        <ul tabIndex={0} className="relative w-full h-full flex flex-col justify-between py-2.5">
          <div className="relative min-h-0 flex:[1_1_auto] overflow-x-hidden">
            {/* Discord Logo */}
            <div className="listItem relative w-full flex items-center justify-center mb-2">
              <ActionTooltip side="right" align="center" label="Direct Messages" sideOffset={16}>
                <div className="group/listItem">
                  <div className="listItemWrapper peer">
                    <Link href={"/"} passHref className="">
                      <div className="wrapper relative w-[3rem] h-[3rem] flex items-center justify-center bg-[#313338] rounded-full group-hover/listItem:rounded-2xl">
                        <FaDiscord className="min-h-[2rem] min-w-[2rem]"/>
                      </div>
                    </Link>
                  </div>
                  
                  <div className="pill absolute top-0 left-0 w-2 h-12 hidden group-hover/listItem:flex items-center" aria-hidden>
                    <span className="rounded-e-sm block w-2 h-6 -ml-1 opacity-1 group-hover/listItem:bg-red-600 group-active/listItem:h-10"></span>
                  </div>
                </div>
              </ActionTooltip>
            </div>
            
            {/* Servers */}
            {/* <div className="listItem w-full flex items-center justify-center mb-2">
              <div className="pill absolute top-0 left-0 w-2 h-12 flex items-center" aria-hidden>
                <span className="absolute rounded-e-sm block w-2 h-6 -ml-1 opacity-1 bg-red-600"></span>
              </div>
              <div className="listItemWrapper">
                <Button variant={"default"} size={"icon"} className="wrapper relative w-[3rem] h-[3rem] rounded-2xl">
                  <FaDiscord className="min-h-[2rem] min-w-[2rem]"/>
                </Button>
              </div>
            </div> */}
            <ScrollArea className="w-full mb-1">
              {servers?.map((server, _) => (
                <div key={server.id} className="listItem relative w-full flex items-center justify-center mb-2">
                  <NavigationItem id={server.id} image={server.imageUrl} label={server.name} />
                </div>
              ))}
            </ScrollArea>
            
            <div className="listItem relative w-full flex items-center justify-center mb-2">
              <div className="guideSeperator h-0.5 w-8 rounded-[1px] bg-[#313338]"></div>
            </div>
            
            {/* Add Server */}
            <div className="listItem relative w-full flex items-center justify-center mb-2">
              <NavigationActionAddServer />
            </div>

            <div className="listItem relative w-full flex items-center justify-center mb-2">
              <div className="guideSeperator h-0.5 w-8 rounded-[1px] bg-[#313338]"></div>
            </div>
          </div>

          {/* Footer */}
          <div className="listItem relative w-full flex items-center justify-center mb-2">
            <div className="group/listItem">
              <div className="listItemWrapper peer">
                <Link href={"/"} passHref className="">
                  <div className="wrapper relative w-[3rem] h-[3rem] flex items-center justify-center text-primary 
                    rounded-full group-hover/listItem:rounded-2xl bg-[#313338] group-hover/listItem:bg-[#23a55a]">
                      <FaCompass className="min-h-[2rem] min-w-[2rem]"/>
                  </div>
                </Link>
              </div>
              
              <div className="pill absolute top-0 left-0 w-2 h-12 hidden group-hover/listItem:flex items-center" aria-hidden>
                <span className="rounded-e-sm block w-2 h-6 -ml-1 opacity-1 group-hover/listItem:bg-red-600 group-active/listItem:h-10"></span>
              </div>
            </div>
          </div>
        </ul>
      </nav>

  )
}