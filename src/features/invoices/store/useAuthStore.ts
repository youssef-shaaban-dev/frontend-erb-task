import { create } from "zustand";
import { Role } from "../types/auth";

interface AuthStore {
  currentRole: Role;
  setRole: (role: Role) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  currentRole: "ADMIN", // Default for demo purposes
  setRole: (role) => set({ currentRole: role }),
}));
