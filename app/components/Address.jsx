"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

export default function Address({ onLocationUpdate, isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const backendApi = process.env.NEXT_PUBLIC_API_URL;

  const updateAddress = async (address) => {
    let token = localStorage.getItem("token");
    if(token)
    {
      token = JSON.parse(token);
      try{
        const res = await axios.patch(`${backendApi}/addAddress`, {token , address });
        console.log('update Address', res.message);
      }
      catch(err){
        console.log('update Addess error: ', err.message);
      }
    }
  }
  useEffect(() => {
    if (query.length < 3) return;

    const fetchSuggestions = async () => {
      try {
        const res = await axios.get("https://nominatim.openstreetmap.org/search", {
          params: {
            q: query,
            format: "json",
            addressdetails: 1,
            countrycodes: "in",
            limit: 5,
          },
        });

        const landmarkTypes = ["attraction", "monument", "museum", "historic", "building"];
        const sorted = [...res.data].sort((a, b) => {
          const isLandmarkA = landmarkTypes.includes(a.type);
          const isLandmarkB = landmarkTypes.includes(b.type);
          return isLandmarkB - isLandmarkA;
        });

        setSuggestions(sorted);
      } catch (err) {
        console.error("Autocomplete failed", err);
      }
    };

    fetchSuggestions();
  }, [query]);

  const extractAddress = (data) => {
    const address = data.address || {};
    return {
      full: data.display_name,
      city: address.city || address.town || address.village || address.hamlet || "",
      state: address.state || "",
    };
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;

        try {
          const res = await axios.get("https://nominatim.openstreetmap.org/reverse", {
            params: {
              lat: latitude,
              lon: longitude,
              format: "json",
              addressdetails: 1,
              countrycodes: "in",
            },
          });

          const parsed = extractAddress(res.data);
          localStorage.setItem("user-location", JSON.stringify(parsed));
          if(res.data) await updateAddress(res.data?.full);
          onLocationUpdate?.(parsed);
          onClose(); // close popup
        } catch (err) {
          console.error("Reverse geocoding failed:", err);
        }
      },
      () => alert("Failed to detect location")
    );
  };

  const handleSelectSuggestion = async (place) => {
    const parsed = extractAddress(place);
    localStorage.setItem("user-location", JSON.stringify(parsed));
    onLocationUpdate?.(parsed);
    await updateAddress(parsed?.full)
    onClose(); // close popup
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg overflow-hidden max-h-[90vh] border-none">
        <div className="px-6 py-5 border-b border-none flex justify-between items-center">
          <h2 className="text-lg font-semibold">Change Location</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5 cursor-pointer" />
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <button
              onClick={detectLocation}
              className="bg-green-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Detect my location
            </button>
            <span className="text-gray-500">OR</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search delivery location"
              className="bg-gray-100 border-none px-3 py-2 rounded text-sm flex-1 min-w-[200px] focus:ring-2 focus:ring-green-500"
            />
          </div>

          {suggestions.length > 0 && (
            <ul className="border-t border-none divide-y divide-gray-100 max-h-[240px] overflow-y-auto">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleSelectSuggestion(s)}
                >
                  <div className="text-gray-800 font-medium">{s.display_name}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
