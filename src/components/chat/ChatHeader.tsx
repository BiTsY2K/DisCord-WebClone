import { Hash } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";
import { UserAvatar } from "../UserAvatar";
import { SocketIndicator } from "../SocketIndicator";
import { cn } from "@/lib/utils";
import { HiUsers } from "react-icons/hi2";
import { IoHelpCircle } from "react-icons/io5";
import { ActionTooltip } from "../ActionTooltips";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "CHANNEL" | "CONVERSATION";
  imageURL?: string;
}

export const ChatHeader = ({
  serverId,
  name,
  type,
  imageURL,
}: ChatHeaderProps) => {
  return (
    <div className="relative flex flex-col">
      <section className="relative flex flex-col justify-center min-w-0 w-full min-h-12 flex-auto p-2 text-base cursor-defaults shadow-md">
        <div className="relative flex grow flex-auto items-center min-w-0 h-full overflow-hidden font-semibold cursor-default">
          <MobileToggle serverId={serverId} />
          {type === "CHANNEL" && (
            <Hash className="min-w-6 min-h-6 ml-2 mr-3 text-[#6d6f78]" />
          )}
          {type === "CONVERSATION" && (
            <UserAvatar
              alt={""}
              srcURL={imageURL}
              className="h-6 w-6 ml-2 mr-3"
            />
          )}
          <h1
            className={cn(
              "flex flex-auto justify-start items-center whitespace-normal overflow-hidden text-[#313338] dark:text-[#dbdee1] font-semibold",
              type === "CONVERSATION" ? "cursor-pointer" : ""
            )}
          >
            {name}
          </h1>
          <div className="flex items-center">
            <ActionTooltip label={"Memeber List"} side={"bottom"}>
              <HiUsers className="h-6 w-6 mx-2" />
            </ActionTooltip>
            <SocketIndicator />
            <ActionTooltip label={"Help"} side={"bottom"}>
              <IoHelpCircle className="h-6 w-6 mx-2" />
            </ActionTooltip>
          </div>
        </div>
      </section>
    </div>
  );
};
