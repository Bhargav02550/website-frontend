"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "../cartpro/CartContext";
import ProductCard from "../generalComponents/ProductCard";
import { useAuth } from "../context/AuthContext";
import LoginCard from "../components/LoginCard";

export default function SearchProPage() {
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]); // ✅ Declare products first
  const [filteredResults, setFilteredResults] = useState([]); // ✅ Init as empty array
  const { cartItems, addToCart } = useCart();
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const backendURL = process.env.NEXT_PUBLIC_API_URL;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${backendURL}/getAllProducts`);
      if (!Array.isArray(res.data)) {
        throw new Error("Expected an array of products");
      }

      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err.message);
    }
  };

  // Fetch products once
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter when products or search query changes
  useEffect(() => {
    const searchQuery = searchParams.get("query")?.toLowerCase() || "";
    setQuery(searchQuery);

    const results = searchQuery
      ? products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery)
        )
      : products;

    setFilteredResults(results);
  }, [searchParams, products]);

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
    <>
      <section className="px-6 md:px-20 py-10">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
          {query ? `Search results for: "${query}"` : "All Vegetables"}
        </h2>

        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filteredResults.map((item) => (
              <ProductCard key={item._id} item={item} onAddToCart={addToCart} webapp={true} setShowLogin={setShowLogin}/>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </section>

      {showLogin && (
        <LoginCard isOpen={showLogin} onClose={() => setShowLogin(false)} />
      )}
    </>
  );
}

export const dynamic = "force-dynamic";
