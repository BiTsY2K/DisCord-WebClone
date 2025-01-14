import { useSocket } from "@/providers/SocketIOProvider"
import { Member, Message, Profile } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { add } from "date-fns";
import { useEffect } from "react";

type MessageWithMemberAndProfile = Message & {
  member: Member & {
    profile: Profile
  }
}

interface ChatSocketProps {
  addKey: string,
  updateKey: string,
  queryKey: string
}

export const useChatSocket = ({
  addKey, updateKey, queryKey
}: ChatSocketProps) => {

  const queryClient = useQueryClient();
  const { socket } = useSocket();
  useEffect(() => {
    if (!socket) return;

    socket.on(updateKey, (message: MessageWithMemberAndProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        const newData = oldData.pages.map((page: any) => {
          return { 
            ...page, 
            items: page.items.map((item: MessageWithMemberAndProfile) => {
              if (item.id === message.id)
                return message;
              return item;
          })}
        });

        return { 
          ...oldData,
          pages: newData 
        }
      })
    });

    socket.on(addKey, (message: MessageWithMemberAndProfile) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return {
            pages: [{
              items: [message]
            }]
          };
        }

        const newData = [ ...oldData.pages ];
        newData[0] = { ...newData[0], items: [message, ...newData[0].items] };

        return { ...oldData, pages: newData };
      });
    });

    return () => {
      socket.off(addKey);
      socket.off(updateKey);
    }
  }, [queryClient, socket, queryKey, addKey, updateKey]);

}