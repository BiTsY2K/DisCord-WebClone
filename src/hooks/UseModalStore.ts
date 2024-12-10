import { create } from "zustand";
import { Channel, ChannelType, Server } from "@prisma/client";

export enum ModalType {
  INVITE,
  SERVER_SETTINGS,
  CHANNEL_SETTINGS,
  
  ADD_SERVER,
  CREATE_SERVER,
  DELETE_SERVER,
  JOIN_SERVER,
  LEAVE_SERVER,

  CREATE_CHANNEL,
  DELETE_CHANNEL,

  DELETE_MESSAGE
}

interface ModalData {
  server?: Server
  channel?: Channel;
  channelType?: ChannelType;
  apiURL?: string;
  query?: Record<string, any>;
}


interface ModalStore {
  type: ModalType | null,
  data: ModalData,
  isOpen: boolean,
  OpenModal: (type: ModalType, data?: ModalData) => void,
  CloseModal: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  OpenModal: (type, data = {}) => set({ isOpen: true, type, data }),
  CloseModal: () => set({ isOpen: false, type: null })
}))