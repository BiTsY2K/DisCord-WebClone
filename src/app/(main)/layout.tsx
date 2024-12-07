import React from "react";
import { NavigationSidebar } from "@/components/navigation/NavigationSidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-svw h-svh flex flex-grow">
      <NavigationSidebar />
      <div className="relative min-w-0 min-h-0 flex flex-col flex-auto overflow-hidden">
        { children }
      </div>
    </div>
  );
}
