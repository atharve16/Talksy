import React from 'react';
import { ChatData } from '../context/ChatContext';
import { BsChatDots } from "react-icons/bs";

const Header = () => {
  const { chats, selected } = ChatData();
  
  return (
    <div className="p-6 mb-6 bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg header-container">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-slate-800 flex items-center">
          <img
              src="/favicon.png"
              alt="Talksy Logo"
              className="h-12 w-auto mr-3"
            />
            <span className="talksy-title text-transparent">Talksy</span>
          </h1>
          <p className="text-md text-slate-600">{selected ? "How can I help you today?" : "Select or create a chat to begin"}</p>
          {chats && chats.length === 0 && (
            <p className="mt-2 text-blue-500 font-medium animate-pulse">
              Create a new chat to continue
            </p>
          )}
        </div>
        
        <div className="hidden md:block">
          <div className="bg-slate-100 p-3 rounded-lg text-slate-700 text-sm border border-slate-200">
            <p className="font-medium">Welcome to Talksy!</p>
            <p>Your AI-powered chat assistant</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;