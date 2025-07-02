"use client";

import { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: "", type: "success" });

  const showToast = useCallback((message, type) => {
    setToast({ message, type });
  }, []);

  const hideToast = () => {
    setToast({ message: "", type: "success" });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast message={toast.message} type={toast.type} onClose={hideToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
