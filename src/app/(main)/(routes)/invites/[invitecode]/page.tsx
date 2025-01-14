import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

type InviteCodePageProps = {
  params: {
    invitecode: string;
  };
};

export default async function InviteCode({ params }: InviteCodePageProps) {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/sign-in");
  }

  const inviteCode = await params?.invitecode;
  if (!inviteCode) {
    redirect("/");
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: inviteCode,
      members: { some: { profileId: profile.id } },
    },
  });

  if (existingServer) {
    redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: { inviteCode: inviteCode },
    data: {
      members: {
        create: [{ profileId: profile.id }],
      },
    },
  });

  if (server) {
    redirect(`/servers/${server.id}`);
  }

  return null;
}
