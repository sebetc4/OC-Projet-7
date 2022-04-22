import React, { useEffect, useState } from 'react';

const lerp = (a, b, n) => (1 - n) * a + n * b;

const distance = (x1, y1, x2, y2) => {
    var a = x1 - x2;
    var b = y1 - y2;

    return Math.hypot(a, b);
}

export default function Button(props) {

    const [rect, setRect] = useState(null)
    const [distanceToTrigger, setDistanceToTrigger] = useState(null)
    const [hover, setHover] = useState(false)

    const refButton = React.createRef();
    const refText = React.createRef();
    const refTextinner = React.createRef();
    const refDecoTop = React.createRef();
    const refDecoBottom = React.createRef();

    // amounts the button will translate/scale
    let renderedStyles = {
        tx: { previous: 0, current: 0, amt: 0.1 },
        ty: { previous: 0, current: 0, amt: 0.1 },
        tx2: { previous: 0, current: 0, amt: 0.05 },
        ty2: { previous: 0, current: 0, amt: 0.05 }
    };

    useEffect(() => {
        setRect(refButton.current.getBoundingClientRect())
        // loop fn
    }, [])

    useEffect(() => {
        rect && setDistanceToTrigger(rect.width * 1.5)
    }, [rect])

    useEffect(() => {
        distanceToTrigger && loopEffect();
    }, [distanceToTrigger])

    // useEffect(() => {
    //     const onResize = () => this.calculateSizePosition();
    //     window.addEventListener('resize', onResize);
    // })

    const loopEffect = () => {
        if (refButton.current !== null || refText.current !== null || refTextinner.current !== null || refDecoTop.current !== null || refDecoBottom.current !== null) {
            // calculate the distance from the mouse to the center of the button
            const distanceMouseButton = distance(props.mousePos.x + window.scrollX, props.mousePos.y + window.scrollY, rect.left + rect.width / 2, rect.top + rect.height / 2);
            // new values for the translations and scale
            let x = 0;
            let y = 0;

            if (distanceMouseButton < distanceToTrigger) {
                if (hover) {
                    enter();
                }
                x = (props.mousePos.x + window.scrollX - (rect.left + rect.width / 2)) * .3;
                y = (props.mousePos.y + window.scrollY - (rect.top + rect.height / 2)) * .3;
            }
            else if (hover) {
                leave();
            }

            renderedStyles['tx'].current = renderedStyles['tx2'].current = x;
            renderedStyles['ty'].current = renderedStyles['ty2'].current = y;

            for (const key in renderedStyles) {
                renderedStyles[key].previous = lerp(renderedStyles[key].previous, renderedStyles[key].current, renderedStyles[key].amt);
            }

            refDecoTop.current.style.transform = `translate3d(${renderedStyles['tx'].previous}px, ${renderedStyles['ty'].previous}px, 0)`;
            refDecoBottom.current.style.transform = `translate3d(${renderedStyles['tx2'].previous}px, ${renderedStyles['ty2'].previous}px, 0)`;
            refText.current.style.transform = `translate3d(${renderedStyles['tx'].previous * 0.5}px, ${renderedStyles['ty'].previous * 0.5}px, 0)`;

            requestAnimationFrame(() => loopEffect());
        }
    }

    const enter = () => {
        setHover(true);
        refButton.current.classList.add('login-button--hover');
        props.mouseOn()
    }

    const leave = () => {
        setHover(false);
        refButton.current.classList.remove('login-button--hover');
        props.mouseOut()
    }

    return (
        <button
            ref={refButton}
            className="login-button "
            onClick={props.handleModal}
        >
            <div ref={refDecoBottom} className="login-button__deco login-button__deco--2"></div>
            <div ref={refDecoTop} className="login-button__deco login-button__deco--1"></div>
            <span ref={refText} className="login-button__text">
                <span ref={refTextinner} className="login-button__text-inner">{props.texte}</span>
            </span>
        </button>
    )

}
