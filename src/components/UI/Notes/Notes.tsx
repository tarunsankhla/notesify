import React from 'react';
import DOMPurify from 'dompurify';
import "./Notes.css";
import { BiEdit, BiPinAngle, BiPinAngleFill, BiTrash, IcRoundArchive } from '../Icons/Icons';
import useAxios from 'src/customhook/useAxios';
import { VAR_ENCODE_TOKEN, VAR_NOTPINNED_NOTES, VAR_PINNED_NOTES, VAR_RESET } from 'src/utils/Route';
import { useArchive } from 'src/context/ArchiveContext';
import { useTrash } from 'src/context/TrashContext';
import { useNotes } from 'src/context/NotesContext';
import { useEffect } from 'react';

type Props = { props: any }

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
    id: props._id,
    pin: props.pin
  };
  function EditNoteHandler() {
    data.noteReducer({ type: VAR_RESET, data: initialStateNote });
    data.showNoteToggle(true);

  }

  async function PinNoteHandler() {
    var object = {
      title: props.title,
      content: props.content,
      color: props.color,
      createdOn: props.cr,
      priority: props.priority,
      pin: props.pin === VAR_NOTPINNED_NOTES ? VAR_PINNED_NOTES : VAR_NOTPINNED_NOTES,
      label: props.label,
    };

    console.log(object, props._id);
    var res = await axiosRequest({
      method: "post",
      url: "/api/notes/" + props._id,
      data: { note: object },
      headers: {
        authorization: localStorage.getItem(VAR_ENCODE_TOKEN),
      },
    });
    console.log(res);
    SetNoteDataSet(res.notes);
  }

  function ArchiveHandler() {
    try {
      (async () => {
        var res = await axiosRequest({
          method: "post",
          url: "/api/notes/archives/" + props._id,
          headers: {
            authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
          },
          data: { note: { ...props } }

        });
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
        var res = await axiosRequest({
          method: "delete",
          url: "/api/notes/" + props._id,
          headers: {
            authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
          }

        });
        setTrashContextArray((prev) => [...prev, props]);
        SetNoteDataSet(res.notes);
      })();;
    } catch (error) {
      console.log("Product list page error", error);
      // Alert("error", "Some error occured!! refresh page and try again");
    }
  }
  return (
    <div className='note-details-container' style={{ backgroundColor: props.color || "wheat" }}>
      <h3>{props.title}</h3>
      <div className='note-pin'>
        {props.pin === VAR_NOTPINNED_NOTES ?
          <span onClick={() => PinNoteHandler()}><BiPinAngle /> </span>
          : <span onClick={() => PinNoteHandler()}><BiPinAngleFill /></span>}
      </div>
      <p className="color-schema" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.content) }}></p>
      <div className='notes-footer'>
        <span className='notes-date'>
          {props.createdOn}
        </span>

        <section className='notes-action' style={{ color: props.color || "black" }}>
          <span onClick={() => ArchiveHandler()}>
            <IcRoundArchive height="1.3em" width="1.3em" />
          </span>
          <span onClick={() => TrashHandler()}>
            <BiTrash height="1.3em" width="1.3em" />
          </span>
          <span onClick={() => { EditNoteHandler() }}><BiEdit height="1.3em" width="1.3em" /></span>

        </section>
      </div>
    </div>
  )
}

export default React.memo(Notes);