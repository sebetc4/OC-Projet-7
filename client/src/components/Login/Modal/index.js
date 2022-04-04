import React, { Component } from 'react'

export default class Modal extends Component {
    constructor(props) {
        super(props)
        this.modalRef = React.createRef()
    }

    checkIfOutModal = (e) => {
        if (this.modalRef.current && this.modalRef.current === e.target) {
            this.props.handleModal()
        }
    }

    render() {
        return (
            <div
                ref={this.modalRef}
                className='login-modale'
                onClick={this.checkIfOutModal}
            >
                {this.props.children}
            </div>
        )
    }
}