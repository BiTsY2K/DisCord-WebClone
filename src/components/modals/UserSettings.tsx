"use client";

"use client";

import React from "react";
import { ModalType, useModal } from "@/hooks/UseModalStore";
import { Trash2Icon } from "lucide-react";

// UI components for a consistent modal design.
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Shadcn-ui components for consistent UI appearance and designs
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ServerOverview } from "@/components/tabs/ServerOverview";


const user_settings = [
  { label: "My Account", content: "" },
  { label: "Profiles", content: "" },
];

const tabTriggerStyle = {
  fontSize: "1rem",
  lineHeight: "1.25rem",
  display: "flex",
  justifyContent: "start",
  width: "100%",
  padding: "0.375rem 0.625rem",
  marginBottom: "0.25rem",
  borderRadius: "0.25rem",
  boxShadow: "none"
};

const tabContentStyle = {};

export const UserSettings = () => {
  const { isOpen, type, OpenModal, CloseModal, data } = useModal();
  const { server } = data;

  return (
    <Dialog
      open={isOpen && type === ModalType.USER_SETTINGS}
      onOpenChange={() => { CloseModal() }}
    >
      <DialogContent onInteractOutdirection={(e) => { e.preventDefault() }}
        className="[&>button]:hidden fixed top-0 left-0 translate-x-0 translate-y-0 max-w-full h-full p-0
          data-[state=closed]:slide-out-to-right-0 data-[state=closed]:slide-out-to-top-0 
          data-[state=open]:slide-in-from-right-0 data-[state=open]:slide-in-from-top-0"
        style={{ background: "#313338" }}
      >
        <DialogHeader className="hidden pt-6 px-4">
          <DialogTitle className="text-2xl text-center"></DialogTitle>
          <DialogDescription className="text-center text-base leading-[1.37]"></DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="h-svh flex">
          {/* Tab List - Modal Side Navigation */}
          <TabsList className="sidebarRegion h-full flex flex-col flex-[1_0_calc(192px+20px+6px)] items-end rounded-none bg-[#f2f3f5] dark:bg-[#2b2d31]">
            <div className="flex flex-auto justify-end w-full h-full items-start">
              <ScrollArea className=" ">
                <div className="h-full w-[calc(192px+20px+6px)] py-[60px] pr-1.5 pl-5">
                  {/* Tab Header */}
                  <div
                    tabIndex={-1}
                    className="text-ellipsis align-baseline whitespace-nowrap overflow-hidden flex-shrink-0 cursor-default py-1.5 px-2.5"
                  >
                    <div className="text-xs text-[#5c5e66] dark:text-[#878986] leading-[12px] tracking-[0.02em] font-bold uppercase text-ellipsis whitespace-nowrap overflow-hidden flex-shrink-0">
                      {server?.name}
                    </div>
                  </div>
                  <Separator className="mb-1.5 mt-3 bg-[#d7d8dd] dark:bg-[#3c3e44]" />

                  {/* User Management */}
                  <div
                    tabIndex={-1}
                    className="text-ellipsis whitespace-nowrap overflow-hidden flex-shrink-0 cursor-default py-1.5 px-2.5"
                  >
                    <div className="text-xs font-bold uppercase text-ellipsis whitespace-nowrap overflow-hidden flex-shrink-0">
                      User Settings
                    </div>
                  </div>
                  <React.Fragment>
                    {user_settings.map((option, _) => (
                      <TabsTrigger
                        key={_}
                        tabIndex={0}
                        value={option.label.toLowerCase()}
                        className="text-base leading-5 font-medium data-[state=active]:cursor-default data-[state=active]:shadow-none 
                        text-[#5c5e66] dark:text-[#b5bac1] hover:text-[#313338] dark:hover:text-[#dbdee1] hover:bg-[#dfe0e3] dark:hover:bg-[#383a40]
                        data-[state=active]:dark:text-white data-[state=active]:dark:bg-[#404249]
                        "
                        style={tabTriggerStyle}
                      >
                        {option.label}
                      </TabsTrigger>
                    ))}
                  </React.Fragment>
                  <Separator className="mb-1.5 mt-3 bg-[#d7d8dd] dark:bg-[#3c3e44]" />

                  {/* User Logout Button */}
                  <Button
                    variant={"ghost"}
                    tabIndex={0}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background 
                        transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
                        disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow cursor-pointer 
                        text-[#5c5e66] dark:text-[#b5bac1] hover:text-[#313338] dark:hover:text-[#dbdee1] hover:bg-[#dfe0e3] dark:hover:bg-[#383a40]"
                    style={tabTriggerStyle}
                    onClick={() =>
                      OpenModal(ModalType.USER_LOGOUT)
                    }
                  >
                    <div className="flex flex-1">Log Out</div>
                    <Trash2Icon className="h-4 w-4 ml-auto" />
                  </Button>
                  <Separator className="mb-1.5 mt-2 bg-[#d7d8dd] dark:bg-[#3c3e44]" />

                </div>
              </ScrollArea>
            </div>
          </TabsList>

          {/* Tab Contents - Modal Contents */}
          <div className="contentRegion relative flex flex-[1_1_800px] items-start bg-white dark:bg-[#313338]">
            <ScrollArea className="h-full w-full flex items-start overflow-x-hidden">
              <TabsContent value="overview" tabIndex={-1}>
                <div className="relative px-10 pt-[60px] pb-20 flex-auto max-w-[740px] min-w-[460px] min-h-full focus-visible:ring-offset-0 ">
                  <ServerOverview server={data.server} />
                </div>
              </TabsContent>

              {/* User Management */}
              <React.Fragment>
                {user_settings.map((option, _) => (
                  <TabsContent
                    key={_}
                    value={option.label.toLowerCase()}
                    tabIndex={-1}
                  >
                    <div className="relative px-10 pt-[60px] py-20 flex-auto max-w-[740px] min-w-[460px] min-h-full focus-visible:ring-offset-0 ">
                      Make changes to your account here.
                    </div>
                  </TabsContent>
                ))}
              </React.Fragment>
            </ScrollArea>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
