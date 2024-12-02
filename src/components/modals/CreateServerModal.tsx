"use client";

import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import * as Modal from "@/hooks/UseModalStore";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FileUpload from "@/components/FileUpload";

const FormSchema = zod.object({
  name: zod.string().min(1, { message: "Server name is required." }),
  imageUrl: zod.string().min(1, { message: "Server image is required." }),
});

export const CreateServerModal = () => {
  const { type, isOpen, OpenModal, CloseModal } = Modal.useModal();
  const router = useRouter();

  const form = useForm<zod.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: "", imageUrl: "" },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (data: zod.infer<typeof FormSchema>) => {
    try {
      await axios.post("/api/servers", data);
      form.reset();
      router.refresh();
      window.location.reload();
      CloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      open={isOpen && type === Modal.ModalType.CREATE_SERVER}
      onOpenChange={CloseModal}
    >
      <DialogContent className="max-w-md p-0" style={{ background: "#313338" }}>
        <DialogHeader className="pt-6 px-4 space-y-2">
          <DialogTitle className="text-2xl text-center">
            Customize Your Server
          </DialogTitle>
          <DialogDescription className="text-center text-base leading-[1.37]">
            Give your new server a personality with a name and an icon. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-4 py-1 px-4">
              <div className="flex justify-center items-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          {...field}
                          type={"image"}
                          width={100}
                          height={100}
                          endpoint={"publicImage"}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label
                      className="text-xs"
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      Server Name
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
                        placeholder="Enter your server name"
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      By creating a server, you agree to Discord's Community
                      Guidelines.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="p-4" style={{ background: "#2b2d31" }}>
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
                type="submit"
                variant={"default"}
                disabled={isLoading}
                className="font-medium rounded-sm px-7"
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
