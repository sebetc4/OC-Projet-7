import React from 'react'

export default function Modal(props) {

    const modalRef = React.createRef()

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