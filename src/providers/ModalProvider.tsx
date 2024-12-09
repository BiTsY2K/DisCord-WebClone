"use client"

import { useEffect, useState } from "react";
import { InviteModal } from "@/components/modals/InviteModal";
import { JoinServerModal } from "@/components/modals/JoinServerModal";

import { AddServerModal } from "@/components/modals/SERVER_MODALS/AddServerModal"
import { CreateServerModal } from "@/components/modals/SERVER_MODALS/CreateServerModal";
import { DeleteServerModal } from "@/components/modals/SERVER_MODALS/DeleteServerModal";

import { CreateChannelModal } from "@/components/modals/CHANNEL_MODALS/CreateChannelModal";
import { DeleteChannelModal } from "@/components/modals/CHANNEL_MODALS/DeleteChannelModal";

import { DeleteMessageModal } from "@/components/modals/DeleteMessageModal";

import { ServerSettings } from "@/components/modals/EditServerSettings";
import { ChannelSettings } from "@/components/modals/EditChannelSettings";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) { return null; }

  return (
    <>
      <AddServerModal />
      <CreateServerModal />
      <JoinServerModal />
      <InviteModal />
      <ServerSettings />
      <ChannelSettings />
      <DeleteServerModal />
      <CreateChannelModal />
      <DeleteChannelModal />
      <DeleteMessageModal />
    </>
  )
}