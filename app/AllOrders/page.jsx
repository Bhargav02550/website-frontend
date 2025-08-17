"use client";

import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

export default function AllOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL + "/getAllOrders";

  const [generatingPDF, setGeneratingPDF] = useState(null);

  const generateOrderPDF = async (order) => {
    setGeneratingPDF(order._id);

    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let y = 20;

    // Utility: Convert image URL to base64
    const toBase64 = (url) =>
      fetch(url)
        .then((res) => res.blob())
        .then(
          (blob) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            })
        );

    try {
      // Header
      doc.setFontSize(18);
      doc.text(`Order #${order._id.slice(-8)}`, margin, y);
      y += 10;
      doc.setFontSize(12);
      doc.text(`User ID: ${order.userId || "N/A"}`, margin, y);
      y += 7;
      doc.text(
        `Scheduled: ${order.scheduledDate?.slice(0, 10) || "-"}`,
        margin,
        y
      );
      y += 7;
      doc.text(
        `Created: ${new Date(order.createdAt).toLocaleDateString()}`,
        margin,
        y
      );
      y += 10;

      doc.setFontSize(14);
      doc.text("Order Items", margin, y);
      y += 8;

      for (let i = 0; i < order.items.length; i++) {
        const item = order.items[i];
        if (!item) continue;

        if (y > 240) {
          doc.addPage();
          y = margin;
        }

        // Image (convert first)
        let imageData;
        try {
          imageData = await toBase64(item.image || "/placeholder.png");
        } catch {
          imageData = null;
        }

        // Card container
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(margin, y, pageWidth - margin * 2, 40, 3, 3, "F");

        // Image box
        if (imageData) {
          doc.addImage(imageData, "PNG", margin + 3, y + 3, 30, 30);
        } else {
          doc.setDrawColor(200);
          doc.rect(margin + 3, y + 3, 30, 30);
        }

        // Product details
        doc.setFontSize(12);
        doc.setTextColor(40, 40, 40);
        doc.text(item.name || "Unknown Product", margin + 38, y + 12);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Quantity: ${item.quantityKg || 0} kg`, margin + 38, y + 20);

        y += 45;
      }

      // Footer
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated on ${new Date().toLocaleDateString()}`, margin, 290);

      // Save the file
      doc.save(`order-${order._id.slice(-8)}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setGeneratingPDF(null);
    }
  };

  useEffect(() => {
    // Uncomment and use your actual API
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched orders:", data);
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading)
    return (
      <div className="p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <p className="mt-2 text-gray-500">Loading orders...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-center">
        <div className="text-red-500 text-lg mb-2">
          ⚠️ Failed to load orders
        </div>
        <p className="text-gray-500">Please try again later</p>
      </div>
    );

  if (!orders.length)
    return (
      <div className="p-8 text-center">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <p className="text-gray-500 text-lg">No orders found</p>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
          All Orders
        </h1>
        <p className="text-gray-600 mb-8">{orders.length} orders found</p>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {/* Order Header */}
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Order #{order._id.slice(-8)}
                      </h3>
                      <p className="text-sm text-gray-500">
                        User: {order.userId || "N/A"}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">Items:</span>
                        <span className="font-medium">
                          {order.items?.length || 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">Scheduled:</span>
                        <span className="font-medium">
                          {order.scheduledDate?.slice(0, 10) || "-"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500">Created:</span>
                        <span className="font-medium">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => generateOrderPDF(order)}
                    disabled={generatingPDF === order._id}
                    className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {generatingPDF === order._id ? (
                      <>
                        <span className="text-sm font-medium">
                          Generating...
                        </span>
                        <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                      </>
                    ) : (
                      <>
                        <span className="text-sm font-medium">
                          Download PDF
                        </span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => toggleOrderExpansion(order._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors self-start sm:self-center"
                  >
                    <span className="text-sm font-medium">
                      {expandedOrder === order._id
                        ? "Hide Items"
                        : "View Items"}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        expandedOrder === order._id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Order Items - Expandable */}
              {expandedOrder === order._id && (
                <div className="p-4 sm:p-6 bg-gray-50">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Order Items
                  </h4>

                  {order.items && order.items.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name || "Product"}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  e.target.src = "/api/placeholder/60/60";
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-gray-900 truncate">
                                {item.name || "Unknown Item"}
                              </h5>
                              <p className="text-sm text-gray-500">
                                Quantity: {item.quantityKg || 0} kg
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <div className="text-4xl mb-2">📦</div>
                      <p>No items in this order</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
