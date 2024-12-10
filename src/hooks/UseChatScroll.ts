import { useEffect, useState } from "react";

interface ChatScrollProps {
  chatRef: React.RefObject<HTMLDivElement>;
  bottomRef: React.RefObject<HTMLDivElement>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
};

export const useChatScroll = ({
  chatRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  count,
}: ChatScrollProps) => {
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);

  useEffect(() => {
    const topDiv = chatRef?.current;

    const ScrollEventFunction = () => {
      const scrollTop = topDiv?.scrollTop;
      if (scrollTop === 0 && shouldLoadMore) loadMore();
    };

    topDiv?.addEventListener("scroll", ScrollEventFunction);
    return () => topDiv?.removeEventListener("scroll", ScrollEventFunction);
  }, [shouldLoadMore, loadMore, chatRef]);

  useEffect(() => {
    const topDiv = chatRef.current;
    const bottomDiv = bottomRef?.current;

    const AutoScrollFunction = () => {
      if (!hasInitialized && bottomDiv) {
        setHasInitialized(true);
        return true;
      }

      if (!topDiv) return false;
      const distanceFromBottom =
        topDiv?.scrollHeight - topDiv?.scrollTop - topDiv?.clientHeight;
      return distanceFromBottom <= 100;
    };

    if (AutoScrollFunction()) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth",});
      }, 100);
    }

  }, [bottomRef, chatRef, count, hasInitialized]);
};