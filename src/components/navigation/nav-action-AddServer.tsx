"use client"

import { Plus } from "lucide-react";
import { ActionTooltip } from "../action-tooltips";
import { ModalType, useModal } from "@/hooks/UseModalStore";

export const NavigationActionAddServer = () => {
  const { OpenModal } = useModal();

  return (
    <div className="group/listItem">
      <ActionTooltip side="right" align="center" label="Add a Server" sideOffset={16}>
        <div className="listItemWrapper peer">
          <div className="" onClick={() => OpenModal(ModalType.ADD_SERVER)}>
            <div className="wrapper relative w-[3rem] h-[3rem] flex items-center justify-center text-[#23a55a] group-hover/listItem:text-primary
              rounded-full group-hover/listItem:rounded-2xl bg-[#313338] group-hover/listItem:bg-[#23a55a]"> 
                <Plus className="min-h-[2rem] min-w-[2rem]"/>
            </div>
          </div>
        </div>
        
        {/* <div className="pill absolute top-0 left-0 w-2 h-12 hidden group-hover/listItem:flex items-center" aria-hidden>
          <span className="rounded-e-sm block w-2 h-6 -ml-1 opacity-1 group-hover/listItem:bg-red-600 group-active/listItem:h-10"></span>
        </div> */}
      </ActionTooltip>
    </div>
  )
}