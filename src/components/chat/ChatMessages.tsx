"use client";

import type { Message, Member, Profile } from "@prisma/client";
import { Loader2, ServerCrash } from "lucide-react";
import { ElementRef, Fragment, useEffect, useRef, useState } from "react";

import { useChatQuery } from "@/hooks/UseChatQuery";
import { useChatScroll } from "@/hooks/UseChatScroll";
import { useChatSocket } from "@/hooks/UseChatSocket";

import { ChatItem } from "@/components/chat/ChatItem";
import { ChatWelcome } from "@/components/chat/ChatWelcome";
import { Button } from "@/components/ui/button";

import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

export type MessageWithMemberAndProfile = Message & {
  member: Member & { profile: Profile };
};

type ChatMessagesProps = {
  name: string;
  chatId: string;
  member: Member;
  type: "CHANNEL" | "CONVERSATION";
  apiURL: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelid" | "conversationid";
  paramValue: string;
};

export const ChatMessages = ({
  name,
  chatId,
  member,
  type,
  apiURL,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
}: ChatMessagesProps) => {
  const chatRef = useRef<ElementRef<"div">>(null);
  const bottomRef = useRef<ElementRef<"div">>(null);

  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({ apiURL, queryKey, paramKey, paramValue });

  const [messagesList, setMessagesList] = useState<any[]>([]);
  useEffect(() => {
    if (data?.pages) {
      const processedMessages: any[] = [];
      let lastRenderedDate: string | null = null;

      // Iterate in reverse order to align with column-reverse rendering
      [...data.pages].reverse().map((group) => {
        [...group.items].reverse().map((message: MessageWithMemberAndProfile) => {
          const currentDate = new Date(message.createdAt).toDateString();
          if (lastRenderedDate !== currentDate) {
            processedMessages.push({ date: currentDate });
            lastRenderedDate = currentDate;
          }
          processedMessages.push({ message: message });
        });
      });

      setMessagesList(processedMessages.reverse()); // Reverse back for correct order
    }
  }, [data]);

  useChatSocket({ queryKey, addKey, updateKey });
  useChatScroll({
    chatRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    count: data?.pages?.[0]?.items?.length ?? 0,
  });

  if (status === "pending") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
      {!hasNextPage && <div className="flex flex-1" aria-hidden />}
      {!hasNextPage && <ChatWelcome type={type} name={name} />}

      {hasNextPage && (
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
          ) : (
            <Button
              type="button"
              variant={"secondary"}
              size={"sm"}
              className="text-sm"
              onClick={() => fetchNextPage()}
            >
              Load previous messages
            </Button>
          )}
        </div>
      )}

      <div className="flex flex-col-reverse mt-auto">
        {messagesList.map((item, index) => (
          <Fragment key={index}>
            {item?.date && (
              <Separator className="relative w-[calc(100%-2*16px)] mx-4 mt-6 mb-2 flex flex-auto grow-0 shrink-0 justify-center items-center pointer-events-none">
                <span className="block flex-auto grow-0 shrink-0 px-1 py-0.5 text-xs font-semibold text-[#5c5e66] dark:text-[#949ba4] bg-white dark:bg-[#313338]">
                  {format(item.date, "MMMM dd, yyy")}
                </span>
              </Separator>
            )} 
            {item?.message && (
              <ChatItem
                key={item.message.id}
                currentMember={member}
                member={item.message.member}
                id={item.message.id}
                message={item.message.message}
                fileUrl={item.message.fileURL}
                deleted={item.message.deleted}
                timestamp={format(new Date(item.message.createdAt), "d/M/yy, h:mm aa")}
                isUpdated={item.message.updatedAt !== item.message.createdAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
              />
            )}
          </Fragment>
        )
        )}
      </div>

      <div ref={bottomRef} aria-hidden />
    </div>
  );
};

/* 
<Separator className="relative w-[calc(100%-2*16px)] mx-4 mt-6 mb-2 flex flex-auto grow-0 shrink-0 justify-center items-center pointer-events-none">
  <span className="block flex-auto grow-0 shrink-0 px-1 py-0.5 text-xs font-semibold text-[#5c5e66] dark:text-[#949ba4] bg-white dark:bg-[#313338]">December 6, 2024</span>
</Separator> 
*/

/** Original
{data?.pages?.map((group, i) => (
  <Fragment key={i}>
    {group.items.map((msg: MessageWithMemberAndProfile) => (
      <ChatItem
        key={msg.id}
        currentMember={member}
        member={msg.member}
        id={msg.id}
        message={msg.message}
        fileUrl={msg.fileURL}
        deleted={msg.deleted}
        timestamp={format(new Date(msg.createdAt), DATE_FORMAT)}
        isUpdated={msg.updatedAt !== msg.createdAt}
        socketUrl={socketUrl}
        socketQuery={socketQuery}
      />
    ))}
  </Fragment>
))}      
*/

/*  Working fine but the separatot is at the bottom....
const [messagesList, setMessagesList] = useState<any[]>([]);
useEffect(() => {
  if (data?.pages) {
    const processedMessages: any[] = [];
    let currentLastRenderedDate: string | null = null;

    data.pages.map((group, _) => {
      group.items.map((msg: MessageWithMemberAndProfile, _idx: number) => {
        const currentDate = new Date(msg.createdAt).toDateString();          
        if (currentLastRenderedDate !== currentDate) {
          processedMessages.push({ type: "separator", date: currentDate });
          currentLastRenderedDate = currentDate;
        }
        processedMessages.push({ message: msg });
      });
      
    });

    setMessagesList(processedMessages);
  }
}, [data]);
{messagesList.map((item, index) =>
  <Fragment key={index}>
    {item.type === "separator" ? (
      <Separator
        key={`separator-${index}`}
        className="relative w-[calc(100%-2*16px)] mx-4 mt-6 mb-2 flex flex-auto grow-0 shrink-0 justify-center items-center pointer-events-none"
      >
        <span className="block flex-auto grow-0 shrink-0 px-1 py-0.5 text-xs font-semibold text-[#5c5e66] dark:text-[#949ba4] bg-white dark:bg-[#313338]">
          {format(item.date, "MMMM dd, yyy")}
        </span>
      </Separator>
    ):(
      <ChatItem
        key={item.message.id}
        currentMember={member}
        member={item.message.member}
        id={item.message.id}
        message={item.message.message}
        fileUrl={item.message.fileURL}
        deleted={item.message.deleted}
        timestamp={format(new Date(item.message.createdAt), DATE_FORMAT)}
        isUpdated={item.message.updatedAt !== item.message.createdAt}
        socketUrl={socketUrl}
        socketQuery={socketQuery}
      />
    )}
  </Fragment>
)}
*/
