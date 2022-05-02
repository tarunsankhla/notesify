import React from 'react';
import { useLabel } from 'src/context/LabelContext';
import "./LabelModal.css"

type Props = {}

function LabelModal({ }: Props) {
    const { LabelContextArray, setLabelContextArray } = useLabel();
  return (
    <div className="dialog playlistmodal-contatiner">
    <div className="dailog-header"><span style={{fontWeight:700}}>Labels</span>
        {/* <span className="dailog-header" onClick={() => { setPlayListModal((prev) => !prev) }}><IcRoundCancel /></span> */}
    </div>
    <div className="dailog-body confirmation-body">
        <ul>
            {setLabelContextArray.length === 0
                ? <><li className="dialog-body-item">No Playlist exist</li>
                </>
                : setLabelContextArray?.map((item) => (
                    <li key={item._id}>
                        {/* <input type="checkbox" name="playlist" value={item._id}
                            //  checked={item.some((playlistvideo) => playlistvideo.id === data._id)}
                            checked={item.videos.some((i)=> i._id === data._id)}
                            onClick={(e) => SelectedPlayListHandler(e.target.value,item) }/> */}
                        {/* <span className="dialog-body-item"> {item.name}</span> */}
                    </li>))
            }
        </ul>
    </div>
    <div className="dailog-footer">
        {/* <button  onClick={() => setHandleCreatePlayList((prev) => !prev)}>Create Playlist +</button>
        <div>
            {
            handleCreatePlayList && <NewPlayList setHandleCreatePlayList={setHandleCreatePlayList} />
            }
        </div> */}
    </div>
</div>
  )
}

export default LabelModal