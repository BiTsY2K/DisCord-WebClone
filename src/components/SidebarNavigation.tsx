"use client"

import { useProfile } from "@/hooks/UseDBStore";
import { UserPanel } from "@/components/UserPanel"

interface SidebarNavigationProps { children: React.ReactNode }

export const SidebarNavigation = ({
  children
}: SidebarNavigationProps) => {
  const profile = useProfile((state) => state.profile);

  return (
    // <div className="relative h-full w-full flex flex-auto items-stretch justify-start overflow-hidden">
    // <div className="min-h-full min-w-0 flex flex-col items-stretch flex-start "> */}
    <div className="sidebar min-h-0 w-60 flex flex-[0_0_auto] flex-col overflow-hidden bg-[#f2f3f5] dark:bg-[#2b2d31]">
      <nav className="relative flex flex-col items-stretch justify-start flex-auto min-h-0">
        {children}
      </nav>

      <UserPanel userprofile={profile} />
    </div>
    // </div> */}
    // </div>
  )
}
