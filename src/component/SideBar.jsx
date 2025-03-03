import React from "react";
import { ChatData } from "../context/chatContext";
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
      className={`text-slate-700 fixed inset-y-0 left-0 bg-white bg-opacity-95 backdrop-blur-lg sidebar z-20
            transform md:relative md:translate-x-0 md:w-1/4 md:block transition-all duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full"} shadow-xl p-6`}
    >
      <div className="flex flex-col h-full">
        <div className="text-2xl font-bold mb-8 flex items-center">
          <BsChatLeftText className="text-blue-500 mr-3 text-3xl" />
          <p className="text-slate-800 font-semibold">Recent Chats</p>
        </div>

          <button
            onClick={createChat}
            className="w-full px-6 py-4 my-4 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-3 shadow-lg transition-all duration-300 hover:bg-blue-600 hover:scale-102 font-semibold text-lg"
          >
            {createLod ? (
              <LoadingSpinner />
            ) : (
              <>
                <MdAdd className="text-2xl" />
                New Chat
              </>
            )}
          </button>

        <div className="flex-1 overflow-hidden">
          <div className="max-h-[calc(100vh-240px)] overflow-y-auto thin-scrollbar pr-2">
            {Array.isArray(chats) && chats.length > 0 ? (
              chats.map((e, i) => (
                <div
                  className="flex mb-4"
                  key={e._id}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <button
                    onClick={() => handleChatSelect(e._id)}
                    className={`w-full text-left py-3 px-4 rounded-lg 
                              flex justify-between items-center transition-all duration-200 chat-item
                              ${
                                e._id === selected
                                  ? "bg-blue-100 border-l-4 border-blue-500"
                                  : "bg-slate-50 hover:bg-slate-100"
                              }`}
                  >
                    <span className="truncate pr-2">
                      {e.latestMessage
                        ? e.latestMessage.slice(0, 30) + "..."
                        : "New Chat"}
                    </span>
                    <button
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteChatHandler(e._id);
                    }}
                    className="ml-2 px-3 py-3 bg-white hover:bg-red-100 hover:text-red-600 rounded-lg
                             flex justify-center items-center cursor-pointer transition-colors duration-300 shadow-sm"
                  >
                    <MdDelete />
                  </button>
                  </button>

                </div>
              ))
            ) : (
              <div className="text-center p-6 bg-slate-50 rounded-lg shadow-sm mb-4">
                <p className="text-slate-700 font-medium mb-2">No chats yet</p>
                <p className="text-sm text-slate-500">
                  Create your first chat!
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4 p-12 flex items-center justify-center ">
          <button
            className="w-48 p-12 bg-gray-600 hover:bg-red-500 rounded-lg
                      flex items-center justify-center gap-2 transition-all duration-300 shadow-lg logout-btn"
            onClick={handleLogout}
          >
            <FiLogOut className="text-xl text-white" />
            <span className="text-white">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;