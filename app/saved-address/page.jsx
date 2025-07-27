"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Pencil, Trash } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function SavedAddress() {
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
  const backendApi = process.env.NEXT_PUBLIC_API_URL;
  const { updateAddress, isAuthenticated, EditAddress_context, logout, deleteAddress_context } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    fetchAddresses();
  },[]);

  const fetchAddresses = async () => {
    try {
      if (isAuthenticated) {
        const token = JSON.parse(localStorage.getItem("token"));
        const res = await axios.post(`${backendApi}/getAddress`, { token });
        setAddresses(res.data?.addresses || []);
      }
    } catch (err) {
      if(err.status === 500) logout();
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
    const data = await EditAddress_context(index, updatedAddress);
    if (data?.addresses) {
      setAddresses(data.addresses);
      setEditAddressIndex(null);
      setEditAddress({});
    }
  };

  const handleDeleteAddress = async (index) => {
    const updated = await deleteAddress_context(index);
    if (updated) {
      setAddresses(updated);
    }
  };

  return (
    <section className="max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6">Saved Addresses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {addresses.slice().reverse().map((addr, i) => {
          const originalIndex = addresses.length - 1 - i;
          const isEditing = editAddressIndex === originalIndex;

          return (
            <div
              key={addr._id}
              className={`relative border rounded-xl p-4 shadow-sm bg-white group transition-all  ${
                selectedAddressId === addr._id ? "ring-2 ring-green-500 border-green-500" : "hover:shadow-md"
              } ${isEditing ? "h-fit" : "h-auto overflow-hidden"}`}
            >

              {/* Edit Icon */}
              <button
                className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                onClick={() => {
                  setEditAddressIndex(originalIndex);
                  setEditAddress({ ...addr });
                }}
              >
                <Pencil className="w-4 h-4 text-green-700 hover:text-green-900" />
              </button>

              {/* Delete Icon */}
              <button
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                onClick={() => handleDeleteAddress(originalIndex)}
              >
                <Trash className="w-4 h-4 text-red-600 hover:text-red-800" />
              </button>

              {/* Selected Badge */}
              {selectedAddressId === addr._id && (
                <span className="absolute top-2 right-8 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Selected
                </span>
              )}

              {/* Editable / Normal View */}
              {isEditing ? (
                <div className="space-y-2 mt-4">
                  {["name", "contact", "email", "city", "landmark", "state", "pincode"].map((field) => (
                    <input
                      key={field}
                      type="text"
                      value={editAddress[field] || ""}
                      onChange={(e) => setEditAddress({ ...editAddress, [field]: e.target.value })}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      className="w-full border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-600"
                    />
                  ))}

                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                      onClick={() => {
                        setEditAddressIndex(null);
                        setEditAddress({});
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
                      onClick={() => handleEditAddress(originalIndex, editAddress)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() =>
                    setSelectedAddressId((prevId) => (prevId === addr._id ? null : addr._id))
                  }
                  className="space-y-1 cursor-pointer mt-6"
                >
                  <h3 className="font-semibold text-lg">{addr.name}</h3>
                  <p className="text-sm text-gray-500">{addr.email}</p>
                  <p className="text-sm text-gray-700">{addr.contact}</p>
                  <p className="text-sm text-gray-700">{addr.city}, {addr.state} {addr.pincode}</p>
                  <p className="text-sm text-gray-700">{addr.landmark}</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Add New Address Button */}
        {(!showNewAddressForm && addresses.length <= 3) && (
          <div
            onClick={() => setShowNewAddressForm(true)}
            className="cursor-pointer border-2 border-dashed rounded-xl p-5 flex items-center justify-center text-center text-green-600 hover:bg-green-50 hover:border-green-400"
          >
            <div>
              <div className="text-4xl mb-1">＋</div>
              <p className="font-semibold">Add New Address</p>
            </div>
          </div>
        )}

        {/* New Address Form */}
        {showNewAddressForm && (
          <div className="border border-green-200 rounded-xl p-4 bg-white shadow-lg col-span-1 md:col-span-2 lg:col-span-3">
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

            <div className="flex justify-end mt-4 space-x-3">
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
                onClick={handleAddNewAddress}
              >
                Save Address
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
