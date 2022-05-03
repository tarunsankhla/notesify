import React from 'react';
import DOMPurify from 'dompurify';
import { BiJournalPlus, BiPatchPlus, BiUnarchive } from '../Icons/Icons';
import useAxios from 'src/customhook/useAxios';
import { useArchive } from 'src/context/ArchiveContext';
import { VAR_ENCODE_TOKEN } from 'src/utils/Route';
import { useNotes } from 'src/context/NotesContext';

type Props = { props: any }

const ArchiveNotes = ({ props }: Props) => {
    const [response, error, loading, axiosRequest] = useAxios();
    const { ArchiveContextArray, setArchiveContextArray } = useArchive();
    const [noteDataSet, SetNoteDataSet] = useNotes();
    console.log(props);
    function UnArchiveHandler() {
        try {
            (async () => {
                var res = await axiosRequest({
                    method: "post",
                    url: "/api/archives/restore/" + props._id,
                    headers: {
                        authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
                    },
                    data: { note: { ...props } }

                });
                console.log(res, res.archives, setArchiveContextArray);
                setArchiveContextArray(res.archives);
                SetNoteDataSet(res.notes);
            })();
        } catch (error) {
            console.log("Product list page error", error);
            // Alert("error", "Some error occured!! refresh page and try again");
        }
    }

    return (
        <div className='note-details-container archive-notes-container' style={{ backgroundColor: props.color || "wheat" }}>
            <h3>{props.title}</h3>

            <p className="color-schema" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.content) }}></p>
            <div className='notes-date'>
                 {props.createdOn}
            </div>

           
            <section className='notes-action' style={{color: props.color || "black"}}>
                <span onClick={()=>UnArchiveHandler()}>
                    <BiUnarchive height="1.7em" width="1.7em" />
                </span>
            </section>
        </div>
    )
}

export default React.memo(ArchiveNotes);