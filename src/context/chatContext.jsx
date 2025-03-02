import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const ChatContext = createContext();
export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [newRequestLoading, setNewRequestLoading] = useState(false);

  async function fetchResponse() {
    try {
        if(prompt === "")
            return;
        
        // Ensure we have a selected chat
        if (!selected) {
            toast.error("Please select or create a chat first");
            return;
        }
            
        setNewRequestLoading(true);

        const response = await axios({
            url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDY89blkwL0rEMtnlNND-dygtpwl2z1BDM',
            method: "post",
            data: {
                contents: [{ parts: [{ text: prompt }] }]
            }
        });

        const question = prompt;
        setPrompt("");

        const answer = response.data.candidates[0].content.parts[0].text;

        // Update UI immediately with new message
        setMessages((prev) => {
            const prevMessages = Array.isArray(prev) ? prev : [];
            return [...prevMessages, { 
                question: question, 
                answer: answer 
            }];
        });
        
        // Send to your backend
        const { data } = await axios.post(
            `https://talksy-backend-code.onrender.com/api/chat/${selected}`,
            {
                questions: question,
                answers: answer
            },
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }
        );
        
        setNewRequestLoading(false);
    } catch (error) {
        console.error("Error details:", error);
        toast.error(error.response?.data?.message || "Failed to generate response");
        setNewRequestLoading(false);
    }
  }

  const [chats, setChats] = useState([]);

  const [selected, setSelected] = useState(null);

  async function fetchChats() {
    try {
      const { data } = await axios.get(
        `https://talksy-backend-code.onrender.com/api/chat/all`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Make sure data is an array
      const chatsArray = Array.isArray(data) ? data : [];
      setChats(chatsArray);

      // Only set selected if there are items
      if (chatsArray.length > 0) {
        setSelected(chatsArray[0]._id);
      }
    } catch (error) {
      console.error("Fetch chats error:", error);
      toast.error("Failed to load chats");
      // Set to empty array on error
      setChats([]);
    }
  }

  const [createLod, setCreateLod] = useState(false);
  async function createChat() {
    setCreateLod(true);
    try {
      console.log("API URL:", `https://talksy-backend-code.onrender.com/api/chat/new`);

      const { data } = await axios.post(
        `https://talksy-backend-code.onrender.com/api/chat/new`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Create chat response:", data);
      await fetchChats();
      
      // Set the newly created chat as selected
      if (data && data._id) {
        setSelected(data._id);
      }
      
      setCreateLod(false);
      toast.success("New chat created successfully");
    } catch (error) {
      console.log("Create chat error:", error);
      console.log("Error response:", error.response);
      setCreateLod(false);
      toast.error("Something went wrong with the creation of a new chat");
    }
  }

  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    if (!selected) {
      setMessages([]);
      return;
    }
    
    setLoading(true);
    try {
        const { data } = await axios.get(`https://talksy-backend-code.onrender.com/api/chat/${selected}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        
        // Check if data contains the conversation array
        if (data && data.conversation && Array.isArray(data.conversation)) {
            // Map the backend data structure to match your frontend component's expected structure
            const formattedMessages = data.conversation.map(item => ({
                question: item.questions,
                answer: item.answers
            }));
            setMessages(formattedMessages);
        } else {
            setMessages([]);
        }
    } catch (error) {
        console.error("Fetch messages error:", error);
        setMessages([]);
        if (error.response?.status === 404) {
            toast.error("Chat not found");
        } else if (error.response?.data?.message !== "No conversation found") {
            toast.error("Failed to load messages");
        }
    } finally {
        setLoading(false);
    }   
  };

  async function deleteChat(id) {
    try {
      const { data } = await axios.delete(
        `https://talksy-backend-code.onrender.com/api/chat/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(data.message);
      await fetchChats();
      // Don't reload the page, just reset the selected chat if needed
      if (selected === id) {
        setSelected(chats.length > 0 ? chats[0]._id : null);
      }
    } catch (error) {
      console.error("Delete chat error:", error);
      toast.error("Failed to delete chat");
    }
  }

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (selected) {
      fetchMessages();
    } else {
      setMessages([]);
    }
  }, [selected]);

  return (
    <ChatContext.Provider
      value={{
        fetchResponse,
        messages,
        prompt,
        setPrompt,
        newRequestLoading,
        chats,
        createChat,
        createLod,
        selected,
        setSelected,
        loading,
        setLoading,
        deleteChat,
        fetchChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatData = () => useContext(ChatContext);