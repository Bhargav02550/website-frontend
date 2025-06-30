"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Loader2, ArrowLeft } from "lucide-react";

export default function LoginCard({ isOpen, onClose }) {
  const modalRef = useRef();
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [isNewUser, setIsNewUser] = useState(false);
  const [profile, setProfile] = useState({ firstName: "", lastName: "", email: "" });

  const backendApi = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  useEffect(() => {
    if (!otpSent || countdown === 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, otpSent]);

  const handleSendOtp = async () => {
    if (mobile.length !== 10) return setMessage("Enter a valid mobile number");
    try {
      setLoading(true);
      setMessage("");
      await axios.post(`${backendApi}/sendOTP`, { contact: mobile });
      setOtpSent(true);
      setMessage("OTP sent to your number.");
      setCountdown(300);
    } catch {
      setMessage("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const formatCountdown = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 4) return;
    try {
      setLoading(true);
      const res = await axios.post(`${backendApi}/verifyOTP`, {
        contact: mobile,
        otp: otpValue,
      });
      localStorage.setItem('token', JSON.stringify(res.data.token));
      setMessage("Login successful");

      if (res.data.isNew) {
        setIsNewUser(true); // Show profile form
      } else {
        closeModalWithReset();
      }
    } catch {
      setMessage("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProfile = async () => {
    const { firstName, lastName, email } = profile;
    if (!firstName || !lastName || !email) {
      return setMessage("Please fill all fields");
    }
    try {
      setLoading(true);
      await axios.post(`${backendApi}/completeProfile`, {
        token: JSON.parse(localStorage.getItem("token")),
        firstName,
        lastName,
        email,
      });
      setMessage("Profile completed");
      closeModalWithReset();
    } catch {
      setMessage("Failed to submit profile");
    } finally {
      setLoading(false);
    }
  };

  const closeModalWithReset = () => {
    setOtpSent(false);
    setIsNewUser(false);
    setOtp(["", "", "", ""]);
    setMobile("");
    setMessage("");
    setProfile({ firstName: "", lastName: "", email: "" });
    setCountdown(0);
    setTimeout(() => onClose(), 1000);
  };

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) document.getElementById(`otp-${index + 1}`)?.focus();
    if (!value && index > 0) document.getElementById(`otp-${index - 1}`)?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 transition-opacity duration-300">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl relative mx-4 animate-fade-in"
      >
        <button
          onClick={() => {
              if (isNewUser) {
                setIsNewUser(false);
                setMessage("");
              } 
              else if (otpSent) {
                setOtpSent(false);
                setOtp(["", "", "", ""]);
                setMessage("");
                setCountdown(0);
              } 
              else {
                onClose();
              }
            }
          }
          className="absolute top-4 left-4 text-gray-500 hover:text-black text-xl"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <p className="text-center text-gray-800 font-semibold text-lg mb-4">
          {!otpSent ? "Log in or Sign up" : isNewUser ? "Complete Profile" : "Enter OTP"}
        </p>

        {!otpSent ? (
          <div className="animate-fade-in">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mb-4">
              <span className="px-3 text-gray-700 font-medium">+91</span>
              <input
                type="tel"
                placeholder="Enter mobile number"
                className="flex-1 px-3 py-2 outline-none text-gray-800"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-blue-600 text-white cursor-pointer font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4" /> Sending...
                </span>
              ) : (
                "Continue"
              )}
            </button>
          </div>
        ) : isNewUser ? (
          <div className="animate-fade-in">
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-3 py-2 mb-3 border border-none border-gray-300 rounded"
              value={profile.firstName}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-3 py-2 mb-3 border border-none border-gray-300 rounded"
              value={profile.lastName}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 mb-4 border border-none border-gray-300 rounded"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
            <button
              onClick={handleSubmitProfile}
              className="w-full bg-green-600 text-white cursor-pointer py-2 rounded hover:bg-green-700 transition"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4" /> Submitting...
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <p className="text-sm text-gray-600 mb-2 text-center">
              OTP sent to <strong>+91-{mobile}</strong>
            </p>

            <div className="flex justify-center gap-3 mb-6">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-12 h-14 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={otp.join("").length !== 4 || loading}
              className={`w-full ${
                otp.join("").length === 4
                  ? "bg-green-600 cursor-pointer hover:bg-green-700"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white font-semibold py-2 rounded-lg text-sm transition`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4" /> Verifying...
                </span>
              ) : (
                "Verify OTP"
              )}
            </button>

            <p className="text-xs text-center text-gray-500 mt-4">
              Didn’t receive OTP?{" "}
              {countdown > 0 ? (
                <span className="text-red-500">
                  Resend in {formatCountdown(countdown)}
                </span>
              ) : (
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={handleSendOtp}
                >
                  Resend
                </span>
              )}
            </p>
          </div>
        )}

        {message && (
          <p className="text-xs text-center mt-4 text-red-500">{message}</p>
        )}

        <p className="text-xs text-center text-gray-500 mt-4">
          By continuing, you agree to our{" "}
          <a href="#" className="underline">
            Terms of service
          </a>{" "}
          &{" "}
          <a href="#" className="underline">
            Privacy policy
          </a>
        </p>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fade-in 0.3s ease-out both;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
