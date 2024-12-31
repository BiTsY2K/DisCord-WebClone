import { db } from "@/lib/db";
import { getAuth } from "@clerk/nextjs/server";
import type { NextApiRequest } from "next";
import type { NextApiResponseWithSocket } from "@/pages/api/socket/io";

export const currentProfile = async (req: NextApiRequest) => {
  const { userId } = getAuth(req);
  if (!userId) return null;

  const profile = await db.profile.findUnique({ where: { userId } });
  return profile;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed." });

  try {
    const profile = await currentProfile(req);
    if (!profile) return res.status(401).json({ error: "Unauthorized." });

    const { message:content, fileURL } = req.body;
    const { channelId, serverId } = req.query;

    if (!channelId)
      return res.status(400).json({ error: "Missing Channel ID." });

    if (!serverId) return res.status(400).json({ error: "Missing Server ID." });
    if (!content) return res.status(400).json({ error: "Missing Message Content." });

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: { some: { profileId: profile.id } },
      },
      include: { members: true },
    });

    if (!server) return res.status(404).json({ message: "Server not found." });

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });

    if (!channel) return res.status(404).json({ message: "Channel not found." });

    const member = server.members.find((member) => member.profileId === profile.id);
    if (!member) return res.status(404).json({ message: "Member not found." });

    const message = await db.message.create({
      data: {
        message: content,
        fileURL: fileURL,
        channelId: channelId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          },
        },
      },
    });

    const channelKey = `chat:${channelId}:messages`;
    res?.socket?.server?.io?.emit(channelKey, message);
    
    return res.status(200).json(message);
  } catch (error: unknown) {
    console.error("[MESSAGES_POST]: ", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
}
