"use client";
import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Banknote,
  Wallet,
  QrCode,
  Loader2,
  X,
  Receipt,
} from "lucide-react";

export default function PaymentOptions() {
  const [selected, setSelected] = useState(null);
  const [details, setDetails] = useState({ upi: "", wallet: "", bank: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const options = [
    {
      id: "upi",
      label: "UPI",
      icon: <QrCode className="w-5 h-5 mr-2" />,
      placeholder: "Enter UPI ID (e.g. name@bank)",
    },
    {
      id: "wallet",
      label: "Wallet",
      icon: <Wallet className="w-5 h-5 mr-2" />,
      placeholder: "Enter Wallet No. (e.g. Paytm, PhonePe)",
    },
    {
      id: "bank",
      label: "Bank Transfer",
      icon: <Banknote className="w-5 h-5 mr-2" />,
      placeholder: "Enter Bank Account No.",
    },
  ];

  const handleSelect = (id) => {
    setSelected(id);
    setShowPopup(false);
    setReceipt(null);
  };

  const generateFakeReceipt = () => {
    const txnId = "TXN" + Math.floor(Math.random() * 10000000);
    const now = new Date().toLocaleString();
    const amount = 599; // static for now
    return {
      id: txnId,
      time: now,
      method: selected.toUpperCase(),
      detail: details[selected],
      amount,
    };
  };

  const handleSubmit = () => {
    if (!selected || !details[selected]) {
      alert("Please select a payment method and enter the details.");
      return;
    }

    setIsLoading(true);
    setShowPopup(false);

    setTimeout(() => {
      setIsLoading(false);
      setReceipt(generateFakeReceipt());
      setShowPopup(true);
    }, 2000);
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="relative max-w-md my-2 mx-auto bg-white p-6 rounded-2xl shadow-xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Payment Options</h2>
      <p className="text-gray-500">Pay via UPI, wallets, or bank transfer</p>

      <div className="grid grid-cols-1 gap-4">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`flex items-center justify-between border px-4 py-3 rounded-xl cursor-pointer transition ${
              selected === option.id
                ? "border-blue-600 bg-blue-50"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center">
              {option.icon}
              <span className="font-medium text-gray-800">{option.label}</span>
            </div>
            {selected === option.id && (
              <CheckCircle className="w-5 h-5 text-blue-600" />
            )}
          </div>
        ))}
      </div>

      {selected && (
        <div className="space-y-2 pt-2">
          <label className="text-sm text-gray-600">
            {options.find((o) => o.id === selected)?.placeholder}
          </label>
          <input
            type="text"
            placeholder={
              options.find((o) => o.id === selected)?.placeholder
            }
            value={details[selected]}
            onChange={(e) =>
              setDetails({ ...details, [selected]: e.target.value })
            }
            className="w-full border px-4 py-2 rounded-xl text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      )}

      <div className="pt-4">
        <button
          disabled={isLoading}
          onClick={handleSubmit}
          className={`w-full flex items-center justify-center gap-2 cursor-pointer ${
            isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white py-2 px-4 rounded-xl text-sm font-semibold shadow`}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4" />
              Processing...
            </>
          ) : (
            "Proceed to Pay"
          )}
        </button>
      </div>

      {/* ✅ Tailwind-only popup with fake receipt */}
      {showPopup && receipt && (
        <div className="absolute top-4 right-4 w-72 bg-white border border-green-400 shadow-xl rounded-xl p-4 z-50 animate-slide-in space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-green-600 font-semibold flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Payment Successful
            </h3>
            <button onClick={() => setShowPopup(false)}>
              <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
            </button>
          </div>
          <div className="text-xs text-gray-600 border-t pt-2 space-y-1">
            <div className="flex justify-between">
              <span>Transaction ID:</span>
              <span className="font-medium">{receipt.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Paid via:</span>
              <span className="font-medium">{receipt.method}</span>
            </div>
            <div className="flex justify-between">
              <span>To:</span>
              <span className="font-medium truncate max-w-[120px] text-right">{receipt.detail}</span>
            </div>
            <div className="flex justify-between">
              <span>Time:</span>
              <span>{receipt.time}</span>
            </div>
            <div className="flex justify-between font-bold text-green-700 border-t pt-2">
              <span>Amount:</span>
              <span>₹{receipt.amount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
