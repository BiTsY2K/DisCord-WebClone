"use client";

import Image from "next/image";

import { ActionTooltip } from "@/components/ActionTooltips";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa6";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavigationItem {
  id: string;
  image: string;
  label: string;
}

export const NavigationItem = ({ id, image, label }: NavigationItem) => {
  const params = useParams();
  const router = useRouter();

  return (
    <ActionTooltip side="right" align="center" label={label} sideOffset={16}>
      <div
        className="group/listItem"
        onClick={() => router.push(`/servers/${id}`)}
      >
        <div className="listItemWrapper peer">
            <div
              className={cn(
                "wrapper relative w-[3rem] h-[3rem] flex items-center justify-center bg-[#313338] rounded-full overflow-hidden group-hover/listItem:rounded-2xl cursor-pointer",
                params?.serverId === id
                  ? "bg-primary text-primary-foreground rounded-2xl"
                  : ""
              )}
            >
              {/* <FaDiscord className="min-h-[2rem] min-w-[2rem]"/> */}
              <Image fill src={image} alt="Channel" />
            </div>
        </div>

        <div
          className={cn(
            "pill absolute top-0 left-0 w-2 h-12 flex items-center",
          )}
          aria-hidden
        >
          <span
            className={cn(
              "rounded-e-sm block w-2 -ml-1 opacity-1 h-6",
              params?.serverId === id
                ? "h-10 bg-primary rounded-2xl"
                : "group-hover/listItem:bg-[#060607] dark:group-hover/listItem:bg-[#f2f3f5]"
            )}
          ></span>
        </div>
      </div>
    </ActionTooltip>
  );
};
