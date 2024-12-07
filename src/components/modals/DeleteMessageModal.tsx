"use client";

import axios from "axios";
import { useState } from "react";
import queryString from "query-string";
import * as Modal from "@/hooks/UseModalStore";

import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


export const DeleteMessageModal = () => {
  const { isOpen, type, CloseModal, data } = Modal.useModal();
  const { apiURL, query } = data;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const HandleClickEvent_Delete = async () => {
    try {
      setIsLoading(true);
      const urlQuery = queryString.stringifyUrl({
        url: apiURL || "",
        query: query
      })
      await axios.delete(urlQuery);
      CloseModal();
    } catch  {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen && type === Modal.ModalType.DELETE_MESSAGE} onOpenChange={CloseModal}>
      <DialogContent className="max-w-md p-0" style={{ background: "#313338" }}>
        <DialogHeader className="pt-6 px-4 pb-0 space-y-4">
          <DialogTitle className="text-xl font-semibold">Delete Message</DialogTitle>
          <DialogDescription className="text-base leading-[1.25] rounded-md">
            Are you sure you want to delete this message?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="p-4" style={{ background: "#2b2d31" }}>
          <Button
            type="button"
            variant={"link"}
            className="font-medium rounded-sm capitalize"
            onClick={() => { CloseModal(); }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isLoading}
            variant={"destructive"}
            size={"lg"}
            className="font-medium rounded-sm capitalize"
            onClick={HandleClickEvent_Delete}
          >
            Delete
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};
