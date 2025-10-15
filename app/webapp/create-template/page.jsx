"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { IconCirclePlus } from "@tabler/icons-react";

const backendURL = process.env.NEXT_PUBLIC_API_URL;

export default function CreateTemplate() {
  const [products, setProducts] = useState([]);
  const [templateItems, setTemplateItems] = useState([]);

  // --- Modal states ---
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${backendURL}/getAllProducts`);
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const handleAddClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // 🔹 Confirm modal action
  const confirmAddToTemplate = () => {
    if (!selectedProduct) return;

    const productWithDetails = {
      ...selectedProduct,
      weeklyPlan: quantity,
    };

    setTemplateItems((prev) => {
      if (prev.some((item) => item._id === selectedProduct._id)) return prev;
      return [...prev, productWithDetails];
    });

    setProducts((prev) =>
      prev.filter((item) => item._id !== selectedProduct._id)
    );

    setShowModal(false);
    setSelectedProduct(null);
    setQuantity(1);
  };

  const removeFromTemplate = (product) => {
    setProducts((prev) => [...prev, product]);
    setTemplateItems((prev) => prev.filter((item) => item._id !== product._id));
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl relative overflow-hidden">
            {/* Close Button */}
            <button
              className="absolute top-4 right-5 text-gray-400 hover:text-gray-600 text-2xl font-bold transition-all"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            {/* Header Section */}
            <div className="px-8 pt-8 pb-4 border-b border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Set Weekly Quantities
              </h2>
              <p className="text-gray-500 text-sm">
                Customize how much of this product is needed on each day of the
                week.
              </p>
            </div>

            {/* Product Info */}
            <div className="flex items-center gap-4 px-8 py-4 bg-gray-50 border-b border-gray-100">
              <img
                src={selectedProduct?.image?.url || "/placeholder.png"}
                alt={selectedProduct?.name || "Product"}
                className="w-16 h-16 rounded-lg object-contain border border-gray-200"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {selectedProduct?.name || "Selected Product"}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedProduct?.category || "Category not specified"}
                </p>
              </div>
            </div>

            {/* Day Grid */}
            <div className="px-8 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div
                  key={day}
                  className="flex flex-col justify-between p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-700">{day}</span>
                    {quantity?.[day]?.quantity ? (
                      <span className="text-xs text-green-600 font-medium">
                        ✓ Set
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Not set</span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      placeholder="Qty"
                      className="border border-gray-300 rounded-lg px-2 py-1.5 w-full text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                      onChange={(e) => {
                        setQuantity((prev) => ({
                          ...prev,
                          [day]: {
                            ...(prev?.[day] || {}),
                            quantity: e.target.value,
                          },
                        }));
                      }}
                      value={quantity?.[day]?.quantity || ""}
                    />

                    <select
                      className="border border-gray-300 rounded-lg px-2 py-1.5 text-gray-700 text-sm w-20 focus:ring-2 focus:ring-green-400 focus:outline-none"
                      onChange={(e) => {
                        setQuantity((prev) => ({
                          ...prev,
                          [day]: {
                            ...(prev?.[day] || {}),
                            unit: e.target.value,
                          },
                        }));
                      }}
                      value={quantity?.[day]?.unit || "kg"}
                    >
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="pcs">pcs</option>
                      <option value="L">L</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 px-8 py-5 bg-gray-50 border-t border-gray-200">
              <button
                className="px-5 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02]"
                onClick={() => {
                  confirmAddToTemplate();
                  setShowModal(false);
                }}
              >
                Add to Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔸 MAIN CONTENT */}
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center mb-6 justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Create Template
            <p className="text-sm text-gray-600 font-normal">
              Select products and assign quantity/date
            </p>
          </h1>

          <button
            type="button"
            className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 shadow-sm"
          >
            Save Template
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: Available Products */}
          <div className="flex-1 rounded-xl p-5 border border-gray-200 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-l-4 border-green-600 pl-2">
              Available Products
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[65vh] overflow-y-auto">
              {products.length === 0 ? (
                <p className="text-gray-500 col-span-full text-center">
                  No products available.
                </p>
              ) : (
                products.map((product) => (
                  <div
                    key={product._id}
                    className="group bg-white rounded-2xl p-4 flex flex-col items-center text-center border border-gray-200 hover:shadow-md transition-all relative"
                  >
                    <div className="relative mb-3 p-2 rounded-xl bg-gray-50">
                      <img
                        src={product.image?.url}
                        alt={product.name}
                        className="w-20 h-20 object-contain"
                      />
                      <div
                        onClick={() => handleAddClick(product)}
                        className="absolute -top-2 -right-2 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 cursor-pointer shadow-md"
                      >
                        <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center shadow-md opacity-100 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 hover:scale-125 hover:bg-green-600">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      {product.name}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT: Template Items */}
          {/* ---------- Template Area (Improved) ---------- */}
          <div className="flex-1 rounded-xl p-5 border border-gray-200 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 border-l-4 border-green-600 pl-2">
              Template Area
            </h2>

            <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1 sm:pr-2">
              {templateItems.length === 0 ? (
                <p className="text-gray-500 text-center">No items added yet.</p>
              ) : (
                templateItems.map((item) => {
                  const plan = item.weeklyPlan || {};
                  const days = [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun",
                  ];

                  let totalQty = 0;
                  let primaryUnit = null;
                  for (const d of days) {
                    const q = Number(plan[d]?.quantity || 0);
                    const u = plan[d]?.unit || null;
                    if (q) {
                      totalQty += q;
                      if (!primaryUnit) primaryUnit = u;
                    }
                  }

                  return (
                    <div
                      key={item._id}
                      className="bg-white rounded-2xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200"
                    >
                      {/* Top Row: Product Info */}
                      <div className="flex flex-row items-start justify-between sm:items-center gap-4 mb-3">
                        {/* Product Image */}
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                            <img
                              src={item.image?.url}
                              alt={item.name}
                              className="max-w-[60px] max-h-[60px] object-contain"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900 truncate">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {item.sku || item.category || "Product details"}
                            </div>
                          </div>
                        </div>

                        {/* Product Text Info */}
                        <div className="flex flex-col flex-wrap justify-between items-start gap-3">
                          <div className="text-sm font-semibold text-gray-800">
                            {totalQty > 0
                              ? `${totalQty} ${primaryUnit || ""}`
                              : "No qty"}
                            <div className="text-xs text-gray-500">
                              Weekly total
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedProduct(item);
                                setQuantity(item.weeklyPlan || {});
                                setShowModal(true);
                              }}
                              className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => removeFromTemplate(item)}
                              className="px-3 py-1.5 text-xs rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Middle: Weekly Plan Grid */}
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 w-full mt-2">
                        {days.map((d) => {
                          const q = plan[d]?.quantity || "";
                          const u = plan[d]?.unit || "";
                          const isSet = !!q && q !== "0";

                          return (
                            <div
                              key={d}
                              className={`flex flex-col justify-center items-center rounded-lg border text-xs py-2 ${
                                isSet
                                  ? "bg-green-50 border-green-200 text-green-800"
                                  : "bg-gray-50 border-gray-100 text-gray-400"
                              }`}
                            >
                              <span className="font-medium text-[11px]">
                                {d}
                              </span>
                              <span className="mt-0.5 text-[11px] font-semibold">
                                {isSet ? `${q}${u ? ` ${u}` : ""}` : "—"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
