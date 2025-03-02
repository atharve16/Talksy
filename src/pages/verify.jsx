import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { LoadingSpinner } from "../component/Loading";
import { ChatData } from "../context/ChatContext.jsx";
import { BsShieldLock } from "react-icons/bs";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { fetchChats } = ChatData();
  const { verifyUser, btnLoading } = UserData();
  const navigate = useNavigate();

  const SubmitHandler = (e) => {
    e.preventDefault();
    verifyUser(Number(otp), navigate, fetchChats);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-50 p-4">
      <div className='w-full md:w-[500px] transform transition-all duration-500 hover:scale-[1.02]'>
        <div className='text-center mb-6'>
          <h1 className="text-3xl font-bold mb-2 text-slate-800 flex items-center justify-center">
            <img
              src="/favicon.png"
              alt="Talksy Logo"
              className="h-12 w-auto mr-3"
            />
            <span className="talksy-title bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              Talksy
            </span>
          </h1>
          <p className="text-md text-slate-600 italic">Almost there!</p>
        </div>

        <form
          className="rounded-xl bg-white p-8 shadow-lg w-full border border-slate-100 bg-opacity-90 backdrop-blur-sm"
          onSubmit={SubmitHandler}
        >
          <h2 className="text-2xl mb-6 font-bold text-slate-800 flex items-center">
            <BsShieldLock className="text-blue-500 mr-2" />
            Verify Your Account
          </h2>
          <div className="mb-6">
            <label className="text-slate-700 block mb-2 font-medium" htmlFor="otp">
              Verification Code
            </label>
            <input
              className="border p-3 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-slate-50 border-slate-200 letter-spacing-wide tracking-wider text-center text-lg"
              required
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              placeholder="Enter OTP"
              type="number"
              id="otp"
              maxLength={6}
            />
            <p className="mt-2 text-sm text-slate-500">
              Enter the verification code sent to your email
            </p>
          </div>
          <button 
            className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300 w-full font-medium shadow-md hover:shadow-lg flex items-center justify-center"
            disabled={btnLoading}
          >
            {btnLoading ? <LoadingSpinner /> : "Verify & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verify;