import { createContext, useContext, useState } from "react";

const Modalcontext = createContext<any>(Boolean);

function ModalProvider({ children }) {
    const [modalToggle, setmodalToggle] = useState<any>(false);
    return (
        <Modalcontext.Provider value={{modalToggle, setmodalToggle }}>
            {children}
        </Modalcontext.Provider>
    )
}

export const useModal = () => useContext(Modalcontext);
export { ModalProvider };