import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from './products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (product) => set((state) => {
        const existingItem = state.items.find(item => item.product.id === product.id);
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        }
        return { items: [...state.items, { product, quantity: 1 }] };
      }),
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.product.id !== productId)
      })),
      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      })),
      clearCart: () => set({ items: [] }),
      setIsOpen: (isOpen) => set({ isOpen }),
    }),
    { name: 'crystal-cart' }
  )
);
