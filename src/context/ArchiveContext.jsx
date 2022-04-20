import { createContext, useContext, useState } from "react";

const Archivecontext = createContext([]);

const ArchiveProvider = ({ children }) => {
    const [ArchiveContextArray, setArchiveContextArray] = useState([]);
    return (
        <Archivecontext.Provider value={{ ArchiveContextArray, setArchiveContextArray }}>
            {children}
        </Archivecontext.Provider>
    )
}

export const useArchive = () => useContext(Archivecontext);
export { ArchiveProvider };