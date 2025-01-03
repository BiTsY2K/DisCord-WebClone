import {create} from "zustand";
import { Profile, Server } from "@prisma/client";

export const useProfile = create<{
  profile: Profile | null,
  setProfile: (profile: Profile) => void
}>((set) => ({ profile: null, setProfile: (profile: any) => set({profile}) }))

export const useServers = create<{
  servers: Server[] | [],
  setServers: (servers: any) => void
}>((set) => ({ servers: [], setServers: (servers: any) => set({servers})
}))