import React from 'react'

export default function ArrowButton(props) {
    return (
        <button onClick={props.actionOnClick} className={`${props.childrenClassName} ${props.modalState ? 'active' : ''}`} />
    )
}