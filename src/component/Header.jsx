import React from "react";
import { ChatData } from "../context/ChatContext";
import { BsChatDots } from "react-icons/bs";

const Header = () => {
  const { chats, selected } = ChatData();

  return (
    <div className="p-6 mb-6 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg header-container border border-slate-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-slate-800 flex items-center">
            <img
              src="/favicon.png"
              alt="Talksy Logo"
              className="h-12 w-auto mr-3"
            />
            <span className="talksy-title bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              Talksy
            </span>
          </h1>
          <p className="text-md text-slate-600 italic">
            {selected
              ? "How can I help you today?"
              : "Select or create a chat to begin"}
          </p>
          {chats && chats.length === 0 && (
            <p className="mt-2 text-blue-500 font-medium animate-pulse flex items-center">
              <BsChatDots className="mr-2" />
              Create a new chat to continue
            </p>
          )}
        </div>

        <div className="hidden md:block">
          <div className="bg-blue-50 p-4 rounded-lg text-slate-700 text-sm border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <p className="font-medium text-blue-600 mb-1">Welcome to Talksy!</p>
            <p className="text-slate-600">Your AI-powered chat assistant</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
