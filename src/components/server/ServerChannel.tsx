"use client"

import { Channel, ChannelType, MemberRole, Server } from "@prisma/client"
import { Hash, Settings, Speaker, UserPlus2, Video } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { ActionTooltip } from "../action-tooltips"

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Speaker,
  [ChannelType.VIDEO]: Video,
}

interface ServerChannelProps {
  channel: Channel,
  server: Server,
  role?: MemberRole
}

export const ServerChannel = ({
  channel, role, server
}: ServerChannelProps) => {

  const router = useRouter();
  const params = useParams();

  const Icon = iconMap[channel.type];
  
  return (
    <div className="mx-2 my-[1px]">
      <Button className={cn("group flex items-center justify-start shadow-none px-2 py-1.5 w-full rounded bg-transparent hover:bg-[#3f4248]",
        params?.channelId === channel.id ? "bg-[#3f4248] text-white" : "text-muted-foreground"
      )} onClick={()=>router.push((`/servers/${params?.serverId}/channels/${channel.id}`))}
      >
        <Icon className="min-h-5 min-w-5 flex flex-shrink-0 text-muted-foreground" />
        <div className={cn("text-sm text-left line-clamp-1 text-muted-foregroud group-hover:text-zinc-200 flex-auto")}>{channel.name}</div>
        <div className={cn("flex flex-row-reverse gap-1", channel.name !== "general" && role !== MemberRole.GUEST && "hidden group-hover:flex")}>
          <ActionTooltip label="Edit Channel" side={"top"} align={"center"} sideOffset={12}>
            <span onClick={(e)=>{e.stopPropagation();}}><Settings className="min-h-5 min-w-5"/></span>
          </ActionTooltip>
          <ActionTooltip label="Create Invite" side={"top"} align={"center"} sideOffset={12}>
            <span onClick={(e)=>{e.stopPropagation();}}><UserPlus2 className="min-h-5 min-w-5"/></span>
          </ActionTooltip>
        </div>

      </Button>
    </div>
  )
}