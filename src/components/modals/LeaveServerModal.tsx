"use client";

import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import queryString from "query-string";

// Custom hook for managing modal state (open, close, etc.)
import * as Modal from "@/hooks/UseModalStore";

// UI components for a consistent modal design.
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
// Shadcn-ui components for consistent UI appearance and designs
import { Button } from "@/components/ui/button";

export const LeaveServerModal = () => {
  const { isOpen, type, CloseModal, data } = Modal.useModal();
  const router = useRouter();

  const { channel, server } = data;
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClickEventOnLeave = async () => {
    try {
      setIsLoading(true);

      // Sends API request to Leave a server.
      await axios.patch(`/api/servers/${server?.id}/leave`);

      router.push(`/`); // Redirects the user to the specific server page using its ID to display relevant server data.
      router.refresh(); // Refreshes the page data to reflect the newly created server without requiring navigation.
    } catch (error) {
      // TODO: Toast AXIOS Error
      // Logs the error for debugging.
      console.error(error);
    } finally {
      setIsLoading(false);
      CloseModal(); // Closes the modal to indicate that the operation has completed.
    }
  };

  return (
    <Dialog
      open={isOpen && type === Modal.ModalType.LEAVE_SERVER}
      onOpenChange={() => CloseModal()}
    >
      <DialogContent className="max-w-md p-0 border-none bg-white dark:bg-[#313338] overflow-hidden [&>button]:hidden select-none">
        <DialogHeader className="pt-6 px-4 pb-0 space-y-4 cursor-default">
          <DialogTitle className="text-xl leading-[1.25] font-semibold tracking-[0.01em] text-[#313338] dark:text-[#dbdee1]">
            Leave {server?.name}
          </DialogTitle>
          <DialogDescription className="pb-5 text-base leading-[1.25] text-[#4e5058] dark:text-[#b5bac1]">
            Are you sure you want to leave <strong>#{server?.name}</strong>? You
            won't be able to rejoin this server unless you are re-invited .
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="p-4 bg-[#f2f3f5] dark:bg-[#2b2d31]">
          <Button
            type="button"
            variant={"link"}
            className="font-medium rounded-sm capitalize"
            onClick={() => CloseModal()}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            type="button"
            disabled={isLoading}
            variant={"destructive"}
            className="font-medium rounded-sm capitalize"
            onClick={() => handleClickEventOnLeave()}
          >
            Delete Channel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
