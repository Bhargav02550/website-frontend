"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    line1: "",
    line2: "",
    pincode: "",
  });

  const handleAddNewAddress = () => {
    const newAddr = { ...newAddress, id: Date.now() };
    setAddresses((prev) => [...prev, newAddr]);
    setSelectedAddressId(newAddr.id);
    setShowNewAddressForm(false);
    setNewAddress({
      name: "",
      phone: "",
      email: "",
      city: "",
      line1: "",
      line2: "",
      pincode: "",
    });
  };

  const handleProceedToPayment = () => {
    const selectedAddress = addresses.find((a) => a.id === selectedAddressId);
    console.log("Proceeding to payment with address:", selectedAddress);
    // redirect or handle logic here
  };

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Delivery Address Selection */}
      <h2 className="text-xl font-semibold mb-4">Select Delivery Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            onClick={() => setSelectedAddressId(addr.id)}
            className={`cursor-pointer border rounded-xl p-5 shadow-sm transition-transform transform hover:scale-[1.02] bg-white relative overflow-hidden group ${
              selectedAddressId === addr.id
                ? "ring-2 ring-green-500 border-green-500"
                : "hover:shadow-md"
            }`}
          >
            {selectedAddressId === addr.id && (
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
                Selected
              </span>
            )}
            <div className="space-y-1">
              <h3 className="font-semibold text-lg text-gray-800">
                {addr.name}
              </h3>
              <p className="text-sm text-gray-500">{addr.email}</p>
              <p className="text-sm text-gray-700">{addr.phone}</p>
              <p className="text-sm text-gray-700">
                {addr.line1}, {addr.line2}
              </p>
              <p className="text-sm text-gray-700">
                {addr.city} - {addr.pincode}
              </p>
            </div>
          </div>
        ))}

        {/* Add New Address Card */}
        <div
          onClick={() => setShowNewAddressForm(true)}
          className="cursor-pointer border-2 border-dashed rounded-xl p-5 flex items-center justify-center text-center text-green-600 hover:bg-green-50 hover:border-green-400 transition"
        >
          <div>
            <div className="text-4xl mb-1">＋</div>
            <p className="font-semibold">Add New Address</p>
          </div>
        </div>
      </div>

      {/* New Address Form */}
      {showNewAddressForm && (
        <div className="mb-10 border border-green-200 rounded-xl p-6 bg-white shadow-lg animate-fade-in-up">
          <h3 className="text-lg font-semibold mb-4 text-green-700">
            New Address
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={newAddress.name}
              onChange={(e) =>
                setNewAddress({ ...newAddress, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={newAddress.phone}
              onChange={(e) =>
                setNewAddress({ ...newAddress, phone: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={newAddress.email}
              onChange={(e) =>
                setNewAddress({ ...newAddress, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="City"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress({ ...newAddress, city: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address Line 1"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={newAddress.line1}
              onChange={(e) =>
                setNewAddress({ ...newAddress, line1: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Address Line 2"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={newAddress.line2}
              onChange={(e) =>
                setNewAddress({ ...newAddress, line2: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Pincode"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={newAddress.pincode}
              onChange={(e) =>
                setNewAddress({ ...newAddress, pincode: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end mt-6 space-x-3">
            <button
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
              onClick={() => {
                setShowNewAddressForm(false);
                setNewAddress({
                  name: "",
                  phone: "",
                  email: "",
                  city: "",
                  line1: "",
                  line2: "",
                  pincode: "",
                });
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 text-sm"
              onClick={handleAddNewAddress}
            >
              Save Address
            </button>
          </div>
        </div>
      )}

      {/* Proceed Button */}
      <div className="flex justify-end">
        <button
          onClick={handleProceedToPayment}
          disabled={!selectedAddressId}
          className={`px-6 py-3 rounded-lg font-semibold transition text-white ${
            selectedAddressId
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Proceed to Payment
        </button>
      </div>
    </section>
  );
}
