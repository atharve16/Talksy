import { useState, useEffect, useRef } from "react";
import SideBar from "../component/SideBar";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseCircleSharp } from "react-icons/io5";
import Header from "../component/Header";
import { ChatData } from "../context/chatContext";
import { CgProfile } from "react-icons/cg";
import { BsRobot, BsChatDots } from "react-icons/bs";
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
    <div className="flex h-screen bg-slate-50 text-slate-700 relative overflow-hidden">
      {/* Sidebar */}
      <SideBar isOpen={isOpen} toggleSideBar={toggleSideBar} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col relative min-w-0">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSideBar}
          className="md:hidden fixed top-4 right-4 z-50 p-3 text-2xl bg-white bg-opacity-90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 hover:bg-slate-100 text-blue-500"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <IoCloseCircleSharp /> : <GiHamburgerMenu />}
        </button>

        {/* Header */}
        <div className="flex-shrink-0 px-4 pt-4 pb-2 md:px-6 md:pt-6 md:pb-4">
          <Header />
        </div>

        {/* Messages Container */}
        <div className="flex-1 flex flex-col min-h-0 px-4 md:px-6">
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <LoadingBig />
            </div>
          ) : (
            <div
              className="flex-1 overflow-y-auto thin-scrollbar pb-4"
              ref={messageContainerRef}
            >
              {messages && messages.length > 0 ? (
                <div className="space-y-4 max-w-4xl mx-auto w-full">
                  {messages.map((e, i) => (
                    <div
                      key={i}
                      className="message-animate"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {/* User Message */}
                      <div className="flex items-start gap-3 mb-4 justify-end">
                        <div className="flex-1 max-w-[85%] sm:max-w-[75%] md:max-w-[70%]">
                          <div className="p-3 sm:p-4 rounded-2xl bg-blue-50 border-l-4 border-blue-400 shadow-sm">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <CgProfile className="text-lg sm:text-xl text-blue-600" />
                              </div>
                              <div className="flex-1 break-words text-sm sm:text-base">
                                {e.question}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bot Message */}
                      <div className="flex items-start gap-3 mb-6">
                        <div className="flex-1 max-w-[85%] sm:max-w-[75%] md:max-w-[70%]">
                          <div className="p-3 sm:p-4 rounded-2xl bg-white border-l-4 border-slate-300 shadow-sm">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-slate-200 rounded-full flex items-center justify-center">
                                <BsRobot className="text-lg sm:text-xl text-slate-700" />
                              </div>
                              <div className="flex-1 break-words text-sm sm:text-base">
                                {e.answer}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : selected ? (
                <div className="flex-1 flex items-center justify-center p-4">
                  <div className="text-center max-w-md mx-auto">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <BsRobot className="text-2xl sm:text-3xl text-blue-500 animate-pulse" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mb-2">
                      No messages yet
                    </h3>
                    <p className="text-sm sm:text-base text-slate-500">
                      Start a conversation by typing a message below!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center p-4">
                  <div className="text-center max-w-md mx-auto">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                      <BsChatDots className="text-2xl sm:text-3xl text-slate-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mb-2">
                      No chat selected
                    </h3>
                    <p className="text-sm sm:text-base text-slate-500">
                      Create or select a chat to start messaging
                    </p>
                  </div>
                </div>
              )}

              {newRequestLoading && (
                <div className="max-w-4xl mx-auto w-full">
                  <LoadingSmall />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Container */}
        {selected && (
          <div className="flex-shrink-0 p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
              <form
                onSubmit={submitHandler}
                className="flex items-center gap-2 sm:gap-3 bg-white rounded-full shadow-lg border border-slate-200 p-2"
              >
                <input
                  className="flex-1 bg-transparent outline-none px-4 py-3 text-sm sm:text-base placeholder-slate-400"
                  type="text"
                  placeholder="Type your message..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={!selected || newRequestLoading}
                  required
                />
                <button
                  type="submit"
                  disabled={!prompt.trim() || !selected || newRequestLoading}
                  className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Send message"
                >
                  <IoMdSend className="text-lg" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSideBar}
        />
      )}
    </div>
  );
};

export default Home;
