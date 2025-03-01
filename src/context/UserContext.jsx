import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();
export const UserProvider = ({ Children }) => {
  const [loading, setloading] = useState(false);

  async function login(email, navigate) {
    try {
      const { data } = await axios.post(`${process.env.SERVER}user/login`, {
        email,
      });
      setloading(true);
      toast.success(data.message);
      localStorage.setItem("verifyToken", data.verifyToken);
      navigate("/verify");
      setloading(false);
    } catch (e) {
      toast.error(e.response.data.message);
      setloading(false);
    }
  }

  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  async function verify(otp, navigate) {
    const verifyToken = localStorage.getItem("verifyToken");
    setloading(true);

    if (!verifyToken) return toast.error("token nahi h");
    try {
      const { data } = await axios.post(`${process.env.SERVER}user/verify`, {
        otp,
        verifyToken,
      });
      setloading(true);
      toast.success(data.message);
      localStorage.clear();
      localStorage.setItem("token", data.token);
      navigate("/verify");
      setloading(false);
      setIsAuth(true);
      setUser(data.user);
    } catch (e) {
      toast.error(e.response.data.message);
      setloading(false);
    }
  }

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      setloading(true);

      if (!token) return toast.error("not found");
      const { data } = await axios.get(`${process.env.SERVER}user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsAuth(true);
      setUser(data);
    } catch (e) {
      toast.error(e.response.data.message);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ login, verify, loading, user, setUser, isAuth, setIsAuth }}
    >
      {Children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
