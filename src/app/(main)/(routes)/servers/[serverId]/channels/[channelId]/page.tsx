import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

interface ChannelProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const Channel = async ({ params }: ChannelProps) => {
  const profile = await currentProfile();
  if (!profile) return redirect("/sign-in");

  const { serverId, channelId } = await params;

  const channel = await db.channel.findUnique({ where: { id: channelId } });
  const member = await db.member.findFirst({ where: { serverId: serverId, profileId: profile.id } });

  if (!channel || !member) return redirect("/");

  return (
    <>
      <ChatHeader
        type={"CHANNEL"}
        name={channel.name}
        serverId={channel.serverId}
      />
      <div className="relative min-w-0 min-h-0 flex flex-auto items-stretch justify-stretch">
          {channel.type === ChannelType.TEXT && (
            <main className="relative flex flex-auto flex-col min-w-0 min-h-0">
              <ChatMessages
                name={channel.name}
                chatId={channel.id}
                member={member}
                type={"CHANNEL"}
                apiURL="/api/messages"
                socketUrl="/api/socket/messages"
                socketQuery={{
                  channelId: channel.id,
                  serverId: channel.serverId,
                }}
                paramKey="channelid"
                paramValue={channel.id}
              />

              <ChatInput
                name={channel.name}
                type={"CHANNEL"}
                apiURL="/api/socket/messages"
                query={{
                  channelId: channel.id,
                  serverId: channel.serverId,
                }}
              />
            </main>
          )}
          {/*  */}
          <div className="ralative min-w-0 min-h-0 flex flex-auto items-stretch justify-items-stretch">

          </div>
      </div>
    </>
  );
};

export default Channel;
