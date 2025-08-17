"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const isInitialMount = useRef(true); // Track first render

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Replace quantity if item exists, otherwise add new item
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i._id === item._id);
      if (existingItem) {
        return prevCart.map((i) =>
          i._id === item._id ? { ...i, quantity: item.quantity || 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: item.quantity || 1 }];
      }
    });
  };

  // Increments quantity of existing item
  const incrementQuantity = (item) => {
    setCart((prevCart) =>
      prevCart.map((i) =>
        i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  // Decrease quantity or remove if it goes below 1
  const decreaseQuantity = (item) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((i) => i._id === item._id);
      if (index !== -1) {
        const updatedCart = [...prevCart];
        const currentItem = updatedCart[index];
        if (currentItem.quantity > 1) {
          updatedCart[index] = {
            ...currentItem,
            quantity: currentItem.quantity - 1,
          };
        } else {
          updatedCart.splice(index, 1);
        }
        return updatedCart;
      }
      return prevCart;
    });
  };

  // Update quantity directly
  const updateQuantity = (item, newQty) => {
    setCart((prevCart) =>
      prevCart.map((i) => (i._id === item._id ? { ...i, quantity: newQty } : i))
    );
  };

  // Remove item completely
  const removeFromCart = (item) => {
    setCart((prevCart) => prevCart.filter((i) => i._id !== item._id));
  };
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cart,
        addToCart,
        incrementQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
