import React, {createRef} from 'react'

export default function MenuModal(props) {

        // Ref
        const modalRef = createRef()

    const checkIfOutModal = (e) => {
        if (modalRef.current && modalRef.current === e.target) {
            props.closeModal()
        }

    }

    return (
        <>
            <div
                ref={modalRef}
                className='menu-modal'
                onClick={checkIfOutModal}
            >
                {props.children}
            </div>
        </>
    )

}
