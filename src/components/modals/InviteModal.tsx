"use client";

import React from "react";
import { cn } from "@/lib/utils";
import * as Modal from "@/hooks/UseModalStore";
import { Check, Copy } from "lucide-react";
import { IoSettingsSharp } from "react-icons/io5";


import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionTooltip } from "@/components/action-tooltips";

export const InviteModal = () => {
  const { type, data, isOpen, CloseModal } = Modal.useModal();

  const [isCopied, setIsCopied] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  
  const inviteURL = "https://discord.gg/EmUQCNwtRjJKmsEmUQCNwtRjJKms";
  const [neverExpire, setNeverExpire] = React.useState(false);

  const copyInviteUrl = () => {
    navigator.clipboard.writeText(inviteURL);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };


  return (
    <Dialog
      open={isOpen && type === Modal.ModalType.INVITE}
      onOpenChange={CloseModal}
    >
      <DialogContent className="p-0" style={{ background: "#313338" }}>
        <DialogHeader className="">
          <DialogTitle className="text-base">
            Invite friends to {data.server?.name}'s server
          </DialogTitle>
          <DialogDescription className="text-center text-sm"></DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 py-2 px-4">
          <Label htmlFor="invite-link" className="mb-1">
            Share the link with others to frant access to your server!
          </Label>
          <div className="input flex items-center justify-center text-base w-full rounded-sm bg-[#1e1f22]">
            <div className="input-wrapper flex flex-col flex-grow">
              <Input
                id="invite-link"
                defaultValue={inviteURL}
                readOnly
                className="h-10 w-full rounded-sm border-none focus-visible:ring-0 bg-transparent text-ellipsis overflow-hidden whitespace-nowrap min-w-0"
                style={{ fontSize: "1rem", lineHeight: "1.3" }}
              />
            </div>
            <Button
              type="button"
              size={"sm"}
              disabled={isLoading}
              onClick={copyInviteUrl}
              className={cn(
                "px-3 mr-1.5 rounded-sm",
                isCopied ? "bg-emerald-500 hover:bg-emerald-500 cursor-default" : ""
              )}
            >
              {isCopied ? (
                <React.Fragment>
                  <span className="sr-only">Copied</span>
                  <Check />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <span className="sr-only">Copy</span>
                  <Copy />
                </React.Fragment>
              )}
            </Button>
          </div>
          <div className="text-xs">Your invite link expires {neverExpire ? "will never expire" : "in 7 days"}.</div>
        </div>

        <DialogFooter
          className="items-center space-x-0"
          style={{ background: "#2b2d31" }}
        >
          <div className="w-full flex flex-grow text-center space-x-2 cursor-pointer" onClick={() => setNeverExpire(!neverExpire)}>
            <Checkbox id="link-expire" checked={neverExpire} />
            <label htmlFor="link-expire" className="text-sm leading-[1.2] pointer-events-none">
              Set this link to never expire
            </label>
          </div>
          <ActionTooltip label="Link Settings" side="top" align="center">
            <Button type="button" variant={"ghost"} size={"icon"} className="size-8">
              <IoSettingsSharp className="min-w-6 min-h-6" />
            </Button>
          </ActionTooltip>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
