"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Profile } from "@prisma/client";
import { Button } from "./ui/button";
import { RiSettings5Fill } from "react-icons/ri";
import { ActionTooltip } from "./ActionTooltips";

export const UserPanel = ({
  userprofile,
  className,
}: {
  userprofile: Profile | null;
  className?: string;
}) => {
  return (
    <section
      className="panel relative h-[3.312rem] flex flex-shrink-0 items-center px-2 py-1 bg-[#ededef] dark:bg-[#232428]"
      aria-label="User Area"
    >
      <div className="relative h-full min-w-full flex items-center flex-auto">
        <div
          tabIndex={0}
          role="button"
          className="group avatar-wrapper mr-2 pl-0.5 min-w-[7.5rem] flex flex-grow gap-x-2 items-center rounded hover:bg-[#d7d8dd] dark:hover:bg-[#3f4248]"
        >
          {/* Avatar */}
          <div className="wrapper relative shrink-0 cursor-pointer">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {/* active status bubble */}
            <div className="absolute bottom-0 right-0 translate-x-1/4 d h-4 w-4 p-[.187rem] rounded-full
             bg-[#ededef] dark:bg-[#232428] group-hover:bg-[#d7d8dd] dark:group-hover:bg-[#3f4248]">
              <div className="h-full w-full rounded-full"></div>
            </div>
          </div>
          {/* User Name */}
          <div className="name-tag min-w-0 flex-grow select-text py-1">
            <div className="panelTitle text-[#060607] dark:text-[#f2f3f5] text-sm 
              whitespace-nowrap text-ellipsis overflow-hidden font-medium">
                {userprofile?.name}
            </div>
            {/* active status  */}
            <div className="panelSubtext text-xs text-[#425058] dark:text-[#b5bac1] 
              text-nowrap text-ellipsis overflow-hidden ">
                Online
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-start items-stretch flex-auto grow-0">
          <ActionTooltip
            label={"User Settings"}
            side={"top"}
            align={"center"}
            sideOffset={8}
          >
            <Button
              type="button"
              variant={"ghost"}
              size={"icon"}
              aria-label="User Settings"
              className="group max-h-8 max-w-8"
            >
              <div className="flex w-5 h-5 text-[#4e5058] dark:text-[#949ba4]">
                <RiSettings5Fill className="min-h-5 min-w-5 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </Button>
          </ActionTooltip>
        </div>
      </div>
    </section>
  );
};
