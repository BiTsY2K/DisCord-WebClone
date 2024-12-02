import { Server } from "@prisma/client";
import { create } from "zustand";

export enum ModalType {
  INVITE,
  ADD_SERVER,
  CREATE_SERVER,
  JOIN_SERVER,
  DELETE_SERVER,
  SERVER_SETTINGS,
  CREATE_CHANNEL,
  DELETE_CHANNEL,
}

export interface ModalData {
  server?: Server
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