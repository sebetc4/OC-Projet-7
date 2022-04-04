import React from 'react';
import { gsap } from 'gsap';
import { lerp, getMousePos } from './scripts/utils';

export default class CursorP extends React.Component {
  constructor(props) {
    super(props);

    this.cursorRef = new React.createRef();
    
    this.mouse = { x: 0, y: 0 };
    window.addEventListener('mousemove', ev => this.mouse = getMousePos(ev));

    this.renderedStyles = {
      tx: { previous: 0, current: 0, amt: 0.2 },
      ty: { previous: 0, current: 0, amt: 0.2 },
      scale: { previous: 1, current: 1, amt: 0.2 },
      opacity: { previous: 1, current: 1, amt: 0.2 }
    };

    this.onMouseMoveEv = () => {
      this.renderedStyles.tx.previous = this.renderedStyles.tx.current = this.mouse.x - this.bounds.width / 2;
      this.renderedStyles.ty.previous = this.renderedStyles.ty.previous = this.mouse.y - this.bounds.height / 2;
      gsap.to(this.cursorRef.current, { duration: 0.9, ease: 'Power3.easeOut', opacity: 1 });
      requestAnimationFrame(() => this.renderJS());
      window.removeEventListener('mousemove', this.onMouseMoveEv);
    };
  }

  renderJS() {
    if(this.props.mouseOn) {
      this.renderedStyles['scale'].current = 4;
      this.renderedStyles['opacity'].current = 0.2;
    } else {
      this.renderedStyles['scale'].current = 1;
      this.renderedStyles['opacity'].current = 1;
    }

    this.renderedStyles['tx'].current = this.mouse.x - this.bounds.width / 2;
    this.renderedStyles['ty'].current = this.mouse.y - this.bounds.height / 2;
    for (const key in this.renderedStyles) {
      this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
    }
    this.cursorRef.current.style.transform = `translateX(${(this.renderedStyles['tx'].previous)}px) translateY(${this.renderedStyles['ty'].previous}px) scale(${this.renderedStyles['scale'].previous})`;
    this.cursorRef.current.style.opacity = this.renderedStyles['opacity'].previous;
    requestAnimationFrame(() => this.renderJS());
  }

  componentDidMount() {
    this.bounds = this.cursorRef.current.getBoundingClientRect();
    window.addEventListener('mousemove', this.onMouseMoveEv);
  }

  render() {
    return (
      <svg ref={this.cursorRef} className="cursor" width="25" height="25" viewBox="0 0 25 25">
        <circle className="cursor__inner" cx="12.5" cy="12.5" r="6.25" />
      </svg>
    )
  }
}
