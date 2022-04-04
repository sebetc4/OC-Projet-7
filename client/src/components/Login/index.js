import CanvasLogo from './CanvasLogo'
import React, { Component } from 'react';
import Button from "./Button";
import { gsap } from "gsap";
import { FormSignUp, FormSignIn } from './Form';

import Modal from './Modal';
import Svg from './Svg';


// import Cursor from './Cursor/Cursor';

export default class Log extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mousePos: {
                x: 0,
                y: 0
            },
            backgroundColor: {
                l: 80
            },
            mouseOn: {
                buttonSignIn: false,
                buttonSignUp: false
            },
            modal: {
                signUp: false,
                signIn: false
            }
        }

        // Valeurs de couleur de fond
        this.actualValue = { l: 0 }
        this.lastValue = 0
    }

    getMousePosition = (e) => {
        if (this.state.modal.signIn === false && this.state.modal.signUp === false) {
            this.setState({
                mousePos: {
                    x: e.clientX,
                    y: e.clientY
                }
            });
        }
    }


    // Gestion des boutons
    mouseOnButtonSignIn = (state) => {
        if (state) {
            this.initModifyBackgroundColor(65)
        } else {
            this.initModifyBackgroundColor(80)
        }
        this.setState({ buttonLogin: { mouseOn: state } })
    }

    mouseOnButtonSignUp = (state) => {
        if (state) {
            this.initModifyBackgroundColor(65)
        } else {
            this.initModifyBackgroundColor(80)
        }
        this.setState({
            buttonSignUp: {
                mouseOn: state
            }
        })
    }

    // Gestion des modales
    handleModal = (state) => {
        switch (state) {
            case 1:
                console.log('test')
                this.setState({
                    modal:
                    {
                        signIn: true,
                        signUp: false
                    }
                });
                break;
            case -1:
                this.setState({
                    modal:
                    {
                        signIn: false,
                        signUp: true
                    }
                });
                break;
            default:
                this.setState({
                    modal:
                    {
                        signIn: false,
                        signUp: false
                    }
                });
        }
    }

    // Modification du la couleur de fond
    initModifyBackgroundColor = (value) => {
        this.actualValue.l = this.state.backgroundColor.l
        gsap.to(this.actualValue, { l: value, duration: 0.3, onUpdate: this.checkNewBackgroundColor })
    }

    checkNewBackgroundColor = () => {
        let roundActualValue = Math.round(this.actualValue.l)
        if (roundActualValue !== this.lastValue) {
            this.lastValue = roundActualValue;
            this.setBackgroundColor(roundActualValue)
        }
    }

    setBackgroundColor = (value) => {
        this.setState({
            backgroundColor: {
                l: value
            }
        })
    }

    render() {
        return (
            <div
                onMouseMove={(e) => { this.getMousePosition(e) }}
                className="login"
                style={{ background: `radial-gradient(hsl(0, 0%, ${this.state.backgroundColor.l}%), hsl(0, 0%, ${this.state.backgroundColor.l * 0.2}%))` }}>
                <CanvasLogo
                    mouseOnLogin={this.state.mouseOn.buttonSignIn}
                    mouseOnSignUp={this.state.mouseOn.buttonSignUp}
                    mousePos={this.state.mousePos}
                />
                <div className='login-svg-container'>
                    <Svg />
                </div>
                <div className='login-button-container'>
                    <Button
                        texte={"Connexion"}
                        mousePos={this.state.mousePos}
                        handleModal={() => this.handleModal(1)}
                        mouseOn={this.mouseOnButtonSignIn}
                    />
                    <Button
                        texte={"Inscription"}
                        mousePos={this.state.mousePos}
                        handleModal={() => this.handleModal(-1)}
                        mouseOn={this.mouseOnButtonSignUp} />
                </div>

                {this.state.modal.signUp &&
                    <Modal handleModal={() => { this.handleModal(0) }}>
                        <FormSignUp handleModal={() => { this.handleModal(1) }} />
                    </Modal>
                }
                {this.state.modal.signIn &&
                    <Modal handleModal={() => { this.handleModal(0) }}>
                        <FormSignIn handleModal={() => { this.handleModal(-1) }} />
                    </Modal>
                }
                {/* <Cursor 
                    ref={this.refCursor} 
                    mouseOn={ this.state.buttonLogin.mouseOn || this.state.buttonSignUp.mouseOn } /> */}
            </div>
        )
    }
}