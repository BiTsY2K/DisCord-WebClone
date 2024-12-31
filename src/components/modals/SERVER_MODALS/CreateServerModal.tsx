"use client";

import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

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

// Custom file upload component for handling image uploads.
import FileUpload from "@/components/FileUpload";
import Link from "next/link";

// Zod Form Schema for validation the Create Server form 
const FormSchema = zod.object({
  name: zod.string().min(1, { message: "Server name is required." }),
  imageUrl: zod.string().min(1, { message: "Server image is required. Upload again" }),
});


export const CreateServerModal = () => {
  const { type, isOpen, OpenModal, CloseModal } = Modal.useModal();
  const router = useRouter();

  // Setting up the form with default values and schema validation.
  const form = useForm<zod.infer<typeof FormSchema>>({
    // Ensures form data meets validation criteria before submission.
    resolver: zodResolver(FormSchema),
    defaultValues: { name: "", imageUrl: "" },  
  });

  // Resets the form on page load to clear any previously entered data, 
  // ensuring a fresh start in case the form wasn't submitted.
  React.useEffect(() => { form.reset(); }, [isOpen]);

  // Tracks submission state of the form to disable UI Elements.
  const isLoading = form.formState.isSubmitting;

  // Handles form submission, API request, and post-submission actions.
  const onSubmit = async (data: zod.infer<typeof FormSchema>) => {
    try {
      // Send validated form data to the backend to create a new server.
      await axios.post("/api/servers", data);
      form.reset();   // Clears form fields after successful submission to prepare for the next input.
      router.refresh();   // Refreshes the page data to reflect the newly created server without requiring navigation.
      // window.location.reload(); // Forces a full reload to ensure all updates are accurately reflected.
      // Closes the modal to indicate that the operation has completed.
      CloseModal();
    } catch (error) {
      // TODO: Toast AXIOS Error
      // Logs the error for debugging.
      console.error(error);
    }
  };

  return (
    <Dialog
      open={isOpen && type === Modal.ModalType.CREATE_SERVER}
      onOpenChange={() => CloseModal()}
    >
      <DialogContent className="max-w-md p-0 border-none bg-white dark:bg-[#313338] overflow-hidden select-none">
        <DialogHeader className="pt-6 px-4 space-y-2 cursor-default">
          <DialogTitle className="text-2xl leading-[1.25] text-center font-bold text-[#313338] dark:text-[#dbdee1]">
            Customize Your Server
          </DialogTitle>
          <DialogDescription className="text-base leading-[1.25] text-center text-[#4e5058] dark:text-[#b5bac1]">
            Give your new server a personality with a name and an icon. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-4 py-1 px-4">

              {/* file-upload form field */}
              <div className="flex justify-center items-center -mb-2">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem className="w-4/5">
                      <FormControl>
                        <FileUpload
                          {...field}
                          type={"IMAGE"}
                          width={100}
                          height={100}
                          endpoint={"SERVER_IMAGE"}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage className="mt-[0.25rem_!important] text-xs dark:text-[#f23f43] text-center"/>
                    </FormItem>
                  )}
                />
              </div>

              {/* server-name form field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label
                      className="text-xs text-[#4e5058] dark:text-[#b5bac1] uppercase font-bold"
                    >
                      Server Name
                    </Label>
                    <FormControl autoFocus>
                      <Input
                        {...field}
                        autoFocus
                        disabled={isLoading}
                        className="h-10 md:text-base font-medium border-none focus-visible:ring-0 rounded-sm text-[#313338] dark:text-[#dbdee1] bg-[#d1d3d6] dark:bg-[#1e1f22]
                         placeholder:text-[#5c5e66] dark:placeholder:text-[#878986]"
                        placeholder="Enter your server name"
                      />
                    </FormControl>
                    <FormMessage className="mt-[0.25rem_!important] text-xs dark:text-[#f23f43]"/>
                    <FormDescription className="text-xs text-[#4e5058] dark:text-[#b5bac1]">
                      By creating a server, you agree to Discord's&nbsp;
                      <Link href="/" className="text-[#006be7] dark:text-[#00aafc] font-semibold">Community Guidelines</Link>.
                    </FormDescription>
                  </FormItem>
                )}
              />
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
