import React, { Component } from "react";
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { usersActions } from '../../actions'

class FeedbackModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: true,
            userMsg: '',
            feedbackSent: false
        }
    }

    // This modal gets called only when modal is getting close
    handleModal = () => {
        this.setState({ showModal: !this.state.showModal });
        if (!this.state.feedbackSent) {
            this.props.handleFeedbackModal();
        }
    }

    handleUserMsg = (event) => {
        if (this.state.validationMsg) delete this.state.validationMsg;
        this.setState({ userMsg: event.target.value });
    }

    handleSubmit = () => {
        if (this.state.userMsg.length) {
            this.props.sendFeedback(this.props.auth.username, this.props.auth.attributes.email, this.state.userMsg);

            this.setState({
                feedbackSent: true
            });

            /*  NOTE: Don't add setState in here, it will cause problem if user has already closed modal by clicking on cancel */
            setTimeout(() => {
                this.props.handleFeedbackModal();
            }, 2500);
        }
        else this.setState({ validationMsg: 'Please enter a message' });
    }

    render() {
        return (
            <Modal show={this.state.showModal} onHide={this.handleModal} className="modal_size">
                <Modal.Header>
                    <h4 class="modal-title">Send Feedback</h4>
                </Modal.Header>
                <Modal.Body>
                    {!this.state.feedbackSent ?
                        <div>
                            <textarea
                                rows={5}
                                className="feeback-textarea form-control"
                                value={this.state.userMsg}
                                placeholder="Describe your issue or share your ideas"
                                onChange={this.handleUserMsg}
                            />
                            {this.state.validationMsg ?
                                <div className="err">{this.state.validationMsg}</div> : null
                            }
                        </div>
                        :
                        <span>
                            "Thank you for your feedback!"
                        </span>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {!this.state.feedbackSent ? <Button className="btn btn-success" onClick={this.handleSubmit}>Submit</Button> : null}
                    <Button className="btn" onClick={this.handleModal} >Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

function mapStateToProps({ auth }) {
    return {
        auth: auth.profile
    };
}

export default connect(mapStateToProps, {
    sendFeedback: usersActions.sendFeedback
})(FeedbackModal);