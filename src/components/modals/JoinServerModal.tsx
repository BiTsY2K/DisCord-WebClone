"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ChevronRight } from "lucide-react";

// Custom hook for managing modal state (open, close, etc.)
import * as Modal from "@/hooks/UseModalStore";

// Schema-based validation for the form inputs.
import * as zod from "zod";
// Connects Zod schema to react-hook-form for validation.
import { zodResolver } from "@hookform/resolvers/zod";

// UI components for a consistent modal design.
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Styled components for building forms and displaying validation messages.
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

// Shadcn-ui components for consistent UI appearance and designs
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Zod Form Schema for validation the Create Server form
const FormSchema = zod.object({
  inviteLink: zod.string().min(1, { message: "Server name is required." }),
});

export const JoinServerModal = () => {
  const { type, isOpen, OpenModal, CloseModal } = Modal.useModal();
  const router = useRouter();

  // Setting up the form with default values and schema validation.
  const form = useForm<zod.infer<typeof FormSchema>>({
    // Ensures form data meets validation criteria before submission.
    resolver: zodResolver(FormSchema),
    defaultValues: { inviteLink: "" },
  });

  // Tracks submission state of the form to disable UI Elements.
  const isLoading = form.formState.isSubmitting;
  // Handles form submission, API request, and post-submission actions.
  const onSubmit = async (data: zod.infer<typeof FormSchema>) => {
    console.log("form val: ", data);
    router.push(`/invites/${data.inviteLink}`);
  };

  return (
    <Dialog
      open={isOpen && type === Modal.ModalType.JOIN_SERVER}
      onOpenChange={() => CloseModal()}
    >
      <DialogContent className="max-w-md p-0 border-none bg-white dark:bg-[#313338] overflow-hidden select-none">
        <DialogHeader className="pt-6 px-4 pb-0 cursor-default">
          <DialogTitle className="text-2xl tracking-[0.01em] leading-[1.25] text-center font-bold text-[#313338] dark:text-[#dbdee1] mt-6 mb-2">
            Join a Server
          </DialogTitle>
          <DialogDescription className="text-sm leading-[1.25] text-center text-[#4e5058] dark:text-[#b5bac1]">
            Enter an invite below to join an existing server
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="grid gap-4 py-2 px-4">
              <FormField
                control={form.control}
                name="inviteLink"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-xs text-[#4e5058] dark:text-[#b5bac1] uppercase font-bold">
                      Invite Link
                      <span className="text-sm" style={{ color: "#dc2626" }}>
                        {" "}
                        *
                      </span>
                    </Label>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isLoading}
                        className="h-10 md:text-base font-medium border-none focus-visible:ring-0 rounded-sm text-[#313338] dark:text-[#dbdee1] bg-[#d1d3d6] dark:bg-[#1e1f22]
                          placeholder:text-[#5c5e66] dark:placeholder:text-[#878986]"
                        placeholder="https://bitscord.rr/hTRrAOi"
                      />
                    </FormControl>
                    <FormMessage className="mt-[0.25rem_!important] text-xs dark:text-[#f23f43]" />
                  </FormItem>
                )}
              />

              {/* Invite link examples */}
              <div className="flex flex-col gap-2">
                <div className="text-xs text-[#4e5058] dark:text-[#b5bac1] uppercase font-bold">
                  Invites Should Look Like
                </div>
                <div className="invites-types text-sm leading-[1.3] text-[#060607] dark:text-[#f2f3f5]">
                  <p>hTRrAOi</p>
                  <p>https://bitscord.rr/hTRrAOi.gg</p>
                  <p>https://bitscord.rr/bits-cord</p>
                </div>
              </div>

              <Button
                type="button"
                variant={"outline"}
                style={{ height: "4.187rem" }}
                className="flex justify-start gap-2 bg-transparent shadow-none"
              >
                <Image alt="" src="/next.svg" width={48} height={48} />
                <div className="flex flex-1 items-center text-[#313338] dark:text-[#dbdee1]">
                  <div className="text-left" style={{ textAlign: "left" }}>
                    <div className="text-base font-semibold">
                      Don't have an Invite?
                    </div>
                    <div className="text-xs">
                      Check out Discoverable communities in Server Discovery.
                    </div>
                  </div>
                  <ChevronRight className="min-h-6 min-w-6 text-[#4f5660]" />
                </div>
              </Button>
            </div>

            <DialogFooter className="p-4 bg-[#f2f3f5] dark:bg-[#2b2d31]">
              <Button
                type="button"
                variant={"link"}
                className="font-medium rounded-sm px-7"
                onClick={() => {
                  OpenModal(Modal.ModalType.ADD_SERVER);
                }}
              >
                Back
              </Button>
              <Button
                autoFocus
                type="submit"
                disabled={isLoading}
                variant={"default"}
                className="font-medium rounded-sm px-7"
              >
                Join Server
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
