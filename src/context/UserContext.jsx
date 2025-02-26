import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();
export const UserProvider = ({ Children }) => {

  const [btnloading, setbtnloading] = useState(false);

  async function login(email, navigate){
    try{
      const {data} = await axios.post(`${process.env.SERVER}user/login`,{email})
      setbtnloading(true);
      toast.success(data.message);
      localStorage.setItem("verifyToken",data.verifyToken);
      navigate("/verify");
      setbtnloading(false);
    }catch(e){
      toast.error(e.response.data.message);
      setbtnloading(false);
    };
  }

  const [user , setUser] = useState([]);
  const [isAuth , setIsAuth] = useState(false);

  async function verify(otp, navigate){
    const verifyToken = localStorage.getItem('verifyToken');
    setbtnloading(true);

    if(!verifyToken) return toast.error("token nahi h");
    try{
      const {data} = await axios.post(`${process.env.SERVER}user/verify`,{otp, verifyToken})
      setbtnloading(true);
      toast.success(data.message);
      localStorage.clear();
      localStorage.setItem("token",data.token);
      navigate("/verify");
      setbtnloading(false);
    }catch(e){
      toast.error(e.response.data.message);
      setbtnloading(false);
    };
  }
  
  return (
    <UserContext.Provider value={{ verify, btnloading }}>
      {Children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
