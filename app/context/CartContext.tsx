"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  title?: string;
  description?: string;
  brand?: string;
  dimensions?: string;
  weight?: string;
  manufacture?: string;
  price: number;
  stock: number;
  addInfo?: string;
  images?: {
    id: string;
    url: string;
  }[];
  createdAt: string;
  categoryId?: string;
}

interface CartItem {
  id: string;
  quantity: number;
  productId: string;
  cartId: string;
  product: Product;
}

interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  incrementQuantity: (productId: string) => Promise<void>;
  decrementQuantity: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCart = async () => {
    try {
      const res = await axios.get("/api/cart");
      setCartItems(res.data.cart?.cartItems || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (productId: string, quantity: number = 1) => {
    try {
      await axios.post("/api/cart", { productId, quantity });
      await fetchCart();
      toast.success("Item added to cart! 🛒");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart.");
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      await axios.delete("/api/cart", { data: { productId } });
      await fetchCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const incrementQuantity = async (productId: string) => {
    const item = cartItems.find((item) => item.productId === productId);
    if (!item) return;

    try {
      await axios.patch("/api/cart", {
        productId,
        quantity: item.quantity + 1,
      });
      await fetchCart();
    } catch (error) {
      console.error("Failed to increment quantity:", error);
    }
  };

  const decrementQuantity = async (productId: string) => {
    const item = cartItems.find((item) => item.productId === productId);
    if (!item || item.quantity <= 1) return;

    try {
      await axios.patch("/api/cart", {
        productId,
        quantity: item.quantity - 1,
      });
      await fetchCart();
    } catch (error) {
      console.error("Failed to decrement quantity:", error);
    }
  };
  const clearCart = async () => {
    try {
      await axios.delete("/api/cart/clear"); // 🔧 Ensure your backend route handles this
      await fetchCart();
      toast.success("Cart cleared!");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart.");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        fetchCart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
