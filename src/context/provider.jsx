import { createContext } from "react";
import { BrowserRouter } from "react-router-dom";


export const Provide = ({ children }) => { 
    return
    <BrowserRouter>
        {children}
    </BrowserRouter>
}