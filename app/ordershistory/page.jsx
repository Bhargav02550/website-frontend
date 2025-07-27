'use client';
import React, { useEffect, useState } from 'react';

const HistorySection = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendApi = process.env.NEXT_PUBLIC_API_URL;

  const fetchUserOrders = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      console.warn("Token not found in localStorage");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${backendApi}/userOrders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (res.ok) {
        setOrders(data);
        console.log("oreder :", data)
      } else {
        console.error("Fetch failed:", data.message);
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'text-orange-500';
      case 'delivered':
        return 'text-green-600';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusDot = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'bg-orange-500';
      case 'delivered':
        return 'bg-green-600';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-4">Loading orders...</p>;
  }

  return (
    <div className="w-[461px] h-[720px] bg-white rounded-tl-lg rounded-bl-lg p-6 overflow-y-auto items-center justify-center mx-auto">
      <div className="justify-center items-center mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">History</h2>
      </div>
      {orders.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-base font-medium">No orders yet</p>
          <p className="text-sm">Your past orders will appear here.</p>
        </div>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="border border-gray-200 p-4 mb-4 rounded-md shadow-sm space-y-2 relative">
            {/* Order Status */}
            <div className="absolute right-4 top-4 flex items-center space-x-1">
              <span className={`w-2 h-2 rounded-full ${getStatusDot(order.status)}`} />
              <span className={`text-sm font-medium ${getStatusStyle(order.status)}`}>
                {order.status}
              </span>
            </div>

            {/* Order ID */}
            <p className="text-sm text-gray-500"><strong>Order ID:</strong> {order._id.slice(-10)}</p>

            {/* Total Items & Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Items</p>
                <p className="text-base font-semibold">{order.items.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Quantity</p>
                <p className="text-base font-semibold">
                  {order.items.reduce((total, item) => total + item.quantityKg, 0)} Kg’s
                </p>
              </div>
            </div>

            {/* Amount & Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Total amount</p>
                <p className="text-base font-semibold">₹ {order.totalAmount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ordered On</p>
                <p className="text-base font-semibold">
                  {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},{" "}
                  {new Date(order.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button className="border border-gray-400 text-gray-700 text-sm px-3 py-1 rounded-md flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View Details
              </button>
              <button className="bg-green-600 text-white text-sm px-4 py-1.5 rounded-md flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v6h6M20 20v-6h-6" />
                </svg>
                Re-order
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HistorySection;
