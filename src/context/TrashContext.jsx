import { createContext, useContext, useState } from "react";

const trashcontext = createContext([]);

const TrashProvider = ({ children }) => {
    const [TrashContextArray, setTrashContextArray] = useState([]);
    return (
        <trashcontext.Provider value={{ TrashContextArray, setTrashContextArray }}>
            {children}
        </trashcontext.Provider>
    )
}

export const useTrash = () => useContext(trashcontext);
export { TrashProvider };