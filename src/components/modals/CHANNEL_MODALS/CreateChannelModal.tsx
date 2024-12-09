"use client";

import axios from "axios";
import React from "react";
import queryString from "query-string";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";

// Custom hook for managing modal state (open, close, etc.)
import * as Modal from "@/hooks/UseModalStore";

// Schema-based validation for the form inputs.
import * as zod from "zod";
// Connects Zod schema to react-hook-form for validation.
import { zodResolver } from "@hookform/resolvers/zod";

import { Hash, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

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
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

// Shadcn-ui components for consistent UI appearance and designs
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Zod Form Schema for validation the Create Server form
const FormSchema = zod.object({
  channel_type: zod.enum(["TEXT", "VOICE"], {
    required_error: "You need to select a notification type.",
  }),
  name: zod
    .string()
    .min(1, {
      message: "Channel name is required.",
    })
    .transform((val) => val.toLowerCase().replace(/\s+/g, "=")),
});

export const CreateChannelModal = () => {
  const [channelType, setChannelType] = React.useState<"TEXT" | "VOICE">("TEXT");
  const { type, isOpen, CloseModal } = Modal.useModal();

  const [value, setValue] = React.useState<string>("");
  
  const router = useRouter();
  const params = useParams();
  
  // Setting up the form with default values and schema validation.
  const form = useForm<zod.infer<typeof FormSchema>>({
    // Ensures form data meets validation criteria before submission.
    resolver: zodResolver(FormSchema),
    defaultValues: { channel_type: channelType, name: "" },
  });

  // Resets the form on page load to clear any previously entered data, 
  // ensuring a fresh start in case the form wasn't submitted.
  React.useEffect(() => { 
    form.reset();
    setChannelType("TEXT"); 
    setValue("");
  }, [isOpen]);

  // Tracks submission state of the form to disable UI Elements.
  const isLoading = form.formState.isSubmitting;

  // Handles form submission, API request, and post-submission actions.
  const onSubmit = async (data: zod.infer<typeof FormSchema>) => {
    try {
      // Builds the API URL with query parameters that includes the server ID
      // from the route params, to create a channel specific to a server.
      const apiURL = queryString.stringifyUrl({
        url: "/api/channels",
        query: {
          serverId: params?.serverId,
        },
      });

      // Sends API request to create a new channel.
      await axios.post(apiURL, data);
      
      form.reset();   // Clears form fields after successful submission to prepare for the next input.
      setValue("");   // Updates the local value state to empty string.
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

  
  // Handles input change event, formatting the input value to ensuring the form input follows the expected format.
  const handleInputOnChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Converts the input value to lowercase and replaces spaces with hyphens to standardize the format.
    const value = e.target.value.toLowerCase().replace(/\s+/g, "-");
    setValue(value);    // Updates the local value state to reflect the sanitized input.
    form.setValue("name", value);   // Sets the sanitized value in the form's 'name' field, 
  };

  return (
    <Dialog
      open={isOpen && type === Modal.ModalType.CREATE_CHANNEL}
      onOpenChange={() => CloseModal()}
    >
      <DialogContent className="max-w-md p-0 border-none bg-white dark:bg-[#313338] overflow-hidden select-none">
        <DialogHeader className="pt-6 px-4 space-y-2 cursor-default">
          <DialogTitle className="text-2xl">Create Channel</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-4 py-1 px-4">
              <FormField
                control={form.control}
                name="channel_type"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-xs text-[#4e5058] dark:text-[#b5bac1] uppercase font-bold">
                      Channel Name
                    </Label>
                    <FormControl>
                      <RadioGroup
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={"TEXT"}
                      >
                        <Label
                          htmlFor="r1"
                          className={cn(
                            "group flex flex-row-reverse items-center gap-3 rounded border p-3 border-none cursor-pointer",
                            channelType == "TEXT"
                              ? "bg-[#e1e1e4] dark:bg-[#41434a]"
                              : "bg-[#f2f3f5] dark:bg-[#2b2d31] hover:bg-[#eaebed] dark:hover:bg-[#383a40]"
                          )}
                        >
                          <RadioGroupItem
                            value="TEXT"
                            id="r1"
                            onClick={() => setChannelType("TEXT")}
                            className={cn(
                              "shadow-none",
                              channelType == "TEXT"
                                ? "border-[#060607] [&>span]:text-[#e1e1e4] [&>span]:fill-[#060607] dark:border-[#fff] [&>span]:dark:text-[#41434a] [&>span]:dark:fill-[#fff]"
                                : "border-[#4e5058] dark:border-[#b5bac1]"
                            )}
                          />
                          <div className="flex flex-1 items-center space-x-2 cursor-pointer">
                            <Hash
                              className={cn(
                                channelType == "TEXT"
                                  ? "text-[#5d5d5f] dark:text-[#b3b4b7]"
                                  : "text-[#879096] dark:text-[]"
                              )}
                            />
                            <div className="flex-1 space-y-1">
                              <p className="text-base font-medium leading-none text-[#313338] dark:text-[#dbdee1]">
                                Text
                              </p>
                              <p className="text-sm text-[#4e5058] dark:text-[#b5bac1]">
                                Send messages, images, GIFs, emoji, opinions,
                                and puns
                              </p>
                            </div>
                          </div>
                        </Label>

                        <Label
                          htmlFor="r2"
                          className={cn(
                            "group flex flex-row-reverse items-center gap-3 rounded border p-3 border-none cursor-pointer",
                            channelType == "VOICE"
                              ? "bg-[#e1e1e4] dark:bg-[#41434a]"
                              : "bg-[#f2f3f5] dark:bg-[#2b2d31] hover:bg-[#eaebed] dark:hover:bg-[#383a40]"
                          )}
                        >
                          <RadioGroupItem
                            value="VOICE"
                            id="r2"
                            onClick={() => setChannelType("VOICE")}
                            className={cn(
                              "shadow-none",
                              channelType == "VOICE"
                                ? "border-[#060607] [&>span]:text-[#e1e1e4] [&>span]:fill-[#060607] dark:border-[#fff] [&>span]:dark:text-[#41434a] [&>span]:dark:fill-[#fff]"
                                : "border-[#4e5058] dark:border-[#b5bac1]"
                            )}
                          />
                          <div className="flex flex-1 items-center space-x-2 cursor-pointer">
                            <Mic
                              className={cn(
                                channelType == "VOICE"
                                  ? "text-[#5d5d5f] dark:text-[#b3b4b7]"
                                  : "text-[#879096] dark:text-[]"
                              )}
                            />
                            <div className="flex-1 space-y-1">
                              <p className="text-base font-medium leading-none text-[#313338] dark:text-[#dbdee1]">
                                Voice
                              </p>
                              <p className="text-sm text-[#4e5058] dark:text-[#b5bac1]">
                                Hang out together with voice, video, and screen
                                share
                              </p>
                            </div>
                          </div>
                        </Label>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* channel-name form field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-xs text-[#313338] dark:text-[#dbdee1] uppercase font-bold">
                      Channel Name
                    </Label>
                    <FormControl autoFocus>
                      <div className="flex items-center pl-2 disabled:cursor-default disabled:opacity-50
                      text-[#313338] dark:text-[#dbdee1] bg-[#d1d3d6] dark:bg-[#1e1f22]">
                        {form.watch("channel_type") === "TEXT" && (
                          <Hash className="size-5" />
                        )}
                        {form.watch("channel_type") === "VOICE" && (
                          <Mic className="size-5" />
                        )}

                        <Input
                          {...field}
                          autoFocus
                          disabled={isLoading}
                          aria-disabled={isLoading}
                          className="h-10 px-1.5 md:text-base font-medium border-none focus-visible:ring-0 rounded-sm 
                          text-[#313338] dark:text-[#dbdee1] bg-[#d1d3d6] dark:bg-[#1e1f22]
                          placeholder:text-[#5c5e66] dark:placeholder:text-[#878986]"
                          value={value}
                          onChange={handleInputOnChangeEvent}
                          placeholder="new-channel"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="mt-[0.25rem_!important] text-xs dark:text-[#f23f43]"/>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="p-4 bg-[#f2f3f5] dark:bg-[#2b2d31]">
              <Button
                type="button"
                variant={"link"}
                className="font-medium rounded-sm px-7"
                onClick={() => CloseModal() }
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
