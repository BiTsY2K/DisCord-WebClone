"use client"

import React from "react";
import { Button } from "./ui/button";
import { CommandGroup, CommandDialog, CommandEmpty, CommandInput, CommandItem, CommandList, Command } from "./ui/command";
import { Separator } from "./ui/separator";
import { useParams, useRouter } from "next/navigation";

interface FindStartConversationProps {
  data: {
    label: string;
    type: "CHANNEL" | "MEMBER";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

export const FindStartConversation = ({ data }: FindStartConversationProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  React.useEffect(()=>{
    const kbdDown = (e: KeyboardEvent) => {
      if(e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((isOpen) => !isOpen);
      }
    }

    document.addEventListener("keydown", kbdDown);
    return ()=>document.removeEventListener("keydown", kbdDown);
  }, []);

  const router = useRouter();
  const params = useParams();

  const redirect = ({
    id, type
  }:{id: string, type: "CHANNEL" | "MEMBER"}) => {
    setIsOpen(false);
    switch (type) {
      case "CHANNEL": return (router.push(`/servers/${params?.serverId}/channels/${id}`));
      case  "MEMBER": return (router.push(`/servers/${params?.serverId}/conversations/${id}`));
      default:
        break;
    }
  }

  return (
    <React.Fragment>
      <Button
        type="button"
        size={"sm"}
        className="group w-full justify-start font-medium px-2 bg-[#1e1f22] text-muted-foreground hover:bg-[#1e1f22]"
        onClick={()=>setIsOpen(true)}
      >
        Find or start a conversation
      </Button>

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <Command className="min-w-xl w- px-5 pt-5 pb-1.5 rounded-md bg-[#2b2d31]">
          <CommandInput className="flex flex-grow text-xl min-h-[4.5rem] min-w-full px-3 -mx-3 bg-[#1e1f22]" placeholder="Where would you like to go?"/>
          <CommandList className="p-0">
            <CommandEmpty>No Results Found</CommandEmpty>
              {data.map(({ label, type, data}) => {
                if (!data?.length) return null;
                return (
                  <CommandGroup key={label} className="-mx-2 flex-1 mt-4 max-h-60" 
                    heading={
                      <div className="flex items-end">
                        <div className="text-xs uppercase font-semibold">{label}</div>
                      </div>
                    } >
                    
                    {data?.map(({ id, icon, name}) => {
                      return (
                        <CommandItem key={id} className="hover:bg-[#3f4248]" onSelect={()=>redirect({id, type})}>
                          {icon}
                          <span>{name}</span>
                        </CommandItem>
                      )
                    })}
                  </CommandGroup>
                )
              })}
          </CommandList>
          {/* <Separator className="bg-[#3f4248]" /> */}
        </Command>
      </CommandDialog>
    </React.Fragment>
  );
};
