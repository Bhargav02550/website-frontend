"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Pencil } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function CheckoutPage() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    landmark: "",
    state: "",
    pincode: "",
  });

  const [editAddressIndex, setEditAddressIndex] = useState(null);
  const [editAddress, setEditAddress] = useState({});
  const [isSelected, setIsSelected] = useState(false);

  const backendApi = process.env.NEXT_PUBLIC_API_URL;
  const { updateAddress, isAuthenticated, EditAddress_context } = useAuth();
  const { showToast} = useToast();

  useEffect(() => {
    fetchAddresses();
  },);

  const fetchAddresses = async () => {
    try {
      if (isAuthenticated) {
        const token = JSON.parse(localStorage.getItem("token"));
        const res = await axios.post(`${backendApi}/getAddress`, { token });
        setAddresses(res.data?.addresses || []);
      }
    } catch (err) {
      console.error("Failed to fetch addresses", err);
    }
  };

  const handleAddNewAddress = async () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.landmark || !newAddress.pincode) {
      showToast("Please fill in all required fields.", "warning");
      return;
    }

    try {
      const saved = await updateAddress(newAddress);
      if (!saved._id) {
        await fetchAddresses();
      } else {
        setAddresses((prev) => [...prev, saved]);
        setSelectedAddressId(saved._id);
      }

      if (addresses.length >= 3) setShowNewAddressForm(false);

      setNewAddress({
        name: "",
        phone: "",
        email: "",
        city: "",
        landmark: "",
        state: "",
        pincode: "",
      });
    } catch (err) {
      console.error("Failed to save address", err);
    }
  };

  const handleEditAddress = async (index, updatedAddress) => {
    const data = EditAddress_context(index, updatedAddress);
    if (data.addresses) {
      setAddresses(data.addresses);
      setEditAddressIndex(null);
      setEditAddress({});
    }
  };

  const handleProceedToPayment = () => {
    const selectedAddress = addresses.find((a) => a._id === selectedAddressId);
    console.log("Proceeding to payment with address:", selectedAddress);
  };

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <h2 className="text-xl font-semibold mb-4">Select Delivery Address</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {addresses.slice().reverse().map((addr, i) => {
          const originalIndex = addresses.length - 1 - i;
          const isEditing = editAddressIndex === originalIndex;
          
          return (
            <div
              key={addr._id}
              className={`border rounded-xl p-5 shadow-sm bg-white relative overflow-hidden group transition-all duration-300 ${
                selectedAddressId === addr._id
                  ? "ring-2 ring-green-500 border-green-500"
                  : "hover:shadow-md"
              } ${isEditing ? "h-auto" : "max-h-[160px] overflow-hidden"} transition-all duration-300 ease-in-out`}
            >
              <button
                className="absolute top-2.5 right-3 opacity-0 group-hover:opacity-100 text-sm text-blue-600 hover:text-blue-800"
                onClick={() => {
                  setEditAddressIndex(originalIndex);
                  setEditAddress({ ...addr });
                }}
              >
                <Pencil className="w-4 h-4 cursor-pointer text-green-700" />
              </button>

              {selectedAddressId === addr._id && (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
                  Selected
                </span>
              )}

              {isEditing ? (
                <div className="space-y-2">
                  <input type="text" value={editAddress.name} onChange={(e) => setEditAddress({ ...editAddress, name: e.target.value })} placeholder="Name" className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-700" />
                  <input type="text" value={editAddress.contact} onChange={(e) => setEditAddress({ ...editAddress, contact: e.target.value })} placeholder="Phone" className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-700" />
                  <input type="email" value={editAddress.email} onChange={(e) => setEditAddress({ ...editAddress, email: e.target.value })} placeholder="Email" className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-700" />
                  <input type="text" value={editAddress.city} onChange={(e) => setEditAddress({ ...editAddress, city: e.target.value })} placeholder="City" className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-700" />
                  <input type="text" value={editAddress.landmark} onChange={(e) => setEditAddress({ ...editAddress, landmark: e.target.value })} placeholder="Landmark" className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-700" />
                  <input type="text" value={editAddress.state} onChange={(e) => setEditAddress({ ...editAddress, state: e.target.value })} placeholder="State" className="w-full border rounded border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-700" />
                  <input type="text" value={editAddress.pincode} onChange={(e) => setEditAddress({ ...editAddress, pincode: e.target.value })} placeholder="Pincode" className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-700" />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      className="px-3 py-1 bg-gray-200 cursor-pointer hover:bg-gray-300 rounded text-sm"
                      onClick={() => {
                        setEditAddressIndex(null);
                        setEditAddress({});
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-3 py-1 cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded text-sm"
                      onClick={() => {
                        handleEditAddress(originalIndex, editAddress);
                        setEditAddressIndex(null);
                        setEditAddress({});
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div onClick={() => setSelectedAddressId((prevId) => (prevId === addr._id ? null : addr._id)) }
                  className="space-y-1 cursor-pointer"
                >
                  <h3 className="font-semibold text-lg text-gray-800 bg">{addr.name}</h3>
                  <p className="text-sm text-gray-500">{addr.email}</p>
                  <p className="text-sm text-gray-700">{addr.contact}</p>
                  <p className="text-sm text-gray-700">{addr.state}, {addr.pincode}</p>
                  <p className="text-sm text-gray-700">{addr.city}, {addr.landmark}</p>
                </div>
              )}
            </div>
          );
        })}


        {(!showNewAddressForm && addresses.length <= 2) && (
          <div
            onClick={() => setShowNewAddressForm(true)}
            className="cursor-pointer border-2 border-dashed rounded-xl p-5 flex items-center justify-center text-center text-green-600 hover:bg-green-50 hover:border-green-400 max-h-[160px] overflow-hidden transition"
          >
            <div>
              <div className="text-4xl mb-1">＋</div>
              <p className="font-semibold">Add New Address</p>
            </div>
          </div>
        )}

        {showNewAddressForm && (
          <div className="border border-green-200 rounded-xl p-6 bg-white shadow-lg animate-fade-in-up col-span-1 md:col-span-2 lg:col-span-3">
            <h3 className="text-lg font-semibold mb-4 text-green-700">New Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["name", "phone", "email", "city", "landmark", "state", "pincode"].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                  value={newAddress[field]}
                  onChange={(e) => setNewAddress({ ...newAddress, [field]: e.target.value })}
                />
              ))}
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                onClick={() => {
                  setShowNewAddressForm(false);
                  setNewAddress({ name: "", phone: "", email: "", city: "", landmark: "", state: "", pincode: "" });
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 text-sm"
                onClick={() => {
                  handleAddNewAddress();
                  setShowNewAddressForm(false);
                }}
              >
                Save Address
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleProceedToPayment}
          disabled={!selectedAddressId}
          className={`px-6 py-3 rounded-lg font-semibold text-white transition ${
            selectedAddressId ? "bg-green-600 hover:bg-green-700 cursor-pointer" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Proceed to Payment
        </button>
      </div>
    </section>
  );
}
