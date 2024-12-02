import React from "react";
import { NavigationSidebar } from "@/components/navigation/nav-sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full h-svh flex">
      <NavigationSidebar />
      <main>
        { children }
      </main>
    </div>
  );
}
