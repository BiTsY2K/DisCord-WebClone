import React from "react";
import Link from "next/link";
import { FaCompass, FaDiscord } from "react-icons/fa6";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ActionTooltip } from "@/components/ActionTooltips";
import { ThemeModeToggle } from "@/components/ThemeToggle";

import { NavigationItem } from "@/components/navigation/NavigationItem";
import { NavigationActionAddServer } from "@/components/navigation/NavigationAction-AddServer";
import { Profile, Server } from "@prisma/client";

interface NavigationSidebarProps { userprofile: Profile, servers: Server[] }

export const NavigationSidebar = async ({ userprofile, servers }: NavigationSidebarProps) => {
  return (
    <nav className="wrapper guilds relative w-[72px] h-full hidden md:flex flex-col flex-shrink-0 overflow-hidden bg-[#E3E5E8] dark:bg-[#1E1F22]" aria-label="Servers Navigation Sidebar">
      <ul tabIndex={0} className="relative w-full h-full flex flex-col justify-between py-2.5">
        <div className="relative min-h-0 flex:[1_1_auto] overflow-x-hidden">
          {/* Discord Logo */}
          <div className="listItem relative w-full flex items-center justify-center mb-2">
              {/*
            <ActionTooltip side="right" align="center" label="Direct Messages" sideOffset={16}>
               <div className="group/listItem" onClick={() => router.push(`/servers/@me`)}>
                <div className="listItemWrapper peer">
                  <div className="wrapper relative w-[3rem] h-[3rem] flex items-center justify-center text-[#313338] bg-white dark:text-[#dbdee1] dark:bg-[#313338] rounded-full group-hover/listItem:rounded-2xl">
                    <FaDiscord className="min-h-[2rem] min-w-[2rem]" />
                  </div>
                </div>

                <div className="pill absolute top-0 left-0 w-2 h-12 hidden group-hover/listItem:flex items-center" aria-hidden>
                  <span className="rounded-e-sm block w-2 h-6 group-active/listItem:h-10 -ml-1 opacity-1 group-hover/listItem:bg-[#060607] dark:group-hover/listItem:bg-[#f2f3f5]"></span>
                </div>
              </div> 
            </ActionTooltip>
              */}
              <NavigationItem id={"@me"} IconImage={<FaDiscord className="min-h-[2rem] min-w-[2rem]"/>} label={"Direct Messages"} />
          </div>

          {!!servers.length &&
            <div className="listItem relative w-full flex items-center justify-center mb-2">
              <div className="guideSeperator h-0.5 w-8 rounded-[1px] bg-[#cccdd3] dark:bg-[#35363c]"></div>
            </div>
          }

          {/* Servers */}
          <ScrollArea className="w-full mb-1">
            {servers?.map((server, _) => (
              <div key={server.id} className="listItem relative w-full flex items-center justify-center mb-2">
                <NavigationItem id={server.id} imageSrc={server.imageUrl} label={server.name} />
              </div>
            ))}
          </ScrollArea>

          <div className="listItem relative w-full flex items-center justify-center mb-2">
            <div className="guideSeperator h-0.5 w-8 rounded-[1px] bg-[#cccdd3] dark:bg-[#35363c]"></div>
          </div>

          {/* Add Server Modal Opener*/}
          <div className="listItem relative w-full flex items-center justify-center mb-2">
            <NavigationActionAddServer />
          </div>

          <div className="listItem relative w-full flex items-center justify-center mb-2">
            <div className="guideSeperator h-0.5 w-8 rounded-[1px] bg-[#cccdd3] dark:bg-[#35363c]"></div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-1 items-center justify-center">
          <ThemeModeToggle />
          <div className="listItem relative w-full flex flex-col gap-1 items-center justify-center mb-2">
            <div className="group/listItem">
              <div className="listItemWrapper peer">
                <Link href={"/"} passHref className="">
                  <div className="wrapper relative w-[3rem] h-[3rem] flex items-center justify-center text-primary 
                    rounded-full group-hover/listItem:rounded-2xl group-hover/listItem:bg-[#23a55a] group-hover/listItem:text-[#fff] text-[#313338] bg-white dark:text-[#dbdee1] dark:bg-[#313338]">
                    <FaCompass className="min-h-6 min-w-6" />
                  </div>
                </Link>
              </div>

              <div className="pill absolute top-0 left-0 w-2 h-12 hidden group-hover/listItem:flex items-center" aria-hidden>
                <span className="rounded-e-sm block w-2 h-6 group-active/listItem:h-10 -ml-1 opacity-1 group-hover/listItem:bg-[#060607] dark:group-hover/listItem:bg-[#f2f3f5]"></span>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </nav>

  )
}