import { NavigationSidebar } from "@/components/navigation/nav-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Home() {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/sign-in");
  }
  
  const server = await db.server.findFirst({
    where: {
      members: {
        some: { profileId: profile.id }
      }
    }
  })

  if (server) return redirect(`/servers/${server.id}`)
  return (
    <div className="relative w-full h-svh flex">
      <NavigationSidebar />
    </div>
  );
}

/**
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { AddServerModal } from "@/lib/modals/AddServerModal";
import { redirect } from "next/navigation";

const SetUpPage = async () => {
  const profile = await initialProfile();
  const server = await db.server.findFirst({
    where: {
      members: {
        some: { profileId: profile.id }
      }
    }
  })

  if (server) return redirect(`/servers/${server.id}`)

  return (
    <div className="">
      <AddServerModal />
    </div>
  )
}

export default SetUpPage
 
*/