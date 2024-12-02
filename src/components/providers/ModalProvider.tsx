"use client"

import React from "react";
import { AddServerModal } from "@/components/modals/AddServerModal"
import { InviteModal } from "@/components/modals/InviteModal";
import { ServerSettings } from "@/components/modals/ServerSettings";
import { DeleteServerModal } from "@/components/modals/DeleteServerModal";
import { JoinServerModal } from "../modals/JoinServerModal";
import { CreateServerModal } from "../modals/CreateServerModal";
import { CreateChannelModal } from "../modals/CreateChannelModal";
import { DeleteChannelModal } from "../modals/DeleteChannelModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) { return null; }

  return (
    <React.Fragment>
      <AddServerModal />
      <CreateServerModal />
      <JoinServerModal />
      <InviteModal />
      <ServerSettings />
      <DeleteServerModal />
      <CreateChannelModal />
      <DeleteChannelModal />
    </React.Fragment>
  )
}