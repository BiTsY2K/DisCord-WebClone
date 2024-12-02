import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ChannelProps {
  params: {
    serverId: string,
    channelId: string
  }
}

const Channel = async ({ params }: ChannelProps) => {
  const profile = await currentProfile();
  if (!profile) return redirect("/sign-in");

  const channel = await db.channel.findUnique({ where: { id: await params?.channelId } });
  const member = await db.member.findFirst({ where: { serverId: await params.serverId, profileId: profile.id } });

  if (!channel || !member) return redirect("/");

  

  return (
    <div className="">ChannelId Page</div>
  )
}

export default Channel;