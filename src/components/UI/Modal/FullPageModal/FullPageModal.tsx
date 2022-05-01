import React, { useState } from 'react'
import { useModal } from 'src/context/ModalProvider';
import "./FullPageModal.css";

function FullPageModal({ children }) {
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

export { FullPageModal };