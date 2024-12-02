"use client";

import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { Hash, SpeakerIcon } from "lucide-react";

import * as Modal from "@/hooks/UseModalStore";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


const FormSchema = zod.object({
  channel_type: zod.enum(["TEXT", "VOICE"], {
    required_error: "You need to select a notification type.",
  }),
  name: zod.string().min(1, {
    message: "Channel name is required." 
  }).transform((val) => val.toLowerCase().replace(/\s+/g, "=")),
});

export const CreateChannelModal = () => {
  const [channelType, setChannelType] = React.useState<"TEXT" | "VOICE">("TEXT");
  const {type, isOpen, OpenModal, CloseModal} = Modal.useModal();

  const [value, setValue] = React.useState("");

  const router = useRouter();
  const params = useParams();

  const form = useForm<zod.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { channel_type: channelType , name: "" },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (data: zod.infer<typeof FormSchema>) => {
    try {
      await axios.post("/api/channels", {
        ...data, 
        serverId: params?.serverId
      });
      form.reset();
      window.location.reload();
      CloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .toLowerCase()
      .replace(/\s+/g, "-"); 
    setValue(value);
    form.setValue("name", value);
  }

  return (
    <Dialog open={isOpen && type === Modal.ModalType.CREATE_CHANNEL} onOpenChange={()=>{CloseModal(); form.reset();}}>
      <DialogContent className="max-w-md p-0" style={{ background: "#313338" }}>
        <DialogHeader className="pt-6 px-4 space-y-2">
          <DialogTitle className="text-2xl">Create Channel</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-4 py-1 px-4">
              <FormField
                control={form.control}
                name="channel_type"
                render={({ field }) => (
                  <FormItem>
                    <Label
                      className="text-xs"
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                      }}
                    >
                      Channel Name
                    </Label>
                    <FormControl>
                      <RadioGroup {...field} onValueChange={field.onChange} defaultValue={"TEXT"}>
                        <Label htmlFor="r1" className={cn("group flex flex-row-reverse items-center gap-3 rounded border p-3 bg-[#2b2d31] border-none cursor-pointer", channelType=="TEXT" ? "bg-[#43444b]" : "")}>
                          <RadioGroupItem value="TEXT" id="r1" onClick={()=>setChannelType("TEXT")}/>
                          <div className="flex flex-1 items-center space-x-3 cursor-pointer">
                            <Hash />
                            <div className="flex-1 space-y-1">
                              <p className="text-base font-medium leading-none">Text</p>
                              <p className="text-xs text-muted-foreground">Send messages, images, GIFs, emoji, opinions, and puns</p>
                            </div>
                          </div>
                        </Label>

                        <Label htmlFor="r2" className={cn("group flex flex-row-reverse items-center gap-3 rounded border p-3 bg-[#2b2d31] border-none cursor-pointer", channelType=="VOICE" ? "bg-[#43444b]" : "")}>
                          <RadioGroupItem value="VOICE" id="r2" onClick={()=>setChannelType("VOICE")} />
                          <div className="flex flex-1 items-center space-x-3 cursor-pointer">
                            <SpeakerIcon />
                            <div className="flex-1 space-y-1">
                              <p className="text-base font-medium leading-none">Voice</p>
                              <p className="text-xs text-muted-foreground">Hang out together with voice, video, and screen share</p>
                            </div>
                          </div>
                        </Label>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Channel Name Field */}
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
                      Channel Name
                    </Label>
                    <FormControl>
                      <div className="flex items-center pl-2 bg-[#1e1f22]">
                        {form.watch("channel_type") === "TEXT" ? (
                          <Hash className="size-4" />
                        ) : (
                          <SpeakerIcon className="size-4" />
                        )}
                        <Input
                          {...field}
                          disabled={isLoading}
                          className="h-10 rounded-sm focus-visible:ring-0 "
                          style={{
                            background: "#1e1f22",
                            border: 0,
                            fontSize: "1rem",
                          }}
                          value={value}
                          onChange={handleChange}
                          placeholder="new-channel"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="p-4" style={{ background: "#2b2d31" }}>
              <Button
                type="button"
                variant={"link"}
                className="font-medium rounded-sm px-7"
                onClick={()=>{CloseModal(); form.reset();}}
              >
                Back
              </Button>
              <Button type="submit" variant={"default"} disabled={isLoading} className="font-medium rounded-sm px-7">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
