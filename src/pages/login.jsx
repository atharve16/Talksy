import React from 'react';
import { useState } from 'react';
import { UserData } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../component/Loading';
import { BsChatDots, BsEnvelope, BsArrowRight } from "react-icons/bs";

const Login = () => {
  const [email, setEmail] = useState("");
  const { loginUser, btnLoading } = UserData();
  const navigate = useNavigate();
  
  const SubmitHandler = (e) => {
    e.preventDefault();
    loginUser(email, navigate);
  }
  
  return (
    <div className='flex justify-center items-center min-h-screen bg-slate-50 p-6'>
      <div className='w-full md:w-[520px] mb-8 mt-8'>
        {/* Logo and Title Section */}
        <div className='text-center mb-8'>
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white p-3 rounded-full shadow-md">
              <img
                src="/favicon.png"
                alt="Talksy Logo"
                className="h-12 w-auto"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3 text-slate-800">
            <span className="text-blue-600">
              Talksy
            </span>
          </h1>
          <p className="text-lg text-slate-600 italic">Your AI-powered chat assistant</p>
        </div>
        
        {/* Login Form */}
        <div className='rounded-2xl bg-white p-8 shadow-xl w-full border border-slate-100 mb-6'>
          <h2 className='text-2xl mb-8 font-bold text-slate-800 flex items-center'>
            <BsChatDots className="text-blue-500 mr-3 text-xl" />
            Welcome Back
          </h2>
          
          <form onSubmit={SubmitHandler}>
            <div className='mb-8'>
              <label className='text-slate-700 block mb-3 font-medium' htmlFor='email'>Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <BsEnvelope className="text-slate-400" />
                </div>
                <input
                  className='border p-4 pl-12 w-full rounded-xl outline-none focus:ring-2 focus:border-blue-500 transition-all duration-300 bg-slate-50 border-slate-200 text-slate-800'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  type="email"
                  id="email"
                />
              </div>
            </div>
            
            <button
              className='bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-xl transition-colors duration-300 w-full font-medium shadow-lg mb-6'
              disabled={btnLoading}>
              {btnLoading ? 
                <LoadingSpinner /> : 
                <>
                  Continue 
                  <BsArrowRight className="ml-2 inline" />
                </>
              }
            </button>
            
            <p className="text-center text-slate-500 text-sm mb-4">
              Enter your email to receive a verification code
            </p>
          </form>
        </div>
        
        {/* Footer */}
        <div className="text-center text-slate-400 text-sm">
          <p>© 2025 Talksy. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Login;