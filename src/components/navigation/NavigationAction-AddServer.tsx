"use client"

import { Plus } from "lucide-react";
import { ActionTooltip } from "../ActionTooltips";
import { ModalType, useModal } from "@/hooks/UseModalStore";

export const NavigationActionAddServer = () => {
  const { OpenModal } = useModal();

  return (
    <div className="group/listItem">
      <ActionTooltip direction="right" align="center" label="Add a Server" sideOffset={16}>
        <div className="listItemWrapper peer">
          <div className="" onClick={() => OpenModal(ModalType.ADD_SERVER)}>
            <div className="wrapper relative w-[3rem] h-[3rem] flex items-center justify-center rounded-full group-hover/listItem:rounded-2xl
            group-hover/listItem:bg-[#23a55a] group-hover/listItem:text-[#fff] text-[#23a55a] bg-white dark:bg-[#313338]"> 
                <Plus className="min-h-6 min-w-6"/>
            </div>
          </div>
        </div>
      </ActionTooltip>
    </div>
  )
}