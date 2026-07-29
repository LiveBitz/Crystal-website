import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from './products';

export interface CartItem {
  product: Product;
  quantity: number;
  // Which size variant this line item is for, if the product has variants.
  // Keeps `product.id` untouched (still the real, database-matching id) so
  // checkout/order lookups always resolve correctly.
  selectedSize?: string;
}

function sameLine(item: CartItem, productId: string, selectedSize?: string) {
  return item.product.id === productId && item.selectedSize === selectedSize;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, selectedSize?: string) => void;
  removeItem: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (product, selectedSize) => set((state) => {
        const existingItem = state.items.find(item => sameLine(item, product.id, selectedSize));
        if (existingItem) {
          return {
            items: state.items.map(item =>
              sameLine(item, product.id, selectedSize)
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        }
        return { items: [...state.items, { product, quantity: 1, selectedSize }] };
      }),
      removeItem: (productId, selectedSize) => set((state) => ({
        items: state.items.filter(item => !sameLine(item, productId, selectedSize))
      })),
      updateQuantity: (productId, quantity, selectedSize) => set((state) => ({
        items: state.items.map(item =>
          sameLine(item, productId, selectedSize)
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
