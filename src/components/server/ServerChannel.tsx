"use client";

import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Hash, Mic, Settings, UserPlus2, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "../ActionTooltips";

import * as Modal from "@/hooks/UseModalStore"; 

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.VOICE]: Mic,
  [ChannelType.VIDEO]: Video,
};

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

export const ServerChannel = ({
  channel,
  server,
  role,
}: ServerChannelProps) => {

  const { OpenModal } = Modal.useModal();

  const router = useRouter();
  const params = useParams();

  const Icon = iconMap[channel.type];

  return (
    <div className="mx-2 my-[1px]">
      <Button
        className={cn(
          "group flex items-center justify-start shadow-none px-2 py-1.5 w-full rounded bg-transparent",
          "text-[#5c5e66] hover:text-[#313338] hover:bg-[#dfe0e3] dark:hover:bg-[#383a40]",
          params?.channelId === channel.id &&
            "bg-[#d7d8dd] hover:bg-[#d7d8dd] dark:bg-[#3f4248] dark:hover:bg-[#3f4248] dark:text-white"
        )}
        onClick={() =>
          router.push(`/servers/${params?.serverId}/channels/${channel.id}`)
        }
      >
        <Icon className="min-h-5 min-w-5 flex flex-shrink-0 text-[#6d6f78] dark:text-[#80848e]" />
        <p
          className={cn(
            "text-base font-semibold text-left line-clamp-1 text-[#5c5e66] dark:text-[#949ba4] flex-auto",
            params?.channelId !== channel.id ? "group-hover:text-[#313338] dark:group-hover:text-[#dbdee1]" : "text-[#060607] dark:text-white"
          )}
        >
          {channel.name}
        </p>
        <div
          className={cn(
            "hidden flex-row-reverse gap-1 group-hover:flex text-[#4e5058] dark:text-[#b5bac1]",
            params?.channelId === channel.id && "flex"
          )}
        >
          <ActionTooltip
            label="Edit Channel"
            side={"top"}
            align={"center"}
            sideOffset={12}
          >
            <span
              onClick={(e) => {
                e.stopPropagation();
                OpenModal(Modal.ModalType.CHANNEL_SETTINGS, { channel, server });
              }}
            >
              <Settings className="min-h-4 min-w-4" />
            </span>
          </ActionTooltip>

          <ActionTooltip
            label="Create Invite"
            side={"top"}
            align={"center"}
            sideOffset={12}
          >
            <span
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <UserPlus2 className="min-h-4 min-w-4" />
            </span>
          </ActionTooltip>
        </div>
      </Button>
    </div>
  );
};
