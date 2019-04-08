import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class confirmAction extends Component {
    render() {
        return (
            <Modal show={this.props.showModal} onHide={e => this.props.handleClose('No')} className="modal_size custom-modal">
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span className="errMsg">{this.props.msg}</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-danger" onClick={e => this.props.handleClose('yes')}>Yes</Button>
                    <Button className="btn btn-danger" onClick={e => this.props.handleClose('No')}>No</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default confirmAction;