// src/stores/memberListStore.ts
import { create } from 'zustand';

interface ToggleButtonStore {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

const useToggleButton = create<ToggleButtonStore>((set) => ({
  isOpen: false, // Initial state: closed
  toggle: () => set((state) => ({ isOpen: !state.isOpen })), // Toggle the state
  open: () => set({ isOpen: true }), // Open the list
  close: () => set({ isOpen: false }), // Close the list
}));

export default useToggleButton;
