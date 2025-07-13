import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const UserContext = createContext();

const BASE_URL = "https://talksy-backend-code.onrender.com/api";

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  async function loginUser(email, navigate) {
    setBtnLoading(true);
    try {
      console.log("Login URL:", `${BASE_URL}/user/login`);
      console.log("Sending email:", email);

      const { data } = await axios.post(
        `${BASE_URL}/user/login`,
        { email }
      );

      console.log("Login response:", data);
      toast.success(data.message);
      localStorage.setItem("verifyToken", data.verifyToken);
      navigate("/verify");
      setBtnLoading(false);
    } catch (error) {
      console.log("Login error:", error);
      console.log("Error response:", error.response);
      toast.error(
        error.response?.data?.message || "Login failed. Server may be down."
      );
      setBtnLoading(false);
    }
  }

  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  async function verifyUser(otp, navigate, fetchChats) {
    const verifyToken = localStorage.getItem("verifyToken");
    setBtnLoading(true);

    if (!verifyToken) return toast.error("No verification token found");

    try {
      const { data } = await axios.post(
        `${BASE_URL}/user/verify`,
        { verifyToken, otp }
      );
      toast.success(data.message);
      localStorage.clear();
      localStorage.setItem("token", data.token);
      navigate("/");
      setBtnLoading(false);
      setIsAuth(true);
      setUser(data.user);
      fetchChats();
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/user/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setIsAuth(true);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
      setLoading(false);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please log in again.");
      }
    }
  }

  const Logout = (navigate) => {
    toast.success("Logged Out Successfully");
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser([]);
    navigate("/login");
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loginUser,
        btnLoading,
        isAuth,
        setIsAuth,
        user,
        verifyUser,
        loading,
        Logout,
      }}
    >
      {children}
      <Toaster position="top-right" reverseOrder={false} />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
