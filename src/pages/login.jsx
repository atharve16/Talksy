import React from 'react';
import { useState } from 'react';
import { UserData } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../component/Loading';
import { BsChatDots } from "react-icons/bs";

const Login = () => {
  const [email, setEmail] = useState("");
  const { loginUser, btnLoading } = UserData();
  const navigate = useNavigate();

  const SubmitHandler = (e) => {
    e.preventDefault();
    loginUser(email, navigate);
  }

  return (
    <div className='flex justify-center items-center h-screen bg-slate-50 p-4'>
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
          <p className="text-md text-slate-600 italic">Your AI-powered chat assistant</p>
        </div>

        <form
          className='rounded-xl bg-white p-8 shadow-lg w-full border border-slate-100 bg-opacity-90 backdrop-blur-sm'
          onSubmit={SubmitHandler}>
          <h2 className='text-2xl mb-6 font-bold text-slate-800 flex items-center'>
            <BsChatDots className="text-blue-500 mr-2" />
            Login to Talksy
          </h2>
          <div className='mb-6'>
            <label className='text-slate-700 block mb-2 font-medium' htmlFor='email'>Email Address</label>
            <input
              className='border p-3 w-full rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-slate-50 border-slate-200'
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              placeholder="Enter your email"
              type="email"
              id="email"
            />
          </div>
          <button
            className='bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-300 w-full font-medium shadow-md hover:shadow-lg flex items-center justify-center'
            disabled={btnLoading}>
            {btnLoading ? <LoadingSpinner /> : "Continue"}
          </button>
          <p className="mt-4 text-center text-slate-500 text-sm">
            Enter your email to receive a verification code
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login;