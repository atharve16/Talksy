import React, { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../component/Loading";
import { BsChatDots, BsEnvelope, BsArrowRight } from "react-icons/bs";

const Login = () => {
  const [email, setEmail] = useState("");
  const { loginUser, btnLoading } = UserData();
  const navigate = useNavigate();

  const SubmitHandler = (e) => {
    e.preventDefault();
    loginUser(email, navigate);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4 sm:px-6 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 md:p-10">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-full shadow-md">
              <img src="/favicon.png" alt="Talksy Logo" className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-800">
            <span className="text-blue-600">Talksy</span>
          </h1>
          <p className="text-slate-500 italic text-sm mt-1">
            Your AI-powered chat assistant
          </p>
        </div>

        {/* Welcome message */}
        <div className="mb-6 text-center sm:text-left">
          <h2 className="text-xl font-semibold text-slate-800 flex items-center justify-center sm:justify-start mb-2">
            <BsChatDots className="text-blue-500 mr-2" />
            Welcome Back
          </h2>
          <p className="text-sm text-slate-500">
            Enter your email below to sign in or create an account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={SubmitHandler}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <BsEnvelope />
              </span>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-4 pl-12 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={btnLoading}
            className="w-full py-4 rounded-xl font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md flex justify-center items-center gap-2"
          >
            {btnLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                Continue <BsArrowRight />
              </>
            )}
          </button>
        </form>

        {/* Info */}
        <p className="text-center text-slate-500 text-sm mt-4">
          You'll receive a verification code via email
        </p>

        {/* Footer */}
        <div className="text-center text-slate-400 text-xs mt-8">
          <p>
            © 2025 <span className="font-semibold text-slate-600">Talksy</span>.
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
