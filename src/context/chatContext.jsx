import { createContext, useContext } from "react";

const chatcontext = createContext();

export const chatprovider = ({children}) => {
    return (
        <chatcontext.Provider value={{}}>
            {children}
        </chatcontext.Provider>
    );
};

export const chatData = useContext(chatcontext);