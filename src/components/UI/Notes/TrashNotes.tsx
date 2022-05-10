import React from 'react';
import DOMPurify from 'dompurify';
import { BiRetainTrash, BiTrash, BiUnarchive } from '../Icons/Icons';
import { VAR_ENCODE_TOKEN, VAR_NOTPINNED_NOTES } from 'src/utils/Route';
import useAxios from 'src/customhook/useAxios';
import { useNotes } from 'src/context/NotesContext';
import { useTrash } from 'src/context/TrashContext';

type Props = { props: any }

const TrashNotes = ({ props }: Props) => {
  const [response, error, loading, axiosRequest] = useAxios();
  const [noteDataSet, SetNoteDataSet] = useNotes();
  const { TrashContextArray, setTrashContextArray } = useTrash();


  async function retainNoteHandler() {
    var object = {
      title: props.title,
      content: props.htmlbody,
      color: props.color,
      createdOn: new Date().toDateString(),
      pin: VAR_NOTPINNED_NOTES,
      priority: props.priority,
      label: props.label,
    };

    var res = await axiosRequest({
      method: "post",
      url: "/api/notes",
      data: { note: object },
      headers: {
        authorization: localStorage.getItem(VAR_ENCODE_TOKEN),
      },
    });
    SetNoteDataSet(res.notes);
    RemoveNoteFromTrashHandler();
  }

  function RemoveNoteFromTrashHandler() {
    setTrashContextArray((prev) => {
      return [...prev].filter((note) => note._id !== props._id) ?? []
    })
  }
  return (
    <div className='note-details-container trash-notes-container' style={{ backgroundColor: props.color || "wheat" }}>
      <h3>{props.title}</h3>

      <p className="color-schema" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.content) }}></p>
      <div className='notes-footer'>
        <span className='notes-date'>
          {props.createdOn}
        </span>


        <section className='notes-action' style={{ color: props.color || "black" }}>
          <span onClick={() => { retainNoteHandler(); }}>
            <BiRetainTrash height="1.3em" width="1.3em" />
          </span>
          <span onClick={() => { RemoveNoteFromTrashHandler() }}>
            <BiTrash height="1.3em" width="1.3em" />
          </span>
        </section>
      </div>
    </div>
  )
}

export default React.memo(TrashNotes);