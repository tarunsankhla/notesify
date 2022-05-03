import React from "react";
import { createContext, useContext, useState } from "react";

const trashcontext = createContext<any>(Array);

const TrashProvider = ({ children }) => {
    const [TrashContextArray, setTrashContextArray] = useState<any>([]);
    return (
        <trashcontext.Provider value={{ TrashContextArray, setTrashContextArray }}>
            {children}
        </trashcontext.Provider>
    )
}

export const useTrash = () => useContext(trashcontext);
export default React.memo(TrashProvider);