"use client";

import React from "react";
import * as Modal from "@/hooks/UseModalStore";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { ChevronRight } from "lucide-react";

import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const formSchema = zod.object({
  invite_link: zod.string().min(1, { message: "Server name is required." }),
});

export const JoinServerModal = () => {
  const {type, isOpen, OpenModal, CloseModal} = Modal.useModal();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { invite_link: ""},
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: zod.infer<typeof formSchema>) => {
    console.log("form val: ", values);
  };

  return (
    <div className="">
      <Dialog open={isOpen && type === Modal.ModalType.JOIN_SERVER} onOpenChange={CloseModal}>
        <DialogContent className="max-w-md p-0" style={{ background: "#313338" }}>
          <DialogHeader className="pt-6 px-4 pb-0">
            <DialogTitle className="text-2xl text-center mt-6 mb-2">Join a Server</DialogTitle>
            <DialogDescription className="text-center text-sm">
              Enter an invite below to join an existing server
            </DialogDescription>
          </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <div className="grid gap-4 py-2 px-4">
                  <FormField
                    control={form.control}
                    name="invite_link"
                    render={({ field }) => (
                      <FormItem>
                        <Label
                          className="text-xs"
                          style={{
                            textTransform: "uppercase",
                            fontWeight: "bold",
                          }}
                        >
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
                            className="h-10 rounded-sm"
                            style={{
                              background: "#1e1f22",
                              border: 0,
                              fontSize: "1rem",
                            }}
                            placeholder="https://bitscord.rr/hTRrAOi"
                          />
                        </FormControl>
                        {/* <FormDescription className="text-xs">By creating a server, you agree to Discord's Community Guidelines.</FormDescription> */}
                      </FormItem>
                    )}
                  />

                  {/* Invite link examples */}
                  <div className="flex flex-col gap-2">
                    <div
                      className="text-xs"
                      style={{ textTransform: "uppercase", fontWeight: "bold" }}
                    >
                      Invites Should Look Like
                    </div>
                    <div
                      className="invites-types text-sm"
                      style={{ lineHeight: 1.3 }}
                    >
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
                    <div className="flex flex-1 items-center">
                      <div className="text-left" style={{ textAlign: "left" }}>
                        <div className="text-base font-semibold">
                          Don't have an Invite?
                        </div>
                        <div className="text-xs">
                          Check out Discoverable communities in Server Discovery.
                        </div>
                      </div>
                      <ChevronRight className="min-h-6 min-w-6" />
                    </div>
                  </Button>
                </div>

                <DialogFooter className="p-4" style={{ background: "#2b2d31" }}>
                  <Button
                    type="button"
                    variant={"link"}
                    className="font-medium rounded-sm px-7"
                    onClick={() => { OpenModal(Modal.ModalType.ADD_SERVER) }}
                  >
                    Back
                  </Button>
                  <Button
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
    </div>
  );
};
