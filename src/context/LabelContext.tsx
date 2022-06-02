import { createContext, useContext, useState } from "react";

const Labelcontext = createContext<any>(Array);

const LabelProvider = ({ children }) => {
    const [LabelContextArray, setLabelContextArray] = useState<any>(["label-1","label-2","label-3"]);
    return (
        <Labelcontext.Provider value={{ LabelContextArray, setLabelContextArray }}>
            {children}
        </Labelcontext.Provider>
    )
}

export const useLabel = () => useContext(Labelcontext);
export { LabelProvider };