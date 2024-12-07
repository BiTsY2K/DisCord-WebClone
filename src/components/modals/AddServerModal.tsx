"use client";

import Image from "next/image";

import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        <DialogContent className="max-w-md p-0 border-none bg-white dark:bg-[#313338] overflow-hidden">
          <DialogHeader className="pt-6 px-4 pb-0">
            <DialogTitle className="text-2xl leading-[1.25] text-center font-bold text-[#313338] dark:text-[#dbdee1]">
              Create Your Server
            </DialogTitle>
            <DialogDescription className="text-base leading-[1.25] text-center text-[#4e5058] dark:text-[#b5bac1]">
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
              <div className="flex flex-1 items-stretch text-[#313338] dark:text-[#dbdee1]">
                <div className="text-base font-semibold w-full flex flex-grow">Create My Own</div>
                <ChevronRight className="min-h-6 min-w-6 text-[#4f5660]" />
              </div>
            </Button>
          </div>

          <DialogFooter className="p-4 bg-[#f2f3f5] dark:bg-[#2b2d31]">
            <div className="w-full text-center space-y-2">
              <div className="text-xl text-[#313338] dark:text-[#dbdee1] leading-[1.2] font-semibold cursor-default">
                Have an invite already?
              </div>
              <Button
                type="button"
                variant={"default"}
                size={"lg"}
                className="w-full font-semibold rounded-sm"
                onClick={() => {
                  OpenModal(Modal.ModalType.JOIN_SERVER)
                }}
              >
                Join a Server
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
