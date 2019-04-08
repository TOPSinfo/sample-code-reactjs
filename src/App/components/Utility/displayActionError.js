import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class DisplayActionError extends Component {
    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.handleClose} className="modal_size custom-modal">
                <Modal.Header>
                    <Modal.Title>Oops!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span className="errMsg">{this.props.errMsg}</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-danger" onClick={this.props.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default DisplayActionError;