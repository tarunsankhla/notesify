import React from 'react';
import Notes from 'src/components/UI/Notes/Notes';
import "../HomePage.css";

type Props = {}

const AllNotes = ({ props: notesdata }) => {

    function ClickOnNoteHanlder(event) {
        event.stopPropagation();
        console.log(event);
        
    }
    console.log(notesdata);
    return (
        <div className='allnotes-container'>
            {
                notesdata?.map((note: any) => (
                    <Notes key={note._id} props={note} />
                ))}
        </div>
    )
}

export default AllNotes