"use client";

import { config } from "@/libs/utils/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCart } from "../core/Cart/CartContext";
import ProductCard from "./ProductCard";

export default function ViewAll({ webapp, setShowLogin }) {
  const {
    cartItems,
    addToCart,
    incrementQuantity,
    decreaseQuantity,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const backendURL = config.backend_url;

  const openModal = (item) => {
    const inCart = cartItems.find((i) => i.id === item.id);
    setSelectedItem(item);
    setQuantity(inCart ? inCart.quantity : 1);
    setShowModal(true);
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      addToCart({ ...selectedItem, quantity });
      setShowModal(false);
      setQuantity(1);
    }
  };
  const fetch_VegProducts = async () => {
    try {
      const res = await axios.get(`${backendURL}/getAllProducts`); // update URL if different
      setProducts(res.data.products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    const savedCategory = localStorage.getItem("category");
    if (savedCategory) {
      const formatted =
        savedCategory.charAt(0).toUpperCase() + savedCategory.slice(1);
      setCategory(formatted);
    }
  }, []);

  useEffect(() => {
    if (category === "Vegetables") {
      fetch_VegProducts();
    }
  }, [category]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  const modalTotal = selectedItem
    ? (parseFloat(selectedItem.price) * quantity).toFixed(2)
    : 0;

  return (
    <>
      <section className="px-2 md:px-10 py-5">
        <h2 className="text-sm font-bold mb-6 text-left">
          Buy Bulk Fresh
          {category === "Vegetables" ? " Vegetables " : "Fruits"}
          Online
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 transition-all">
          {products.map((item) => (
            <ProductCard
              key={item._id}
              item={item}
              onAddToCart={addToCart}
              webapp={webapp}
              setShowLogin={setShowLogin}
              cartItems={cartItems}
              incrementQuantity={incrementQuantity}
              decreaseQuantity={decreaseQuantity}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              onQuickView={undefined}
            />
          ))}
        </div>
      </section>
    </>
  );
}
function setShowModal(arg0: boolean) {
  throw new Error("Function not implemented.");
}
