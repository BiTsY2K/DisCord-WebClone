
import { SocketIndicator } from "@/components/SocketIndicator";
import { HiUsers } from "react-icons/hi2";
import {TiPin } from "react-icons/ti";
import { IoHelpCircle, IoNotifications } from "react-icons/io5";
import { ActionTooltip } from "@/components/ActionTooltips";
import { ChatHeaderSearchBar as HeaderSearchBar } from "@/components/chat/ChatHeaderSearchBar";

export const ChatHeaderActionBar = () => {
  return (
    <div className="flex items-center">
      <ActionTooltip label={"Notification Settings"} side={"bottom"}>
        <IoNotifications tabIndex={0} className="h-6 w-6 mx-2 cursor-pointer" /></ActionTooltip>
      <ActionTooltip label={"Pinned Messages"} side={"bottom"}><TiPin tabIndex={0} className="h-6 w-6 mx-2 cursor-pointer" /></ActionTooltip>
      <ActionTooltip label={"Memeber List"} side={"bottom"}><HiUsers tabIndex={0} className="h-6 w-6 mx-2 cursor-pointer" /></ActionTooltip>
      <SocketIndicator />
      <HeaderSearchBar />
      <ActionTooltip label={"Help"} side={"bottom"}><IoHelpCircle tabIndex={0} className="h-6 w-6 mx-2 cursor-pointer" /></ActionTooltip>
    </div>
  );
}