import React from 'react';
import Skeleton from 'src/components/common/Skeleton/Skeleton';
import Notes from 'src/components/UI/Notes/Notes';
import { VAR_NOTPINNED_NOTES, VAR_PINNED_NOTES } from 'src/utils/Route';
import "../HomePage.css";

type Props = { props }

const AllNotes = (props: any) => {
    // var { } = props;
    console.log(props, props.notesdata);
    function ClickOnNoteHanlder(event) {
        event.stopPropagation();
        console.log(event);

    }
    // console.log(props.notesda    ta);
    return (
        <div>
            {props.notesdata?.some((note: any) => (
                note.pin === VAR_PINNED_NOTES)) &&
                <div>
                    <div className="page-title">
                        Pinned
                    </div>
                    <div className='allnotes-container'>

                        {
                            props.notesdata?.map((note: any) => (
                                note.pin === VAR_PINNED_NOTES &&
                                <Notes key={note._id} props={note} showNoteToggle={props.showNoteToggle}
                                    noteReducer={props.noteReducer} noteUpdate={props.noteUpdate} />
                            ))
                        }
                    </div>
                </div>
            }
            <div className="page-title">Notes : </div>
            <div className='allnotes-container'>
                {
                    props.notesdata.length ?
                        props.notesdata?.map((note: any) => (
                            note.pin === VAR_NOTPINNED_NOTES &&
                            <Notes key={note._id} props={note} showNoteToggle={props.showNoteToggle}
                                noteReducer={props.noteReducer} noteUpdate={props.noteUpdate} />

                        ))
                        : <Skeleton />
                }
            </div>
        </div>
    )
}

export default React.memo(AllNotes);