import React from 'react';
import DOMPurify from 'dompurify';
import "./Notes.css";
import { BiEdit, BiPinAngle, BiPinAngleFill, BiTrash, IcRoundArchive } from '../Icons/Icons';
import useAxios from 'src/customhook/useAxios';
import { VAR_ENCODE_TOKEN, VAR_NotPinnedNotes } from 'src/utils/Route';
import { useArchive } from 'src/context/ArchiveContext';
import { useTrash } from 'src/context/TrashContext';
import { useNotes } from 'src/context/NotesContext';
import { useEffect } from 'react';

type Props = { props : any}

const Notes = (data: any) => {
  const { props } = data;
  const [response, error, loading, axiosRequest] = useAxios();
  const { ArchiveContextArray, setArchiveContextArray } = useArchive();
  const { TrashContextArray, setTrashContextArray } = useTrash();
  const [noteDataSet, SetNoteDataSet] = useNotes();
  console.log(data);
  var initialStateNote = {
    title: props.title,
    htmlbody: props.content,
    createdOn: "",
    color: props.color,
    priority: props.priority,
    label: props.label,
  };
  function EditNoteHandler() { 
    
    data.noteReducer({ type: "reset", data: initialStateNote });
    data.showNoteToggle(true);
  }

  function ArchiveHandler() { 
    try {
			(async () => {
				var res = await  axiosRequest({
          method: "post",
          url: "/api/notes/archives/" +  props._id,
          headers: {
            authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
          },
          data: { note: { ...props } }
        
        });
        console.log(res,res.archives,setArchiveContextArray);
        setArchiveContextArray(res.archives);
        SetNoteDataSet(res.notes);
			})();;
		} catch (error) {
			console.log("Product list page error", error);
			// Alert("error", "Some error occured!! refresh page and try again");
		}
  }

  function TrashHandler() { 
    try {
			(async () => {
				var res = await  axiosRequest({
          method: "delete",
          url: "/api/notes/" +  props._id,
          headers: {
            authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
          }
        
        });
        console.log(res);
        setTrashContextArray((prev)=>[...prev,props]);
			})();;
		} catch (error) {
			console.log("Product list page error", error);
			// Alert("error", "Some error occured!! refresh page and try again");
		}
  }
  return (
    <div className='note-details-container' style={{backgroundColor : props.color  || "wheat"}}>
      <h3>{props.title}</h3>
      <div>
        {props.pin === VAR_NotPinnedNotes ? <BiPinAngle/> :<BiPinAngleFill /> }
      </div>
      <p className="color-schema" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.content) }}></p> 
      <div>
        CreatedOn : {props.createdOn}
      </div>

      <section className='notes-action'>
        <span onClick={() => ArchiveHandler()}>
          <IcRoundArchive height="1.7em" width="1.7em" />
        </span>
        <span onClick={()=> TrashHandler()}>
          <BiTrash height="1.7em" width="1.7em"  />
        </span>
        <span onClick={()=> {EditNoteHandler()}}><BiEdit height="1.7em" width="1.7em" /></span>
        
      </section>
    </div>
  )
}

export default Notes