import React from 'react';
import Notes from 'src/components/UI/Notes/Notes';
import "../HomePage.css";

type Props = {prosp}

const AllNotes = (props :any) => {
    // var { } = props;
    console.log(props,props.notesdata);
    function ClickOnNoteHanlder(event) {
        event.stopPropagation();
        console.log(event);
        
    }
    // console.log(props.notesda    ta);
    return (
        <div className='allnotes-container'>
            {
                props.notesdata?.map((note: any) => (
                    <Notes key={note._id} props={note} showNoteToggle={props.showNoteToggle} noteReducer={props.noteReducer} />
                ))}
        </div>
    )
}

export default AllNotes