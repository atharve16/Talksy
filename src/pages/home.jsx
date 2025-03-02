import { useState, useEffect, useRef } from "react";
import SideBar from "../component/SideBar";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseCircleSharp } from "react-icons/io5";
import Header from "../component/Header";
import { ChatData } from "../context/ChatContext";
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
          className="md:hidden p-4 text-2xl fixed top-4 right-4 z-10 bg-white bg-opacity-80 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 hover:bg-slate-100 text-slate-600"
        >
          {isOpen ? <IoCloseCircleSharp /> : <GiHamburgerMenu />}
        </button>

        <div className="flex-1 p-4 md:p-6 pb-28 relative">
          <Header />
          {loading ? (
            <LoadingBig />
          ) : (
            <div
              className="flex-1 p-4 max-h-[calc(100vh-240px)] overflow-y-auto thin-scrollbar message-container"
              ref={messageContainerRef}
            >
              {messages && messages.length > 0 ? (
                messages.map((e, i) => {
                  return (
                    <div
                      key={i}
                      className="mb-6 message-animate"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className="mb-4 p-5 rounded-lg user-message flex items-start gap-3">
                        <div className="avatar flex items-center justify-center rounded-full p-2 h-10 w-10">
                          <CgProfile className="text-xl" />
                        </div>
                        <div className="flex-1 break-words message-text">
                          {e.question}
                        </div>
                      </div>

                      <div className="mb-4 p-5 rounded-lg bot-message flex items-start gap-3">
                        <div className="avatar bot-avatar flex items-center justify-center rounded-full p-2 h-10 w-10">
                          <BsRobot className="text-xl" />
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
                  <div className="empty-state p-8 backdrop-blur-sm transform transition-all duration-500 hover:scale-105">
                    <div className="text-6xl mb-4 text-slate-400">
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
                  <div className="empty-state p-8 backdrop-blur-sm transform transition-all duration-500 hover:scale-105">
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
          className={`fixed bottom-0 right-0 left-0 md:left-auto p-4 w-full md:w-3/4 md:pr-8 z-10 
                     transition-opacity duration-300 ${(!selected || isOpen) ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <form
            onSubmit={submitHandler}
            className="flex justify-center items-center bg-white bg-opacity-90 backdrop-blur-sm rounded-full shadow-lg overflow-hidden prompt-container"
          >
            <input
              className="flex-grow bg-transparent outline-none glow-input prompt-input p-4"
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
              className="text-white disabled:opacity-50 transition-colors duration-300 pulse-button send-button p-4"
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