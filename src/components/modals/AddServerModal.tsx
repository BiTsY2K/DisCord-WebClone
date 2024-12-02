"use client";

import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import { CreateServerModal } from "@/components/modals/CreateServerModal";
import { JoinServerModal } from "@/components/modals/JoinServerModal";
import { Button } from "@/components/ui/button";
import { ActionTooltip } from "@/components/action-tooltips";

import * as Modal from "@/hooks/UseModalStore";

export const AddServerModal = () => {
  const  { type, isOpen, OpenModal, CloseModal } = Modal.useModal();

  // const [isParentOpen, setIsParentOpen] = React.useState(false);
  // const [joinServer, setJoinServer] = React.useState(false);
  // const [createServer, setCreateServer] = React.useState(false);

  // React.useEffect(() => {
  //   isOpen ? setIsParentOpen(true) : setIsParentOpen(false);
  // }, [isOpen])

  return (
    <div className="">
      <Dialog open={isOpen && type === Modal.ModalType.ADD_SERVER} onOpenChange={CloseModal}>
        {/* <DialogTrigger asChild>
          <div className="group/listItem">
          <ActionTooltip side="right" align="center" label="Direct Messages" sideOffset={16}>
            <div className="listItemWrapper peer">
              <Link href={"/"} passHref className="">
                <div className="wrapper relative w-[3rem] h-[3rem] flex items-center justify-center text-[#23a55a] group-hover/listItem:text-primary
                  rounded-full group-hover/listItem:rounded-2xl bg-[#313338] group-hover/listItem:bg-[#23a55a]"> 
                    <Plus className="min-h-[2rem] min-w-[2rem]"/>
                </div>
              </Link>
            </div>
            
            <div className="pill absolute top-0 left-0 w-2 h-12 hidden group-hover/listItem:flex items-center" aria-hidden>
              <span className="rounded-e-sm block w-2 h-6 -ml-1 opacity-1 group-hover/listItem:bg-red-600 group-active/listItem:h-10"></span>
            </div>
          </ActionTooltip>
          </div>
        </DialogTrigger> */}

        <DialogContent className="max-w-md p-0" style={{ background: "#313338" }}>
          <DialogHeader className="pt-6 px-4 pb-0">
            <DialogTitle className="text-2xl text-center">
              Create Your Server
            </DialogTitle>
            <DialogDescription className="text-center text-base leading-[1.37]">
              Your server is where you and your friends hang out. Make yours and
              start talking.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-2 px-4">
            <Button
              variant={"outline"}
              style={{ height: "4.187rem" }}
              className="flex justify-start gap-2 bg-transparent shadow-none"
              onClick={() => {
                OpenModal(Modal.ModalType.CREATE_SERVER)
              }}
            >
              <Image alt="" src="/next.svg" width={48} height={48} />
              <div className="flex flex-1 items-stretch">
                <div className="text-base font-semibold w-full flex flex-grow">Create My Own</div>
                <ChevronRight className="min-h-6 min-w-6" />
              </div>
            </Button>
          </div>
          <DialogFooter className="p-4" style={{ background: "#2b2d31" }}>
            <div className="w-full text-center space-y-2">
              <div
                className="font-semibold cursor-default"
                style={{ fontSize: "1.25rem", lineHeight: "1.75rem" }}
              >
                Have an invite already?
              </div>
              <Button
                variant={"default"}
                size={"lg"}
                className="w-full font-semibold rounded-sm"
                onClick={() => {
                  OpenModal(Modal.ModalType.JOIN_SERVER)
                  // CloseModal
                }}
              >
                Join a Server
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* <CreateServerModal isOpen={createServer} setIsOpen={setCreateServer} setParentOpen={setIsParentOpen} />
      <JoinServerModal isOpen={joinServer} setIsOpen={setJoinServer} setParentOpen={setIsParentOpen}/> */}
    </div>
  );
};
