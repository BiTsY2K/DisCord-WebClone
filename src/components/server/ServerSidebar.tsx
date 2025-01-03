"use client"

import React from "react";
import { Hash, ShieldAlert, ShieldCheck, Speaker, Video } from "lucide-react";

import { ChannelType, MemberRole, Prisma, Profile } from "@prisma/client";
import { Separator } from "@/components/ui/separator";

import { ServerHeader } from "@/components/server/ServerHeader";
import { FindStartConversation } from "@/components/SidebarSearch";
import { ServerChannel } from "@/components/server/ServerChannel";
import { ServerSectionHeader } from "@/components/server/ServerSectionHeader";
import { ServerMember } from "@/components/server/ServerMember";
import { SidebarNavigation } from "../SidebarNavigation";
import { ScrollArea } from "../ui/scroll-area";

const iconMap = {
  [ChannelType.TEXT]: <Hash className="mr-2 size-4" />,
  [ChannelType.VOICE]: <Speaker className="mr-2 size-4" />,
  [ChannelType.VIDEO]: <Video className="mr-2 size-4" />,
}
const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="mr-2 size-4 text-indigo-600" />,
  [MemberRole.ADMIN]: <ShieldAlert className="mr-2 size-4 text-rose-600" />,
}

interface ServerSideProps {
  id: string,
  userProfile: Profile,
  server: Prisma.ServerGetPayload<{
    include: {
      members: { include: { profile: true } },
      channels: true,
    };
  }>
}

export const ServerSidebar = ({ id, userProfile, server }: ServerSideProps) => {

  const textChannels = server.channels?.filter((channel: any) => channel.type === ChannelType.TEXT);
  const voiceChannels = server.channels?.filter((channel: any) => channel.type === ChannelType.VOICE);
  const videoChannels = server.channels?.filter((channel: any) => channel.type === ChannelType.VIDEO);

  // const members = server.members.filter((member: any) => member.profileId !== profile.id)
  const role = server.members.find((member: any) => member.profileId === userProfile.id)?.role;

  return (
    <SidebarNavigation>
      <ServerHeader server={server} role={role} />
      <ScrollArea className="h-full w-full overflow-y-auto pr-[2px]`">
        <div className="relative h-full">
          <div className="relative z-[2] flex flex-auto items-center px-2.5 h-12">
            <FindStartConversation data={[
              {
                label: "Text Channels",
                type: "CHANNEL",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }))
              },
              {
                label: "Voice Channels",
                type: "CHANNEL",
                data: voiceChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }))
              },
              {
                label: "Video Channels",
                type: "CHANNEL",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }))
              },
              {
                label: "Members",
                type: "MEMBER",
                data: server.members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                }))
              },
            ]} />
          </div>
          <Separator className="bg-[#d7d8dd] dark:bg-[#3c3e44] mx-auto mt-2 w-[95%]" />

          <ServerSectionHeader label={"Text Channels"} role={role} sectionType={"CHANNELS"} channelType={ChannelType.TEXT} />
          {!!textChannels.length && (
            <React.Fragment>
              {textChannels.map((channel, _) => (
                <ServerChannel key={channel.id} channel={channel} server={server} />
              ))}
            </React.Fragment>
          )}

          <ServerSectionHeader label={"Voice Channels"} role={role} sectionType={"CHANNELS"} channelType={ChannelType.VOICE} />
          {!!voiceChannels.length && (
            <React.Fragment>
              {voiceChannels.map((channel, _) => (
                <ServerChannel key={channel.id} channel={channel} server={server} />
              ))}
            </React.Fragment>
          )}

          {!!server.members?.length && (
            <React.Fragment>
              <ServerSectionHeader label={"Members"} role={role} sectionType={"MEMBERS"} server={server} />
              {server.members.map((member) => (
                <ServerMember key={member.id} member={member} server={server} />
              ))}
            </React.Fragment>
          )}
        </div>
      </ScrollArea>
    </SidebarNavigation>
  )
}