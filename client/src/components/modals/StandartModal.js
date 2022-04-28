import React, { useEffect, createRef } from 'react'

export default function Modal({closeModal, closeClickOut, children}) {

    // Ref
    const modalRef = createRef()

    // Disable scroll when is oppen
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'unset';
    })

    // Check if the click is out the modal
    const checkIfOutModal = (e) => {
        if (closeClickOut && modalRef.current && modalRef.current === e.target) {
            closeModal()
        }
    }

    return (
        <>
            <div
                ref={modalRef}
                className='standart-modal'
                onClick={checkIfOutModal}
            >
                {children}
            </div>
        </>
    )
}