import { createContext, useContext, useState } from "react";

const Labelcontext = createContext<any>(Array);

const LabelProvider = ({ children }) => {
    const [LabelContextArray, setLabelContextArray] = useState<any>([]);
    return (
        <Labelcontext.Provider value={{ LabelContextArray, setLabelContextArray }}>
            {children}
        </Labelcontext.Provider>
    )
}

export const useLabel = () => useContext(Labelcontext);
export { LabelProvider };