import React, {createRef} from 'react'

export default function MenuModal({children, closeModal}) {

        // Ref
        const modalRef = createRef()

    const checkIfOutModal = (e) => {
        if (modalRef.current && modalRef.current.contains(e.target)) {
            closeModal()
        }
    }

    return (
        <>
            <div
                ref={modalRef}
                onClick={checkIfOutModal}
                className='menu-modal'
            >
            </div>
            {children}

        </>
    )

}
