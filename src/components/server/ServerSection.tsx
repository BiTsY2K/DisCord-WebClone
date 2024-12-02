"use client";

import { ChannelType, MemberRole, Server } from "@prisma/client";
import { ActionTooltip } from "../action-tooltips";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import * as Modal from "@/hooks/UseModalStore";

interface ServerChannelSectionProps {
  label: string;
  role: MemberRole | undefined;
  sectionType: "CHANNELS" | "MEMBERS";
  channelType?: ChannelType;
  server?: Server;
}

export const ServerChannelSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: ServerChannelSectionProps) => {
  const { OpenModal } = Modal.useModal();

  return (
    <div className="pt-4">
      <div className="group relative flex flex-row-reverse items-center justify-between h-6 px-4 pr-2">
        {role != MemberRole.GUEST && sectionType === "CHANNELS" && (
          <ActionTooltip label={"Create Channel"} side={"top"} align={"center"} sideOffset={4}>
            <Button type="button" variant={"ghost"} size={"icon"}
              className="text-muted-foreground hover:bg-transparent peer"
              onClick={() => OpenModal(Modal.ModalType.CREATE_CHANNEL)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </ActionTooltip>
        )}
        <div className="text-xs uppercase font-semibold text-muted-foreground group-hover:text-zinc-200 peer-hover:text-zinc-200">
          {label}
        </div>
      </div>
    </div>
  );
};
