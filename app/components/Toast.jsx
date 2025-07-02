"use client";

import { useEffect } from "react";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  const getStyles = () => {
    switch (type) {
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "error":
        return <XCircle className="w-5 h-5 mr-2" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 mr-2" />;
      default:
        return <CheckCircle className="w-5 h-5 mr-2" />;
    }
  };

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`relative px-6 py-3 rounded-lg shadow-lg text-white font-medium flex items-center justify-between min-w-[300px] ${getStyles()}`}
      >
        <div className="flex items-center">
          {getIcon()}
          <span>{message}</span>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-white cursor-pointer hover:text-gray-200 font-bold text-xl leading-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
