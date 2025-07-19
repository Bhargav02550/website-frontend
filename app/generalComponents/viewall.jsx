"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useCart } from "../cartpro/CartContext";
import ProductCard from "./ProductCard";

export default function ViewAll({webapp , setShowLogin}) {
  const { cartItems, addToCart } = useCart();
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const backendURL = process.env.NEXT_PUBLIC_API_URL;

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

  useEffect(() => {
    const savedCategory = localStorage.getItem('category');
    if (savedCategory) {
      setCategory(savedCategory.charAt(0).toUpperCase() + savedCategory.slice(1));  // Example: fruits -> Fruits
    }
    const fetch_VegProducts = async () => {
      try {
        const res = await axios.get(`${backendURL}/getAllProducts`); // update URL if different
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    if(category === 'Vegetables') fetch_VegProducts();
  });

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
      <section className="px-6 md:px-20 py-10">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          {
            category === 'Vegetables' ? 'All Vegetables' : 'All Fruits'
          }
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all">
          {products.map((item) => (
            <ProductCard key={item._id} item={item} onAddToCart={addToCart} webapp={webapp} setShowLogin={setShowLogin}/>
          ))}
        </div>
      </section>
    </>
  );
}
