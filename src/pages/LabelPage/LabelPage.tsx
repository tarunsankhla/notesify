import React from 'react'
import { useState } from 'react';
import { books, Files } from 'src/assets/holders/holders'
import Skeleton from 'src/components/common/Skeleton/Skeleton'
import { Toast } from 'src/components/common/Toast/Toast';
import { CreateButton } from 'src/components/UI/Buttons/Buttons'
import ReadNotes from 'src/components/UI/Notes/ReadNotes';
import { useLabel } from 'src/context/LabelContext';
import { useNotes } from 'src/context/NotesContext';
import "./LabelPage.css";

type Props = {}

function LabelPage() {
  const { LabelContextArray, setLabelContextArray } = useLabel();
  const [noteDataSet, SetNoteDataSet] = useNotes();
  const [input, setInput] = useState("");

  const CreateLabelHandler = () => {
    if (!!input) {
      // setLabelContextArray(prev => [...prev, input]);
      setLabelContextArray(prev => {
        if (!prev.includes(input)) {
          setInput("");
          Toast(" Label created !!")
          return [...prev, input];
        }
        setInput("");
        Toast(" Label already exist !!")
        return [...prev];
        
			})
      
    }
  }
  return (
    <div>
      <div className="notes-container">
        <div className='notes-container-header'>
          <span className="page-title">Labels : </span>
          <div>
            <input onChange={(e) => setInput(e.target.value)} value={input} />
            <span onClick={() => CreateLabelHandler()} ><CreateButton props="Create Label" /></span>
          </div>
        </div>
        <div className=''>
          <div>Total Notes : {noteDataSet.length}</div>

          {LabelContextArray.length ?
            <div className='allnotes-container'>
              {LabelContextArray.map(i => (
                <div className='label-container' key={i}>
                  <p className='label-name'>{i}</p>
                  <div className='label-list-container-ind'>
                    {noteDataSet.map(note => (
                      note.label.includes(i) &&
                        <ReadNotes props={note} />
                    ))}
                  </div>
                </div>
              ))
              }
            </div>
            : <>
              <img src={Files} loading="lazy" className="holder" alt='holder trash' />
              <Skeleton />
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default LabelPage