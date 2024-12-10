"use client";

import axios from "axios";
import queryString from "query-string";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ElementRef, Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from "lucide-react";

import * as Modal from "@/hooks/UseModalStore";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { MemberRole, Member, Profile } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ActionTooltip } from "@/components/ActionTooltips";
import { UserAvatar } from "@/components/UserAvatar";
import { Separator } from "../ui/separator";

type ChatItemProps = {
  id: string;
  message: string;
  member: Member & {
    profile: Profile;
  };

  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
};

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

const FormSchema = zod.object({
  message: zod.string().min(1),
});

export const ChatItem = ({
  id,
  message,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) => {
  const { OpenModal } = Modal.useModal();
  const inputRef = useRef<ElementRef<"input">>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const params = useParams();
  const router = useRouter();

  const onMemberClick = () => {
    if (member.id === currentMember.id) return;
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  const form = useForm<zod.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { message },
  });

  useEffect(() => form.reset({ message }), [message]);
  useEffect(() => {
    const KeydownEventFunction = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsEditing(false);
    };

    window.addEventListener("keydown", KeydownEventFunction);
    return () => window.removeEventListener("keydown", KeydownEventFunction);
  }, []);

  const fileType = fileUrl?.split(".").pop();

  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isMsgOwner = currentMember.id === member.id;

  const canDeleteMessage = !deleted && (isAdmin || isModerator || isMsgOwner);
  const canEditMessage = !deleted && isMsgOwner && !fileUrl;

  useEffect(() => {
    if (isEditing) form.setFocus("message");
  }, [isEditing, form.setFocus]);

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (data: zod.infer<typeof FormSchema>) => {
    try {
      const url = queryString.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });

      await axios.patch(url, data);

      form.reset();
      setIsEditing(false);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const isPDF = fileUrl && fileType === "pdf";
  const isImage = fileUrl && !isPDF;

  return (
    <div className="relative">
      <div className="group relative min-h-[1.375rem] py-0.5 pr-4 pl-[4.5rem] mt-[1.062rem] flex flex-auto grow-0 shrink-0 break-words select-text hover:bg-black/5">
        <div className="absolute left-4 mt-0.5 w-10 h-10 cursor-pointer">
          <UserAvatar
            alt={member.profile.name}
            srcURL={member.profile.imageUrl}
            className="h-full w-full"
          />
        </div>
        <div className="static w-full">
          <h3 className="message-username relative min-h-[1.375rem] leading-[1.375rem] overflow-hidden">
            <span
              className="username mr-1 inline text-base text-[#060607] dark:text-[#f2f3f5] font-medium align-baseline leading-[1.375rem] overflow-hidden hover:underline underline-offset-1"
              role="button"
              tabIndex={0}
              onClick={onMemberClick}
            >
              {member.profile.name}
            </span>
            <span className="timestamp ml-1 inline-block text-xs text-[#5c5e66] dark:text-[#949ba4] font-medium align-baseline leading-[1.375rem] h-5 cursor-default pointer-events-none">
              {timestamp}
            </span>
          </h3>

          {!fileUrl && !isEditing && (
            <div className="message-contents relative overflow-hidden text-base text-[#313338] dark:text-[#dbdee1] leading-[1.375rem] break-words whitespace-break-spaces">
              <span>{message}</span>
              {isUpdated && !deleted && (
                <span className="inline-block h-5 text-[0.75rem] text-[#5c5e66] dark:text-[#949ba4] leading-[1.375rem] align-baseline cursor-default pointer-events-none">
                  &nbsp;(edited)&nbsp;
                </span>
              )}
            </div>
          )}

          {!fileUrl && isEditing && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center w-full gap-x-2 pt-2"
              >
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            disabled={isLoading}
                            aria-disabled={isLoading}
                            className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                            placeholder="Edited message"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  disabled={isLoading}
                  aria-disabled={isLoading}
                  size="sm"
                  variant="default"
                >
                  Save
                </Button>
              </form>

              <div className="text-xs py-1.5 text-[#313338] dark:text-[#dbdee1]">
                escape to{" "}
                <span
                  tabIndex={0}
                  className="cursor-pointer text-[#006be7] dark:text-[#00aafc]"
                >
                  escape to cancel
                </span>
                &nbsp;•&nbsp;enter to{" "}
                <span
                  tabIndex={0}
                  className="cursor-pointer text-[#006be7] dark:text-[#00aafc]"
                >
                  save
                </span>
              </div>
            </Form>
          )}

          {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
            >
              <Image
                src={fileUrl}
                alt={message}
                fill
                className="object-cover"
              />
            </a>
          )}

          {isPDF && (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-zinc-100 dark:bg-zinc-900">
              <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                PDF File
              </a>
            </div>
          )}
        </div>

        {!isEditing && canDeleteMessage && (
          <div className="absolute -top-4 right-0 pr-4 pl-8 hidden group-hover:flex pointer-events-none">
            <div
              className="relative pointer-events-auto grid grid-flow-col items-center justify-center h-auto p-0.5 border border-[#ededef] dark:border-[#232428] 
                rounded-lg shadow-sm bg-[#f2f3f5] dark:bg-[#2b2d31] select-none overflow-hidden transition-shadow duration-100 ease-out"
            >
              {canEditMessage && (
                <ActionTooltip label="Edit">
                  <div className="relative flex items-center justify-center text-[#4e5058] dark:text-[#b5bac1] h-6 min-w-6 p-1 flex-auto grow-0 shrink-0 cursor-pointer">
                    <Edit
                      className="h-4 w-4"
                      onClick={() =>
                        setIsEditing((prevIsEditing) => !prevIsEditing)
                      }
                    />
                  </div>
                </ActionTooltip>
              )}
              <ActionTooltip label="Delete">
                <div className="relative flex items-center justify-center text-[#4e5058] dark:text-[#b5bac1] h-6 min-w-6 p-1 flex-auto grow-0 shrink-0 cursor-pointer">
                  <Trash
                    className="h-4 w-4"
                    onClick={() =>
                      OpenModal(Modal.ModalType.DELETE_MESSAGE, {
                        apiURL: `${socketUrl}/${id}`,
                        query: socketQuery,
                      })
                    }
                  />
                </div>
              </ActionTooltip>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
