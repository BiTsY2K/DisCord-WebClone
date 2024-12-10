"use client";

import * as Modal from "@/hooks/UseModalStore";
import { ChannelType, MemberRole, Server } from "@prisma/client";
import { ActionTooltip } from "@/components/ActionTooltips";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SidebarSectionProps {
  label: string;
  role: MemberRole | undefined;
  sectionType: "CHANNELS" | "MEMBERS";
  channelType?: ChannelType;
  server?: Server;
}

export const SidebarSection = ({
  label,
  role,
  sectionType,
  channelType,
  server,
}: SidebarSectionProps) => {
  const { OpenModal } = Modal.useModal();

  return (
    <div className="pt-4">
      <div className="group relative flex items-center justify-between h-6 px-4 pr-2 cursor-default">
        <div className="text-xs text-left uppercase font-bold text-[#5c5e66] group-hover:text-[#313338] peer-hover:text-[#313338] 
          dark:text-[#949ba4] dark:group-hover:text-[#dbdee1] dark:peer-hover:text-[#dbdee1]">
            {label}
        </div>
        {role != MemberRole.GUEST && sectionType === "CHANNELS" && (
          <ActionTooltip label={"Create Channel"} side={"top"} align={"center"} sideOffset={4}>
            <Button type="button" variant={"ghost"} size={"icon"}
              className="peer text-[#5c5e66] dark:text-[#949ba4] hover:bg-transparent"
              onClick={() => OpenModal(Modal.ModalType.CREATE_CHANNEL)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </ActionTooltip>
        )}
      </div>
    </div>
  );
};
