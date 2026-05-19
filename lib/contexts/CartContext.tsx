"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import { toast } from "sonner";
import { axiosFetch } from "../axios";
import { currentUser } from "../CheckUser";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string[];
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => Promise<void>;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  confirmOrder: (userId: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = async (item: Omit<CartItem, "quantity">) => {
    try {
      const user = currentUser();

      if (!user?.id) {
        toast.error("User not logged in");
        return;
      }

      const existingItem = cartItems.find((c) => c.id === item.id);

      const quantity = existingItem ? existingItem.quantity + 1 : 1;

      await axiosFetch.post("cart", {
        userId: Number(user.id),
        productId: Number(item.id),
        quantity: quantity,
      });

      setCartItems((prev) => {
        if (existingItem) {
          return prev.map((cartItem) =>
            cartItem.id === item.id ? { ...cartItem, quantity } : cartItem,
          );
        }

        return [
          ...prev,
          {
            ...item,
            quantity: 1,
          },
        ];
      });

      toast.success("Added to cart");
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error("Failed to add to cart");
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const confirmOrder = async () => {
    try {
      const user = currentUser();

      if (!user?.id) {
        toast.error("User not logged in");
        return;
      }

      await axiosFetch.post("orders", {
        userId: Number(user.id),
      });

      toast.success("Order confirmed!");
      clearCart();
    } catch (error) {
      console.error("Order confirmation failed:", error);
      toast.error("Order failed");
    }
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        confirmOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};
