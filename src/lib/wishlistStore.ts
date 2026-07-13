import { create } from 'zustand';

interface WishlistState {
  items: string[];
  setItems: (items: string[]) => void;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
}

export const useWishlist = create<WishlistState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  addItem: (id) => set((state) => ({ items: state.items.includes(id) ? state.items : [...state.items, id] })),
  removeItem: (id) => set((state) => ({ items: state.items.filter(i => i !== id) })),
}));
