import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IMedicine } from "@/features/medicine/medicine.type";
import { toast } from "sonner";

export interface CartItem extends IMedicine {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (medicine: IMedicine, quantity?: number) => void;
  removeItem: (medicineId: string) => void;
  updateQuantity: (medicineId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (medicine, quantity = 1) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.id === medicine.id,
        );

        if (existingItem) {
          if (existingItem.quantity + quantity > medicine.stockQuantity) {
            toast.error("Cannot add more than available stock");
            return;
          }
          set({
            items: currentItems.map((item) =>
              item.id === medicine.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          });
          toast.success("Cart updated");
        } else {
          if (quantity > medicine.stockQuantity) {
            toast.error("Cannot add more than available stock");
            return;
          }
          set({ items: [...currentItems, { ...medicine, quantity }] });
          toast.success("Added to cart");
        }
      },
      removeItem: (medicineId) => {
        set({ items: get().items.filter((item) => item.id !== medicineId) });
        toast.success("Removed from cart");
      },
      updateQuantity: (medicineId, quantity) => {
        const item = get().items.find((i) => i.id === medicineId);
        if (item && quantity > item.stockQuantity) {
          toast.error("Cannot exceed available stock");
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === medicineId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      totalItems: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),
      totalPrice: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: "pharmetix-cart",
    },
  ),
);
