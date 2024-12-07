"use client";

import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "../ui/button";

type ServerMemberProps = {
  member: Member & { profile: Profile };
  server: Server;
};

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

export const ServerMember = ({ member, server }: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[member.role];

  return (
    <div className="mx-2 my-[1px]">
      <Button
        className={cn(
          "group flex items-center justify-start shadow-none h-11 px-2 py-0 w-full rounded bg-transparent text-muted-foreground hover:bg-zinc-700/10 dark:hover:bg-[#3f4248]",
          params?.memberId === member.id &&
            "bg-zinc-700/20 dark:bg-[#3f4248] text-white"
        )}
        onClick={() =>
          router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
        }
      >
        <UserAvatar
          srcURL={member.profile.imageUrl}
          alt={member.profile.name}
        />
        {/* "text-zinc-500 group-hover:text-zinc-600 transition",
        params?.memberId === member.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white", */}
        <p
          className={cn(
            "text-sm text-left line-clamp-1 text-muted-foregroud flex-auto",
            params?.memberId !== member.id && "group-hover:text-zinc-200"
          )}
        >
          {member.profile.name}
        </p>
        {icon}
      </Button>
    </div>
  );
};
