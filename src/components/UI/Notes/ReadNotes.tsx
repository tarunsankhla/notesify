import React from 'react';
import DOMPurify from 'dompurify';

type Props = {props : any}

const ReadNotes = ({props}: Props) => {
  return (
    <div className='note-details-container trash-notes-container' style={{ backgroundColor: props.color || "wheat" }}>
    <h3>{props.title}</h3>

    <p className="color-schema" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.content) }}></p>
    <div className='notes-footer'>
      <span className='notes-date'>
        {props.createdOn}
      </span>
    </div>
  </div>
  )
}

export default React.memo(ReadNotes);