"use client";
import React, { useState } from "react";
import { ClipboardEdit, CheckCircle, Loader2 } from "lucide-react";

export default function DeliveryInstructions() {
  const [instructions, setInstructions] = useState("");
  const [preferences, setPreferences] = useState({
    door: false,
    call: false,
    ring: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedPopup, setShowSavedPopup] = useState(false);

  const toggle = (key) =>
    setPreferences({ ...preferences, [key]: !preferences[key] });

  const handleSave = async () => {
    setIsSaving(true);
    setShowSavedPopup(false);

    // Simulate API or local save delay
    setTimeout(() => {
      setIsSaving(false);
      setShowSavedPopup(true);

      // Auto-close popup after 4 seconds
      setTimeout(() => {
        setShowSavedPopup(false);
      }, 4000);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-5 relative">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <ClipboardEdit className="w-5 h-5 text-blue-500" />
        Custom Instructions
      </h2>
      <p className="text-sm text-gray-500">
        Provide specific delivery preferences to help us serve you better.
      </p>

      <textarea
        rows={4}
        className="w-full border border-gray-300 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="e.g. Leave package at the security gate if I’m not available."
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
      />

      <div className="space-y-3">
        <label className="block font-medium text-sm text-gray-600">
          Quick Preferences
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { key: "door", label: "Leave at Door" },
            { key: "call", label: "Call on Arrival" },
            { key: "ring", label: "Ring the Bell" },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => toggle(item.key)}
              className={`w-full border px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition ${
                preferences[item.key]
                  ? "bg-blue-100 border-blue-500 text-blue-700"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              }`}
            >
              {preferences[item.key] && (
                <CheckCircle className="w-4 h-4 text-blue-500" />
              )}
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`w-full flex items-center justify-center gap-2 ${
            isSaving ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white py-2 px-4 rounded-xl text-sm font-semibold shadow`}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Instructions"
          )}
        </button>
      </div>

      {/* ✅ Floating Popup for Save Confirmation */}
      {showSavedPopup && (
        <div className="fixed top-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-opacity duration-300 z-50">
          <CheckCircle className="w-4 h-4" />
          Instructions saved successfully!
        </div>
      )}
    </div>
  );
}
