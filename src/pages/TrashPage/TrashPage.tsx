import React, { useEffect } from 'react';
import { Trash } from 'src/assets/holders/holders';
import Skeleton from 'src/components/common/Skeleton/Skeleton';
import TrashNotes from 'src/components/UI/Notes/TrashNotes';
import { useTrash } from 'src/context/TrashContext';
import AllNotes from '../HomePage/AllNotes/AllNotes';
import "./TrashPage.css";

const TrashPage = () => {
  const { TrashContextArray, setTrashContextArray } = useTrash();
  console.log(TrashContextArray);

  return (
    // <div>  <div className="latest-notes-container">
    // <div className="page-title">Latest Notes : </div>
    // <div>
    //   <AllNotes props={TrashContextArray} />
    // </div>
    // </div></div>
      <div>
      <div className="notes-container">
        <div className="page-title">Trash : </div>
        <div className='allnotes-container'>
          {
            TrashContextArray?.length  ?
            TrashContextArray?.map((note: any) => (
              <TrashNotes key={note._id} props={note} />
            ))
              : 
              <div>
                <img src={Trash} loading="lazy" className="holder" alt='holder trash' />
                <Skeleton />
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default TrashPage;