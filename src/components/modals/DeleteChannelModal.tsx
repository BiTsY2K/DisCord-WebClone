"use client";

import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form";

import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import * as Modal from "@/hooks/UseModalStore";
import axios from "axios";
import { useRouter } from "next/navigation";


const formSchema = zod.object({
  server_name: zod.string().min(1, { message: "Server name is required." }),
});

export const DeleteChannelModal = () => {
  const { isOpen, type, CloseModal, data } = Modal.useModal();
  const server = data?.server;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { server_name: ""},
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const onSubmit = async (data: zod.infer<typeof formSchema>) => {
    console.log("form val: ", data);
    if (data.server_name === server?.name) {
      try {
        setIsLoading(true);
        await axios.delete(`/api/servers/${server?.id}`);
        router.refresh();
        router.push('/');
        CloseModal();
      } catch (error) {
        // TODO: Toast AXIOS Error
      } finally {
        setIsLoading(false)
      }
    }
  };

  return (
    <Dialog open={isOpen && type === Modal.ModalType.DELETE_CHANNEL} onOpenChange={CloseModal}>
      <DialogContent className="max-w-md p-0" style={{ background: "#313338" }}>
        <DialogHeader className="pt-6 px-4 pb-0 space-y-4">
          <DialogTitle className="text-xl font-medium">Delete '{server?.name}' server</DialogTitle>
          <DialogDescription className="text-sm bg-[#f0b232] text-white p-2.5 rounded-md">
            Are you sure you want to delete <strong>{server?.name} server</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="grid gap-4 py-2 px-4">
                <FormField
                  control={form.control}
                  name="server_name"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        className="text-xs"
                        style={{
                          textTransform: "uppercase",
                          fontWeight: "bold",
                        }}
                      >
                        Enter Server Name
                      </Label>
                      <FormControl>
                        <Input
                          {...field}
                          autoFocus
                          disabled={isLoading}
                          className="h-10 rounded-sm"
                          style={{
                            background: "#1e1f22",
                            border: 0,
                            fontSize: "1rem",
                          }}
                          placeholder=""
                        />
                      </FormControl>
                      {/* <FormDescription className="text-xs">By creating a server, you agree to Discord's Community Guidelines.</FormDescription> */}
                    </FormItem>
                  )}
                />
              </div>

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
                  type="submit"
                  disabled={isLoading}
                  variant={"destructive"}
                  size={""}
                  className="font-medium rounded-sm capitalize"
                >
                  Delete Channel
                </Button>
              </DialogFooter>
            </form>
          </Form>

      </DialogContent>
    </Dialog>
  );
};
