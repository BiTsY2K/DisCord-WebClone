"use client"

import { useRouter } from "next/navigation";
import { FaShop } from "react-icons/fa6";
import { PiHandWavingFill, PiSpeedometerFill } from "react-icons/pi";

import { useProfile } from "@/hooks/UseDBStore";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PrivateChannelSectionHeader } from "@/components/channels/PrivateChannelSectionHeader";
import { PrivateChannelListItem } from "@/components/channels/PrivateChannelListItem";
import { SidebarNavigation } from "@/components/SidebarNavigation";

export const PrivateChannel = () => {
  const router = useRouter();
  const profile = useProfile((state) => state.profile);

  return (
    <SidebarNavigation>
      <header className="relative h-12 flex items-center justify-between gap-1 font-semibold shadow-md text-[#313338] dark:text-[#dbdee1] px-2.5 py-0 transition-colors duration-100 ease-linear">
        <Button
          type="button"
          size={"sm"}
          className="group w-full justify-start font-medium px-2 bg-[#1e1f22] text-muted-foreground hover:bg-[#1e1f22]"

        >
          Find or start a conversation
        </Button>
      </header>

      <ScrollArea className="h-full w-full overflow-y-auto pr-[2px]`">
        <div className="relative h-full mt-2">
          <div className="friendsButtonContainer">
            {/* Channel Item */}
            <div className="channel-item relative max-w-56 py-0.5 ml-2 rounded-sm">

              <Button
                className={cn(
                  "group flex items-center justify-start shadow-none h-11 px-2 py-0 w-full rounded bg-transparent",
                  "text-[#5c5e66] hover:text-[#313338] hover:bg-[#dfe0e3] dark:hover:bg-[#383a40]",
                  true && "bg-[#d7d8dd] hover:bg-[#d7d8dd] dark:bg-[#3f4248] dark:hover:bg-[#3f4248] dark:text-white"
                )}
                onClick={() => router.push(`/`)}
              >
                <div className="avatar flex items-center justify-center w-9 h-9">
                  <PiHandWavingFill className="min-h-6 min-w-6" />
                </div>

                <div className="contents min-w-0 flex-auto text-ellipsis whitespace-nowrap overflow-hidden">
                  <div className="name&decorator flex justify-start items-center">
                    <div className="name text-base leading-5 font-medium text-ellipsis whitespace-normal overflow-hidden flex-initial">
                      Friends
                    </div>
                  </div>
                </div>
              </Button>
            </div>
          </div>

          <PrivateChannelListItem ChannelIcon={PiSpeedometerFill} name="Nitro" />
          <PrivateChannelListItem ChannelIcon={FaShop} name="Shop" />
          
          {/* Channel Header */}
          <PrivateChannelSectionHeader sectionHeading="Direct Messages" toolTipLabel="Create DM" callbackFunc={() => { }} />
        </div>
      </ScrollArea>
    </SidebarNavigation>
  )
}