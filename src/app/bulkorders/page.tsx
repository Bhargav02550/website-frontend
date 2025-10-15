"use client";
import React, { useState } from "react";
import { Loader2, CheckCircle, Package } from "lucide-react";

export default function BulkOrderForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    quantity: "",
    date: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowPopup(false);

    // Simulate backend call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4000);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 bg-white shadow-xl rounded-2xl space-y-6 relative">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <Package className="w-6 h-6 text-indigo-600" />
        Place Bulk Order
      </h2>
      <p className="text-gray-500 text-sm">
        For events, businesses, or large quantity orders — submit your request
        and our team will reach out to you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone", name: "phone", type: "tel" },
          { label: "Company / Organization", name: "company", type: "text" },
          { label: "Quantity", name: "quantity", type: "number" },
          { label: "Preferred Delivery Date", name: "date", type: "date" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-600">
              {field.label}
            </label>
            <input
              required
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Additional Notes
          </label>
          <textarea
            name="notes"
            rows={3}
            value={form.notes}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. Need items packed individually, delivery only on weekends, etc."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center gap-2 ${
            isSubmitting ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
          } text-white font-semibold py-2 px-4 rounded-lg transition`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Bulk Order Request"
          )}
        </button>
      </form>

      {/* ✅ Success popup */}
      {showPopup && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-opacity duration-300 z-50">
          <CheckCircle className="w-4 h-4" />
          Bulk order submitted successfully!
        </div>
      )}
    </div>
  );
}
