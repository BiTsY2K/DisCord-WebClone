"use client";

import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import React from "react";

import { ModalType, useModal } from "@/hooks/UseModalStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ServerOverview } from "@/components/tabs/ServerOverview";

const settings = [
  { label: "Overview", content: "" },
];

const userManagementOptions = [
  { label: "Members", contents: "" },
  { label: "Invites", contents: "" },
];

const tabTriggerStyle = {
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  display: "flex",
  justifyContent: "start",
  width: "100%",
  padding: "0.375rem 0.625rem",
  marginBottom: "0.25rem",
  borderRadius: "0.25rem",
};

const tabContentStyle = {};

export const ServerSettings = () => {
  const { isOpen, type, OpenModal, CloseModal, data } = useModal();
  const { server } = data;

  return (
    <Dialog
      open={isOpen && type === ModalType.SERVER_SETTINGS}
      onOpenChange={CloseModal}
    >
      <DialogContent onInteractOutside={(e) => { e.preventDefault()}}
        className="[&>button]:hidden fixed top-0 left-0 translate-x-0 translate-y-0 max-w-full h-full p-0
          data-[state=closed]:slide-out-to-right-0  data-[state=closed]:slide-out-to-top-0 
          data-[state=open]:slide-in-from-right-0 data-[state=open]:slide-in-from-top-0"
        style={{ background: "#313338" }}
      >
        <DialogHeader className="hidden pt-6 px-4">
          <DialogTitle className="text-2xl text-center"></DialogTitle>
          <DialogDescription className="text-center text-base leading-[1.37]"></DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="h-svh flex">
          <TabsList className="sidebarRegion h-full flex flex-col flex-[1_0_calc(192px+20px+6px)] items-end rounded-none bg-[#2b2d31]">
            <div className="flex flex-auto justify-end w-full h-full items-start">
              <ScrollArea className=" ">
                <div className="h-full w-[calc(192px+20px+6px)] py-[60px] pr-1.5 pl-5">
                  <div
                    tabIndex={-1}
                    className="text-ellipsis whitespace-nowrap overflow-hidden flex-shrink-0 cursor-default py-1.5 px-2.5"
                  >
                    <div className="text-xs font-bold uppercase text-ellipsis whitespace-nowrap overflow-hidden flex-shrink-0">
                      BITS DEVELOPEMENT'S SERVER
                    </div>
                  </div>

                  {/* Server Overview */}
                  <TabsTrigger
                    tabIndex={0}
                    value="overview"
                    className="hover:bg-[#404249]"
                    style={tabTriggerStyle}
                  >
                    Overview
                  </TabsTrigger>
                  <Separator className="my-2 bg-[#525458]" />

                  {/* User Management */}
                  <div
                    tabIndex={-1}
                    className="text-ellipsis whitespace-nowrap overflow-hidden flex-shrink-0 cursor-default py-1.5 px-2.5"
                  >
                    <div className="text-xs font-bold uppercase text-ellipsis whitespace-nowrap overflow-hidden flex-shrink-0">
                      User Management
                    </div>
                  </div>
                  <React.Fragment>
                    {userManagementOptions.map((option, _) => (
                      <TabsTrigger
                        key={_}
                        tabIndex={0}
                        value={option.label.toLowerCase()}
                        className="hover:bg-[#404249]"
                        style={tabTriggerStyle}
                      >
                        {option.label}
                      </TabsTrigger>
                    ))}
                  </React.Fragment>
                  <Separator className="my-2 bg-[#525458]" />

                  {/* Delete Server */}
                  <div
                    tabIndex={0}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background 
                        transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
                        disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow cursor-pointer 
                        hover:bg-[#404249]"
                    style={tabTriggerStyle}
                    onClick={() => OpenModal(ModalType.DELETE_SERVER, { server })}
                  >
                    <div className="flex flex-1">Delete Server</div>
                    <span className="h-4 w-4 ml-auto">
                      <svg
                        aria-hidden="true"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M14.25 1c.41 0 .75.34.75.75V3h5.25c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75H3.75A.75.75 0 0 1 3 4.25v-.5c0-.41.34-.75.75-.75H9V1.75c0-.41.34-.75.75-.75h4.5Z"
                        ></path>
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M5.06 7a1 1 0 0 0-1 1.06l.76 12.13a3 3 0 0 0 3 2.81h8.36a3 3 0 0 0 3-2.81l.75-12.13a1 1 0 0 0-1-1.06H5.07ZM11 12a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6Zm3-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </TabsList>
          <div className="contentRegion relative flex flex-[1_1_800px] items-start bg-[#313338]">
            <ScrollArea className="h-full flex items-start overflow-x-hidden">
              <TabsContent value="overview" tabIndex={-1}>
                <div className="relative px-10 pt-[60px] pb-20 flex-auto max-w-[740px] min-w-[460px] min-h-full focus-visible:ring-offset-0 ">
                  <ServerOverview server={data.server}/>
                </div>
              </TabsContent>

              {/* User Management */}
              <React.Fragment>
                {userManagementOptions.map((option, _) => (
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
