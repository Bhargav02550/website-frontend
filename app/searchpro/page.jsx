"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import products from "../data/products";
import { useCart } from "../cartpro/CartContext";
import ProductCard from "../components/ProductCard";

export default function SearchProPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState(products);
  const { cartItems, addToCart } = useCart();

  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  // const [isLogin , setIsLogin] = useState(false);

  useEffect(() => {
    const searchQuery = searchParams.get("query")?.toLowerCase() || "";
    setQuery(searchQuery);

    const results = searchQuery
      ? products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery)
        )
      : products;

    setFilteredResults(results);
  }, [searchParams]);

  // useEffect(() => {
  //     if (typeof window !== "undefined") {
  //       const token = localStorage.getItem("token");
  //       setIsLogin(!!token);
  //     }
  //   }, []);

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
    <section className="px-6 md:px-20 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
        {query ? `Search results for: "${query}"` : "All Vegetables"}
      </h2>

      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredResults.map((item) => (
                  <ProductCard key={item.id} item={item} onAddToCart={addToCart} />
                ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}

     
    </section>
  );
}

export const dynamic = "force-dynamic";
