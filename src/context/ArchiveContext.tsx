import React, { createContext, useContext, useState } from "react";

const Archivecontext = createContext<any>(Array);

const ArchiveProvider = ({ children }) => {
    const [ArchiveContextArray, setArchiveContextArray] = useState<any>([]);
    return (
        <Archivecontext.Provider value={{ ArchiveContextArray, setArchiveContextArray }}>
            {children}
        </Archivecontext.Provider>
    )
}

export const useArchive = () => useContext(Archivecontext);
export default React.memo(ArchiveProvider);