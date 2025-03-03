import { useState, useEffect, useRef } from "react";
import SideBar from "../component/SideBar";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseCircleSharp } from "react-icons/io5";
import Header from "../component/Header";
import { ChatData } from "../context/chatContext";
import { CgProfile } from "react-icons/cg";
import { BsRobot } from "react-icons/bs";
import { LoadingSmall, LoadingBig } from "../component/Loading";
import { IoMdSend } from "react-icons/io";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  const {
    fetchResponse,
    messages,
    prompt,
    setPrompt,
    newRequestLoading,
    loading,
    selected,
  } = ChatData();

  const submitHandler = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      fetchResponse();
    }
  };

  const messageContainerRef = useRef();

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-700 relative overflow-hidden app-container">
      <SideBar isOpen={isOpen} toggleSideBar={toggleSideBar} />

      <div className="flex flex-1 flex-col relative">
        <button
          onClick={toggleSideBar}
          className="md:hidden p-3 text-2xl fixed top-4 right-4 z-10 bg-white bg-opacity-80 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 hover:bg-slate-100 text-blue-500"
        >
          {isOpen ? <IoCloseCircleSharp /> : <GiHamburgerMenu />}
        </button>

        <div className="flex-1 p-3 md:p-4 pb-24 relative">
          <Header />
          {loading ? (
            <LoadingBig />
          ) : (
            <div
              className="flex-1 p-3 sm:max-h-[calc(115vh-220px)] max-h-[calc(105vh-220px)] overflow-y-auto thin-scrollbar message-container"
              ref={messageContainerRef}
            >
              {messages && messages.length > 0 ? (
                messages.map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="mb-5 message-animate"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className="mb-3 p-4 rounded-lg user-message flex items-start gap-3 bg-blue-50">
                        <div className="avatar flex items-center justify-center rounded-full h-10 w-10 bg-blue-100">
                          <CgProfile className="text-xl text-blue-600" />
                        </div>
                        <div className="flex-1 break-words message-text">
                          {e.question}
                        </div>
                      </div>

                      <div className="mb-3 p-4 rounded-lg bot-message flex items-start gap-3 bg-slate-50">
                        <div className="avatar bot-avatar flex items-center justify-center rounded-full p-2 h-10 w-10 bg-slate-200">
                          <BsRobot className="text-xl text-slate-700" />
                        </div>
                        <div className="flex-1 break-words message-text">
                          {e.answer}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : selected ? (
                <div className="flex items-center justify-center h-64 text-center">
                  <div className="empty-state p-6 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 bg-white bg-opacity-80 rounded-lg shadow-sm">
                    <div className="text-6xl mb-3 text-blue-400">
                      <BsRobot className="mx-auto animate-pulse" />
                    </div>
                    <p className="text-xl text-slate-700 font-semibold">
                      No messages in this chat yet.
                    </p>
                    <p className="text-slate-500 font-medium mt-2">
                      Start a conversation!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-center">
                  <div className="empty-state p-6 backdrop-blur-sm transform transition-all duration-500 hover:scale-105 bg-white bg-opacity-80 rounded-lg shadow-sm">
                    <p className="text-xl text-slate-700 font-semibold">
                      No chat selected.
                    </p>
                    <p className="text-slate-500 font-medium mt-2">
                      Please create or select a chat to start.
                    </p>
                  </div>
                </div>
              )}

              {newRequestLoading && <LoadingSmall />}
            </div>
          )}
        </div>

        {/* Always render the input container, but make it conditionally visible */}
        <div
          className={`fixed bottom-5 right-0 left-0 md:left-auto p-4 w-full md:w-3/4 md:pr-6 z-10 
             transition-opacity duration-300 ${
               !selected || isOpen
                 ? "opacity-0 pointer-events-none"
                 : "opacity-100"
             }`}
        >
          <form
            onSubmit={submitHandler}
            className="flex justify-center items-center bg-white bg-opacity-90 backdrop-blur-sm rounded-full shadow-lg overflow-hidden prompt-container border border-slate-100"
          >
            <input
              className="flex-grow bg-transparent outline-none glow-input prompt-input p-3 px-5"
              type="text"
              placeholder="Enter your message here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={!selected || newRequestLoading}
              required
            />
            <button
              type="submit"
              disabled={!prompt.trim() || !selected || newRequestLoading}
              className="bg-blue-500 text-white rounded-full send-button flex items-center justify-center transition-colors duration-300 hover:bg-blue-900"
            >
              <IoMdSend className="mx-auto" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
