"use client";

import React from "react";
// Custom hook for managing modal state (open, close, etc.)
import * as Modal from "@/hooks/UseModalStore";
// Custom hook to retrieve the current application origin URL.
import { useOrigin } from "@/hooks/UseOrigin";

// Utilitliy function to construct dynamic class
import { cn } from "@/lib/utils";

// Icons used from different library
import { Check, Copy } from "lucide-react";
import { IoSettingsSharp } from "react-icons/io5";

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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// Custtom component to display the tooltips for user actions.
import { ActionTooltip } from "@/components/ActionTooltips";


export const InviteModal = () => {
  const { type, data, isOpen, CloseModal } = Modal.useModal();

  // Tracks whether the invite URL has been successfully copied to the clipboard.
  const [isCopied, setIsCopied] = React.useState(false);

  // Retrieves the base URL (origin) of the application, 
  // ensuring the invite URL is generated dynamically
  const origin = useOrigin(); 
  // Constructs the full invite URL using the application origin and the server's unique invite code.
  const inviteURL = `${origin}/invites/${data?.server?.inviteCode}`;

  // Tracks whether the invite link should expire or not.
  const [neverExpire, setNeverExpire] = React.useState(false);

  // Copies the invite URL to the clipboard and 
  // provides temporary user feedback via `isCopied` state.
  const copyInviteUrl = () => {
    // Copies the invite URL to the user's clipboard
    navigator.clipboard.writeText(inviteURL);
    setIsCopied(true);

    // Resets the copied feedback state after 1 second.
    setTimeout(() => {
      setIsCopied(false);
    }, 700);
  };

  return (
    <Dialog
      open={isOpen && type === Modal.ModalType.INVITE}
      onOpenChange={CloseModal}
    >
      <DialogContent className="max-w-md p-0 border-none bg-white dark:bg-[#313338] overflow-hidden">
        <DialogHeader className="pt-6 px-4 pb-0">
          <DialogTitle className="text-base leading-[1.25] font-bold text-[#313338] dark:text-[#dbdee1]">
            Invite friends to {data.server?.name}
          </DialogTitle>
          <DialogDescription className="text-center text-sm"></DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 py-2 px-4">
          <Label htmlFor="invite-link" className="mb-1 text-[#4e5058] dark:text-[#b5bac1]">
            Share the link with others to grant access to your server!
          </Label>
          <div className="input flex items-center justify-center text-base w-full rounded-sm text-[#313338] dark:text-[#dbdee1] bg-[#d1d3d6] dark:bg-[#1e1f22]">
            <div className="input-wrapper flex flex-col flex-grow">
              <Input
                id="invite-link"
                defaultValue={inviteURL}
                readOnly
                className="h-10 md:text-base font-medium border-none focus-visible:ring-0 rounded-sm 
                text-[#313338] dark:text-[#dbdee1] bg-[#d1d3d6] dark:bg-[#1e1f22]
                  w-full bg-transparent text-ellipsis overflow-hidden whitespace-nowrap min-w-0"
                style={{ fontSize: "1rem", lineHeight: "1.3" }}
              />
            </div>
            <ActionTooltip label={"Copy"} direction={"top"} align={"center"} >
              <Button
                type="button"
                size={"sm"}
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
            </ActionTooltip>
          </div>
          <div className="text-xs  text-[#5c5e66] dark:text-[#949ba4]">Your invite link expires {neverExpire ? "will never expire" : "in 7 days"}.</div>
        </div>

        <DialogFooter
          className="items-center space-x-0 p-4 bg-[#f2f3f5] dark:bg-[#2b2d31]"
        >
          <div className="w-full flex flex-grow text-center space-x-2 cursor-pointer" onClick={() => setNeverExpire(!neverExpire)}>
            <Checkbox id="link-expire" checked={neverExpire} />
            <label htmlFor="link-expire" className="text-sm leading-[1.2] text-[#313338] dark:text-[#dbdee1] pointer-events-none">
              Set this link to never expire
            </label>
          </div>
          <ActionTooltip label="Link Settings" side="top" align="center">
            <Button type="button" variant={"ghost"} size={"icon"} className="size-8 text-[#80848e] ">
              <IoSettingsSharp className="min-w-6 min-h-6" />
            </Button>
          </ActionTooltip>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
