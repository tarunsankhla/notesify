import { createContext, useContext, useState } from "react";

const noteContext = createContext<any>(Array);

const NotesProvider = ({ children }) => { 
    const [NoteArray, setNotesArray] = useState<any>([]);
    return <noteContext.Provider value={[NoteArray, setNotesArray]}>{ children}</noteContext.Provider>
}

export const useNotes = () => useContext(noteContext);
export { NotesProvider };