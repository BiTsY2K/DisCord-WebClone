import type { NextApiRequest } from "next";

import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { currentProfile } from "@/lib/current-profile";
import { NextApiResponseIOServer } from "../io";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseIOServer,
) {
  if (req.method !== "DELETE" && req.method !== "PATCH")
    return res.status(405).json({ error: "Method not allowed." });

  try {
    const profile = await currentProfile(req);
    if (!profile) return res.status(401).json({ error: "Unauthorized." });

    const { message:new_msg } = req.body;
    const { messageid, serverId, channelId } = req.query;
    if (!serverId)  return res.status(400).json({ error: "Missing Server ID." });
    if (!channelId) return res.status(400).json({ error: "Missing Channel ID." });

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        members: true,
      },
    });
    if (!server) return res.status(404).json({ error: "Server not found." });

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });
    if (!channel) return res.status(404).json({ error: "Channel not found." });


    const member = server.members.find((member) => member.profileId === profile.id);
    if (!member) return res.status(404).json({ error: "Member not found." });

    let message = await db.message.findFirst({
      where: {
        id: messageid as string,
        channelId: channelId as string,
      },
      include: {member: {include: { profile: true }}},
    });

    if (!message || message.deleted)
      return res.status(404).json({ error: "Message not found." });

    const isAdmin     = member.role === MemberRole.ADMIN;
    const isModerator = member.role === MemberRole.MODERATOR;
    const isMsgOwner  = message.memberId === member.id;

    const canModify = isAdmin || isModerator || isMsgOwner;
    if (!canModify) return res.status(401).json({ error: "Unauthorized." });

    if (req.method === "DELETE") {
      message = await db.message.update({
        where: { id: messageid as string },
        data:  { deleted: true, fileURL: null, message: "This message has been deleted." },
        include: {member: {include: { profile: true }}},
      });
    }

    if (req.method === "PATCH") {
      if (!isMsgOwner)
        return res.status(401).json({ error: "Unauthorized." });

      message = await db.message.update({
        where: { id: messageid as string },
        data:  { message: new_msg as string },
        include: {member: {include: { profile: true }}},
      });
    }

    const updateKey = `chat:${channelId}:messages:update`;
    res?.socket?.server?.io?.emit(updateKey, message);

    return res.status(200).json(message);
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
}