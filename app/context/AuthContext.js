"use client";
import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";
import { useToast } from "./ToastContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const backendApi = process.env.NEXT_PUBLIC_API_URL;
  const { showToast } = useToast();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const extractAddress = (data) => {
    const address = data.address || {};
    return {
      full: data.display_name,
      city: address.city || address.town || address.village || address.hamlet || "",
      state: address.state || "",
      pincode: address.postcode || "",
      landmark: (address.neighbourhood || "") + (address.suburb || "") + (address.road || "" ) + (address.building || "") || "",
    };
  };

  
const updateAddress = async (address) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.post(`${backendApi}/addAddress`, { token, address });

    if (res.status === 200) {
      showToast("Address saved successfully!", "success");
      return res.data.user.addresses[res.data.user.addresses.length - 1];
    } 
    else {
      showToast(res.data.message || "Failed to save address", "error");
    }
  } catch (err) {
    if(err.status === 400) showToast("Address already exists.", "warning");
    console.error(err);
  }
};

const EditAddress_context = async (index, updatedAddress) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try{
    const res = await axios.patch(`${backendApi}/editAddress`, {
      token,
      index,
      updatedAddress,
    });
    showToast("Address Updated","success");
    return res.data;
  }
  catch(err)
  {
    showToast("failed to update address","red");
    console.log('edit address',err.message,err);
  }
}

const deleteAddress_context = async (index) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const res = await axios.post(`${backendApi}/deleteAddress`, {
      token,
      index,
    });

    if (res.status === 200) {
      showToast("Address deleted successfully", "success");
      return res.data.addresses;
    } else {
      showToast("Failed to delete address", "error");
    }
  } catch (err) {
    if(err.status === 500) logout();
    showToast("Failed to delete address", "error");
    console.error("Delete address error:", err.message);
  }
};


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        updateAddress,
        extractAddress,
        EditAddress_context,
        deleteAddress_context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
