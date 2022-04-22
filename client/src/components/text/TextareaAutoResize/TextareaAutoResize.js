import React, { useRef, useEffect } from 'react'

export default function TextareaAutoResize({text, setText}) {


    const textareaRef = useRef()

    useEffect(() => {
        textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = scrollHeight + "px";
    }, [text]);

    return (
        <textarea
            ref={textareaRef}
            name='text'
            value={text}
            className='textarea-auto-resize'
            placeholder='Votre publication...'
            onChange={(e) => setText(e.target.value)}
        />
    )
}
