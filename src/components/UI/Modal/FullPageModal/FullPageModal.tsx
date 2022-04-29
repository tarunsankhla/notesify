import React, { useState } from 'react'
import { useModal } from 'src/context/ModalProvider';
import "./FullPageModal.css"
// type Props = { children: JSX.Element }

function FullPageModal({ children }) {
    // const [FullPageModalToggle, setFullPageModalToggle] = useState(false);
    const { modalToggle, setmodalToggle } = useModal();

    // console.log(props);k
    return (
        <>
            {
                modalToggle &&
                <div className='modal-fixed-bg-highlight' onClick={() => setmodalToggle(false)}>
                    <div className='modal-view-container'>
                        {children}
                    </div>
                </div>
            }
        </>
    );
}




// eslint-disable-next-line import/no-anonymous-default-export
export { FullPageModal };