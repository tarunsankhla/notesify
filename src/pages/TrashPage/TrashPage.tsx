import React, { useEffect } from 'react';
import { useTrash } from 'src/context/TrashContext';
import AllNotes from '../HomePage/AllNotes/AllNotes';
import "./TrashPage.css";

const TrashPage = () => {
  const { TrashContextArray, setTrashContextArray } = useTrash();
  console.log(TrashContextArray);

  return (
    <div>  <div className="latest-notes-container">
    <div className="page-title">Latest Notes : </div>
    <div>
      <AllNotes props={TrashContextArray} />
    </div>
  </div></div>
  )
}

export default TrashPage