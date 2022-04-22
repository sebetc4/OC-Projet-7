import React, { useEffect, createRef } from 'react'

export default function Modal(props) {

    // Ref
    const modalRef = createRef()

    // Disable scroll when is oppen
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'unset';
    })

    // Check if the click is out the modal
    const checkIfOutModal = (e) => {
        if (modalRef.current && modalRef.current === e.target) {
            props.closeModal()
        }
    }

    return (
        <>
            <div
                ref={modalRef}
                className='standart-modal'
                onClick={props.closeClickOut && checkIfOutModal}
            >
                {props.children}
            </div>
        </>
    )
}