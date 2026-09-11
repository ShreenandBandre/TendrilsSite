import { create } from "zustand";

export const useUIStore = create((set) => ({
isMobileNavOpen: false,
openMobileNav: () => set({ isMobileNavOpen: true }),
closeMobileNav: () => set({ isMobileNavOpen: false }),
}));
