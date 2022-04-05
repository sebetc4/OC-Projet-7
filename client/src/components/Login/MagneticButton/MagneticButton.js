import React from 'react';

const lerp = (a, b, n) => (1 - n) * a + n * b;

const distance = (x1,y1,x2,y2) => {
    var a = x1 - x2;
    var b = y1 - y2;

    return Math.hypot(a,b);
}

export default class Button extends React.Component {
    constructor(props) {
        super(props);

        this.refButton = React.createRef();
        this.refText = React.createRef();
        this.refTextinner = React.createRef();
        this.refDecoTop = React.createRef();
        this.refDecoBottom = React.createRef();

        // amounts the button will translate/scale
        this.renderedStyles = {
            tx: { previous: 0, current: 0, amt: 0.1 },
            ty: { previous: 0, current: 0, amt: 0.1 },
            tx2: { previous: 0, current: 0, amt: 0.05 },
            ty2: { previous: 0, current: 0, amt: 0.05 }
        };

        // button state (hover)
        this.stateH = {
            hover: false
        };
    }

    calculateSizePosition() {
        // size/position
        this.rect = this.refButton.current.getBoundingClientRect();
        // the movement will take place when the distance from the mouse to the center of the button is lower than this value
        this.distanceToTrigger = this.rect.width * 1.5;
    }

    initEvents() {
        this.onResize = () => this.calculateSizePosition();
        window.addEventListener('resize', this.onResize);
    }

    loopEffect() {
        if (this.refButton.current!== null || this.refText.current !== null || this.refTextinner.current !== null || this.refDecoTop.current !== null || this.refDecoBottom.current !== null) {
            // calculate the distance from the mouse to the center of the button
            const distanceMouseButton = distance(this.props.mousePos.x + window.scrollX, this.props.mousePos.y + window.scrollY, this.rect.left + this.rect.width / 2, this.rect.top + this.rect.height / 2);
            // new values for the translations and scale
            let x = 0;
            let y = 0;

            if (distanceMouseButton < this.distanceToTrigger) {
                if (!this.stateH.hover) {
                    this.enter();
                }
                x = (this.props.mousePos.x + window.scrollX - (this.rect.left + this.rect.width / 2)) * .3;
                y = (this.props.mousePos.y + window.scrollY - (this.rect.top + this.rect.height / 2)) * .3;
            }
            else if (this.stateH.hover) {
                this.leave();
            }

            this.renderedStyles['tx'].current = this.renderedStyles['tx2'].current = x;
            this.renderedStyles['ty'].current = this.renderedStyles['ty2'].current = y;

            for (const key in this.renderedStyles) {
                this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
            }

            this.refDecoTop.current.style.transform = `translate3d(${this.renderedStyles['tx'].previous}px, ${this.renderedStyles['ty'].previous}px, 0)`;
            this.refDecoBottom.current.style.transform = `translate3d(${this.renderedStyles['tx2'].previous}px, ${this.renderedStyles['ty2'].previous}px, 0)`;
            this.refText.current.style.transform = `translate3d(${this.renderedStyles['tx'].previous * 0.5}px, ${this.renderedStyles['ty'].previous * 0.5}px, 0)`;

            requestAnimationFrame(() => this.loopEffect());
        }

    }

    enter() {
        this.stateH.hover = true;
        this.refButton.current.classList.add('login-button--hover');
        this.props.mouseOn(true)
    }

    leave() {
        this.stateH.hover = false;
        this.refButton.current.classList.remove('login-button--hover');
        this.props.mouseOn(false)
    }

    componentDidMount() {
        // calculate size/position
        this.calculateSizePosition();
        // init events
        this.initEvents();
        // loop fn
        this.loopEffect();
    }

    render() {
        return (
            <button
                ref={this.refButton}
                className="login-button "
                onClick={this.props.handleModal}
            >
                <div ref={this.refDecoBottom} className="login-button__deco login-button__deco--2"></div>
                <div ref={this.refDecoTop} className="login-button__deco login-button__deco--1"></div>
                <span ref={this.refText} className="login-button__text">
                    <span ref={this.refTextinner} className="login-button__text-inner">{this.props.texte}</span>
                </span>
            </button>
        )
    }
}
