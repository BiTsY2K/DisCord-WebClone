"use client"

import React from "react";
import * as Modal from "@/hooks/UseModalStore";
import { Server, Member, Profile, MemberRole } from "@prisma/client";

import { ChevronDown } from "lucide-react";
import { FaArrowRightToBracket, FaCirclePlus, FaFolderPlus, FaPencil, FaShieldHalved } from "react-icons/fa6";
import { IoNotifications, IoSettingsSharp } from "react-icons/io5";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

interface ServerHeaderProps {
  server: Server & { 
    members: ( Member & { profile: Profile } )[]
  },
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {

  const { OpenModal } = Modal.useModal();

  const isAdmin = role == MemberRole.ADMIN;
  const isModerator = isAdmin  || role == MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <header className="relative h-12 flex items-center justify-between gap-1 font-semibold shadow-md text-[#313338] dark:text-[#dbdee1] hover:bg-[#dfe0e3] dark:hover:bg-[#383a40] px-4 py-3 transition-colors duration-100 ease-linear">
          <h2 className="text-ellipsis min-w-0 whitespace-nowrap overflow-hidden">{server.name}</h2>
          <ChevronDown className="min-h-5 min-w-5 ml-auto" />
        </header>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[13.75rem] font-medium px-2 py-1.5 hove:bg-[#949cf7]">
        { isModerator && (
          <DropdownMenuItem onClick={() => OpenModal(Modal.ModalType.INVITE, { server } )}>
            <div className="flex flex-1">Invite People</div>
            <div className="w-4 h-4 ml-auto">
              <svg className="icon_d90b3d" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14.5 8a3 3 0 1 0-2.7-4.3c-.2.4.06.86.44 1.12a5 5 0 0 1 2.14 3.08c.01.06.06.1.12.1ZM16.62 13.17c-.22.29-.65.37-.92.14-.34-.3-.7-.57-1.09-.82-.52-.33-.7-1.05-.47-1.63.11-.27.2-.57.26-.87.11-.54.55-1 1.1-.92 1.6.2 3.04.92 4.15 1.98.3.27-.25.95-.65.95a3 3 0 0 0-2.38 1.17ZM15.19 15.61c.13.16.02.39-.19.39a3 3 0 0 0-1.52 5.59c.2.12.26.41.02.41h-8a.5.5 0 0 1-.5-.5v-2.1c0-.25-.31-.33-.42-.1-.32.67-.67 1.58-.88 2.54a.2.2 0 0 1-.2.16A1.5 1.5 0 0 1 2 20.5a7.5 7.5 0 0 1 13.19-4.89ZM9.5 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM15.5 22Z" className=""></path>
                <path fill="currentColor" d="M19 14a1 1 0 0 1 1 1v3h3a1 1 0 0 1 0 2h-3v3a1 1 0 0 1-2 0v-3h-3a1 1 0 1 1 0-2h3v-3a1 1 0 0 1 1-1Z" className=""></path>
              </svg>
            </div>  
          </DropdownMenuItem>
        )}

        { isAdmin && (
          <DropdownMenuItem onClick={() => OpenModal(Modal.ModalType.SERVER_SETTINGS, { server } )}>
            <div className="flex flex-1">Server Settings</div>
            <IoSettingsSharp className="w-5 h-5 ml-auto" />
          </DropdownMenuItem>
        )}

        { isModerator && (
          <React.Fragment>
            <DropdownMenuItem onClick={() => OpenModal(Modal.ModalType.CREATE_CHANNEL, { server } )}>
              <div className="flex flex-1">Create Channel</div>
              <FaCirclePlus className="w-5 h-5 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem >
              <div className="flex flex-1">Create Category</div>
              <FaFolderPlus className="w-5 h-5 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem >
              <div className="flex flex-1">Create Event</div>
              <div className="w-5 h-5 ml-auto">
                <svg className="icon_d90b3d" aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path d="M19 14a1 1 0 0 1 1 1v3h3a1 1 0 0 1 0 2h-3v3a1 1 0 0 1-2 0v-3h-3a1 1 0 1 1 0-2h3v-3a1 1 0 0 1 1-1Z" fill="currentColor"></path>
                  <path fillRule="evenodd" d="M22 13.67c0 .12-.33.17-.39.06A2.87 2.87 0 0 0 19 12a3 3 0 0 0-3 3v.5a.5.5 0 0 1-.5.5H15a3 3 0 0 0-3 3c0 1.2.7 2.1 1.73 2.61.11.06.06.39-.06.39H5a3 3 0 0 1-3-3v-9a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v3.67ZM5.5 12a.5.5 0 0 0-.5.5v3c0 .28.22.5.5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3Z" clipRule="evenodd" fill="currentColor"></path>
                  <path d="M7 1a1 1 0 0 1 1 1v.75c0 .14.11.25.25.25h7.5c.14 0 .25-.11.25-.25V2a1 1 0 1 1 2 0v.75c0 .14.11.25.25.25H19a3 3 0 0 1 3 3 1 1 0 0 1-1 1H3a1 1 0 0 1-1-1 3 3 0 0 1 3-3h.75c.14 0 .25-.11.25-.25V2a1 1 0 0 1 1-1Z" fill="currentColor"></path>
                </svg>
              </div>
            </DropdownMenuItem>
          </React.Fragment>
        )}

        <DropdownMenuSeparator />
        
        <DropdownMenuItem >
          <div className="flex flex-1">Notification Settings</div>
          <IoNotifications className="w-5 h-5 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem >
          <div className="flex flex-1">Privacy Settings</div>
          <FaShieldHalved className="w-5 h-5 ml-auto" />
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />

        { isAdmin && (
          <DropdownMenuItem >
            <div className="flex flex-1">Edit Server Profile</div>
            <FaPencil className="w-5 h-5 ml-auto" />
          </DropdownMenuItem>
        )}
        
        <div className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 
          text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent
          data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0"
        >
          <label htmlFor="terms" className="flex flex-1">Hide Muted Channel</label>
          <Checkbox id="terms" className="ml-auto"/>
        </div>

        { !isAdmin && (
          <DropdownMenuItem >
            <div className="flex flex-1">Leave Channel</div>
            <FaArrowRightToBracket className="w-5 h-5 ml-auto" />
          </DropdownMenuItem>
        )}
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}