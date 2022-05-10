import React from 'react';
import { useLabel } from 'src/context/LabelContext';
import "./LabelModal.css"

type Props = {}

function LabelModal({ }: Props) {
  const { LabelContextArray, setLabelContextArray } = useLabel();
  return (
    <div className="dialog playlistmodal-contatiner">
      <div className="dailog-header"><span style={{ fontWeight: 700 }}>Labels</span>
      </div>
      <div className="dailog-body confirmation-body">
        <ul>
          {setLabelContextArray.length === 0
            ? <li className="dialog-body-item">No Playlist exist</li>
            : setLabelContextArray?.map((item) => (
              <li key={item._id}>
              </li>))
          }
        </ul>
      </div>
      <div className="dailog-footer">
      </div>
    </div>
  )
}

export default LabelModal