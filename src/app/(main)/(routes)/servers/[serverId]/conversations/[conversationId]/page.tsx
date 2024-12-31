import { redirect } from "next/navigation";

import { ChatHeader } from "@/components/chat/ChatHeader";
// import { ChatHeader } from "@/components/chat/chat-header";
// import { ChatInput } from "@/components/chat/chat-input";
// import { ChatMessages } from "@/components/chat/chat-messages";
// import { MediaRoom } from "@/components/media-room";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import React from "react";

type MemberIdPageProps = {
  params: {
    conversationId: string;
    serverId: string;
  };
  searchParams: {
    video?: boolean;
  };
};

const MemberIdPage = async ({ params, searchParams }: MemberIdPageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/sign-in");
  }
  
  const { conversationId:memberId, serverId } = await params;

  const currentMember = await db.member.findFirst({
    where: { serverId: serverId, profileId: profile.id },
    include: { profile: true },
  });

  if (!currentMember) {
    redirect("/");
  }

  const conversation = await getOrCreateConversation(currentMember.id, memberId);
  if (!conversation) redirect(`/servers/${serverId}`);

  const { memberOne, memberTwo } = conversation;
  const otherMember = (memberOne.profileId === profile.id) ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-[#313338]">
      <ChatHeader
        serverId={serverId}
        name={otherMember.profile.name}
        type="CONVERSATION"
        imageURL={otherMember.profile.imageUrl}
      />
      
      <div className="relative min-w-0 min-h-0 flex flex-auto items-stretch justify-stretch">
        <main className="relative flex flex-auto flex-col min-w-0 min-h-0">
      {/* {searchParams.video && <MediaRoom chatId={conversation.id} video audio />}

      {!searchParams.video && (
        <React.Fragment>
          <ChatMessages
            member={currentMember}
            name={otherMember.profile.name}
            chatId={conversation.id}
            type="conversation"
            apiURL="/api/direct-messages"
            paramKey="conversationId"
            paramValue={conversation.id}
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              conversationId: conversation.id,
            }}
          />

          <ChatInput
            name={otherMember.profile.name}
            type="conversation"
            apiURL="/api/socket/direct-messages"
            query={{
              conversationId: conversation.id,
            }}
          />
        </React.Fragment>
      )} */}
        </main>
      </div>

    </div>
  );
};

export default MemberIdPage;