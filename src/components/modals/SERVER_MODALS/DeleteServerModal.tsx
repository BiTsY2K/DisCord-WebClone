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
  serverName: zod
    .string()
    .min(1, { message: "Server name is required to delete." }),
});

export const DeleteServerModal = () => {
  const { isOpen, type, CloseModal, data } = Modal.useModal();
  const router = useRouter();

  // Setting up the form with default values and schema validation.
  const form = useForm<zod.infer<typeof FormSchema>>({
    // Ensures form data meets validation criteria before submission.
    resolver: zodResolver(FormSchema),
    defaultValues: { serverName: "" },
  });

  // Resets the form on page load to clear any previously entered data, 
  // ensuring a fresh start in case the form wasn't submitted.
  React.useEffect(() => { form.reset(); }, [isOpen]);

  const server = data?.server;
  const [isLoading, setIsLoading] = React.useState(false);
  const onSubmit = async (data: zod.infer<typeof FormSchema>) => {
    // Ensure the deleting server is the current server
    if (data.serverName === server?.name) {
      try {
        setIsLoading(true);
        // Send validated form data to the backend to create a new server.
        await axios.delete(`/api/servers/${server?.id}`);
        router.push("/"); // Navigate the user to the homepage after a successful deletion.
        router.refresh(); // Refreshes the page data to reflect the deleted server with requiring navigation.
        // Closes the modal to indicate that the operation has completed.
        CloseModal();
      } catch (error) {
        // TODO: Toast AXIOS Error
        // Logs the error for debugging.
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog
      open={isOpen && type === Modal.ModalType.DELETE_SERVER}
      onOpenChange={() => CloseModal()}
    >
      <DialogContent className="max-w-md p-0 border-none bg-white dark:bg-[#313338] overflow-hidden [&>button]:hidden select-none">
        <DialogHeader className="pt-6 px-4 pb-0 space-y-4 cursor-default">
          <DialogTitle className="text-xl leading-[1.25] font-bold tracking-[0.01em] text-[#313338] dark:text-[#dbdee1]">
            Delete '{server?.name}'
          </DialogTitle>
          <DialogDescription className="text-base leading-[1.25] bg-[#f0b232] text-white p-2.5 rounded-md">
            Are you sure you want to delete <strong>{server?.name}</strong>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid gap-4 py-2 px-4">
              <FormField
                control={form.control}
                name="serverName"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-xs text-[#4e5058] dark:text-[#b5bac1] uppercase font-bold">
                      Enter Server Name
                    </Label>
                    <FormControl autoFocus>
                      <Input
                        {...field}
                        autoFocus
                        disabled={isLoading}
                        className="h-10 md:text-base font-medium border-none focus-visible:ring-0 rounded-sm text-[#313338] dark:text-[#dbdee1] bg-[#d1d3d6] dark:bg-[#1e1f22]
                         placeholder:text-[#5c5e66] dark:placeholder:text-[#878986]"
                        placeholder=""
                      />
                    </FormControl>
                    <FormMessage className="mt-[0.25rem_!important] text-xs dark:text-[#f23f43]" />
                    {/* <FormDescription className="text-xs">By creating a server, you agree to Discord's Community Guidelines.</FormDescription> */}
                  </FormItem>
                )}
              />
            </div>

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
                type="submit"
                disabled={isLoading}
                variant={"destructive"}
                className="font-medium rounded-sm capitalize"
              >
                Delete Server
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
