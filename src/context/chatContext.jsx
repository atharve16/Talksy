import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const chatContext = createContext();

export const chatProvider = ({ children }) => {
  const [message, setMessage] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [newLoading, setNewLoading] = useState(false);

  const fetchResponse = async () => {
    if (prompt === "") return alert("please write a prompt");
    setNewLoading(true);
    setPrompt("");
    try {
      const response = await axios.post(`${process.env.GEMINI}`, {
        data: {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        },
      });
      const mess = {
        questions: prompt,
        answers:
          response["data"]["candidates"][0]["content"]["parts"][0]["text"],
      };
      setMessage((prev) => [...prev, mess]);
      setNewLoading(false);
    } catch (e) {
      toast.error("Something went wrong");
      console.error(e);
      setNewLoading(false);
    }
  };

  const [chats, setChats] = useState([]);
  const fetchChats = () => {
    try {
      const { data } = axios.get(`${process.env.SERVER}/chat/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setChats((prev) => [...prev, data]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchChats;
  }, []);

  return (
    <chatContext.Provider
      value={{
        fetchResponse,
        message,
        prompt,
        setPrompt,
        newLoading,
        setChats,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export const chatData = () => useContext(chatContext);
