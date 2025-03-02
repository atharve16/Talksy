import React from "react";
import { ChatData } from "../context/ChatContext";
import { MdDelete, MdAdd } from "react-icons/md";
import { LoadingSpinner } from "./Loading";
import toast from "react-hot-toast";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { BsChatLeftText } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";

const SideBar = ({ isOpen, toggleSideBar }) => {
  const { Logout } = UserData();
  const { chats, createChat, createLod, setSelected, deleteChat, selected } =
    ChatData();

  const deleteChatHandler = (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this chat?"
    );
    if (userConfirmed) {
      try {
        deleteChat(id);
        toast.success("Chat deleted successfully");
      } catch (error) {
        console.error("Failed to delete chat:", error);
        toast.error("Failed to delete the chat. Please try again.");
      }
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    Logout(navigate);
  };

  // Only close sidebar on mobile
  const handleChatSelect = (id) => {
    setSelected(id);
    // Only toggle if we're in mobile view (window width less than 768px)
    if (window.innerWidth < 768) {
      toggleSideBar();
    }
  };

  return (
    <div
      className={`text-slate-700 fixed inset-0 bg-opacity-95 backdrop-filter backdrop-blur-lg sidebar z-20
            transform md:relative md:translate-x-0 md:w-1/4 md:block transition-all duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="text-2xl font-bold mb-8 flex items-center">
          <div className="flex items-center">
            <BsChatLeftText className="text-blue-500 m-5" />
            <p className="text-slate-700 font-medium m-7">Recent Chats</p>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={createChat}
            className="w-full px-4 py-4 text-white rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-300 transform hover:-translate-y-1 font-medium new-chat-btn"
          >
            {createLod ? (
              <LoadingSpinner />
            ) : (
              <>
                <MdAdd className="text-xl" />
                New Chat
              </>
            )}
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="max-h-[calc(100vh-250px)] overflow-y-auto thin-scrollbar pr-2">
            {Array.isArray(chats) && chats.length > 0 ? (
              chats.map((e, i) => (
                <div
                  className="flex mb-2"
                  key={e._id}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <button
                    onClick={() => handleChatSelect(e._id)}
                    className={`w-full text-left py-3 px-4 rounded-lg 
                              flex justify-between items-center transition-all duration-200 chat-item
                              ${e._id === selected ? "active" : ""}`}
                  >
                    <span className="truncate pr-2">
                      {e.latestMessage ? (e.latestMessage.slice(0, 30) + "...") : "New Chat"}
                    </span>
                  </button>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteChatHandler(e._id);
                    }}
                    className="ml-1 px-3 py-3 bg-white hover:bg-red-100 hover:text-red-600 rounded-lg
                             flex justify-center items-center cursor-pointer transition-colors duration-300"
                  >
                    <MdDelete />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center p-6 bg-white bg-opacity-70 rounded-lg shadow-md">
                <p className="text-slate-700 font-medium">No chats yet</p>
                <p className="text-sm text-slate-500 mt-1">
                  Create your first chat!
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <button
            className="w-full px-4 py-4 rounded-lg
                      flex items-center justify-center gap-2 transition-all duration-300 shadow-md logout-btn"
            onClick={handleLogout}
          >
            <FiLogOut className="text-xl text-slate-600" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;