import queryString from "query-string";
import { useSocket } from "@/providers/SocketIOProvider"
import { useInfiniteQuery } from "@tanstack/react-query";

interface ChatQueryProps {
  apiURL: string,
  queryKey: string,
  paramKey: "channelid" | "conversationid",
  paramValue: string,
}

export const useChatQuery = ({ 
  apiURL, queryKey, paramKey, paramValue 
}: ChatQueryProps) => {
  const { isConnected } = useSocket();
  
  // Function to fetch chat messages from the server.
  // Handles dynamic query construction for pagination and filtering based on channel or conversation ID.
  const fetchMessages = async ({ pageParam = undefined }) => {
    const url = queryString.stringifyUrl(
      {
        url: apiURL,
        query: {
          cursor: pageParam,
          [paramKey]: paramValue,
        },
      }, { skipNull: true },
    );

    const res = await fetch(url);
    return res.json();
  };

  const { 
    data, fetchNextPage, hasNextPage, isFetchingNextPage, status 
  } = useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: fetchMessages,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: isConnected ? false : 1000,
      initialPageParam: undefined
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };

}