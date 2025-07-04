import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { LoadingSpinner } from "../component/Loading";
import { ChatData } from "../context/chatContext.jsx";
import {
  BsShieldLock,
  BsCheckCircle,
  BsArrowCounterclockwise,
} from "react-icons/bs";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown
  const { fetchChats } = ChatData();
  const { verifyUser, btnLoading } = UserData();
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    verifyUser(Number(otp), navigate, fetchChats);
  };

  const handleResendCode = () => {
    // Implement resend code functionality here
    setTimeLeft(300); // Reset timer
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-6 fade-in">
      <div className="w-full md:w-[520px] mb-8 mt-8">
        {/* Brand Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white p-3 rounded-full shadow-xl border border-slate-200 hover:scale-105 transition-transform">
              <img
                src="/favicon.png"
                alt="Talksy Logo"
                className="h-12 w-auto"
              />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-800 mb-2 tracking-wide">
            <span className="text-blue-600">Talksy</span>
          </h1>
          <p className="text-base text-slate-600 italic">Almost there!</p>
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm mt-2">
            <BsCheckCircle />
            <span>Email Sent</span>
          </div>
        </div>

        {/* Verification Form Box */}
        <div className="glass-box rounded-2xl p-8 shadow-xl w-full mb-6">
          <h2 className="text-2xl mb-6 font-bold text-slate-800 flex items-center">
            <BsShieldLock className="text-blue-500 mr-3 text-xl" />
            Verify Your Account
          </h2>

          <form onSubmit={SubmitHandler}>
            <div className="mb-8">
              <label
                className="text-slate-700 block mb-3 font-medium"
                htmlFor="otp"
              >
                Verification Code
              </label>
              <input
                className="border p-4 w-full rounded-xl bg-slate-50 text-center text-xl tracking-wider outline-none focus:ring-2 focus:ring-blue-400 border-slate-200 transition-all duration-300 shadow-sm"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                placeholder="•••••"
                type="number"
                id="otp"
                maxLength={6}
              />
              <div className="flex justify-between items-center mt-4 mb-2">
                <p className="text-sm text-slate-500">
                  Enter the verification code sent to your email
                </p>
                <p
                  className={`text-sm font-semibold ${
                    timeLeft < 60 ? "text-red-500" : "text-blue-600"
                  }`}
                >
                  {formatTime(timeLeft)}
                </p>
              </div>
            </div>

            <button
              className="gradient-btn text-white py-4 px-6 rounded-xl w-full font-semibold shadow-lg transition-all"
              disabled={btnLoading}
            >
              {btnLoading ? <LoadingSpinner /> : "Verify & Continue"}
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={handleResendCode}
                className="text-blue-600 hover:text-blue-800 inline-flex items-center text-sm font-medium transition-colors"
                disabled={timeLeft > 0}
              >
                <BsArrowCounterclockwise className="mr-1" />
                {timeLeft > 0
                  ? `Resend Code in ${formatTime(timeLeft)}`
                  : "Resend Code"}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-400 text-sm">
          <p>
            © 2025 <span className="font-semibold text-blue-500">Talksy</span>.
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verify;
