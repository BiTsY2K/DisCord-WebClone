"use client";

import axios from "axios";
import queryString from "query-string";

import * as Modal from "@/hooks/UseModalStore";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";
// import { EmojiPicker } from "../emoji-picker";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ChatInputProps {
  apiURL: string,
  name: string,
  query: Record<string, any>,
  type: "CHANNEL" | "CONVERSATION"
};

const FormSchema = zod.object({
  message: zod.string().min(1),
});

export const ChatInput = ({ apiURL, name, query, type }: ChatInputProps) => {
  const { OpenModal } = Modal.useModal();
  const form = useForm<zod.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { message: "" },
  });
  
  const router = useRouter();
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (data: zod.infer<typeof FormSchema>) => {
    try {
      const url = queryString.stringifyUrl({
        url: apiURL,
        query,
      });

      await axios.post(url, data);
      form.reset();
      form.setFocus("message");
      router.refresh();
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="message-form" className="px-4">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl autoCorrect="">
                  <div className="relative h-auto w-full flex items-start mb-6 bg-zinc-200/90 dark:bg-[#383a40]">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button type="button" variant={"default"} size={"icon"} className="h-6 max-w-6 my-2.5 mx-4 rounded-full">
                          <Plus className="min-h-4 min-w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[15rem]">
                        <DropdownMenuGroup>
                          <DropdownMenuItem className="flex items-center justify-between min-h-8 px-2 py-1.5 my-0.5 font-medium cursor-pointer">
                            <span className="">
                              <svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M13.82 21.7c.17.05.14.3-.04.3H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h7.5c.28 0 .5.22.5.5V5a5 5 0 0 0 5 5h2.5c.28 0 .5.22.5.5v2.3a.4.4 0 0 1-.68.27l-.2-.2a3 3 0 0 0-4.24 0l-4 4a3 3 0 0 0 0 4.25c.3.3.6.46.94.58Z"></path>
                                <path fill="currentColor" d="M21.66 8c.03 0 .05-.03.04-.06a3 3 0 0 0-.58-.82l-4.24-4.24a3 3 0 0 0-.82-.58.04.04 0 0 0-.06.04V5a3 3 0 0 0 3 3h2.66ZM18.3 14.3a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1-1.4 1.4L20 17.42V23a1 1 0 1 1-2 0v-5.59l-2.3 2.3a1 1 0 0 1-1.4-1.42l4-4Z"></path>
                              </svg>
                            </span>  
                            <div className="flex flex-1">Upload a File</div>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <Textarea
                      {...field}
                      rows={1}
                      autoFocus
                      disabled={isLoading}
                      aria-disabled={isLoading}
                      className="resize-none overflow-hidden min-h-11 md:text-base text-zinc-600 dark:text-muted-foreground border-none shadow-none focus-visible:ring-0 focus-visible:ring-none"
                      placeholder={`Message ${
                        type === "CONVERSATION" ? name : "#" + name
                      }`}

                      onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`
                      }}

                      onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();const form = document.getElementById("message-form") as HTMLFormElement;
                          const textareaValue = e.currentTarget.value.trim();
                          if (!!textareaValue.length) {
                            form.requestSubmit();
                          }
                          e.currentTarget.value = ""; 
                          e.currentTarget.style.height = "auto";
                          e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`
                        }
                      }}
                    />

                    {/* <div className="absolute top-7 right-8">
                      <EmojiPicker
                        onChange={(emoji: string) =>
                          field.onChange(`${field.value}${emoji}`)
                        }
                      />
                    </div> */}
                  </div>
                {/* <ScrollArea className="overflow-x-hidden">
                </ScrollArea> */}

              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};