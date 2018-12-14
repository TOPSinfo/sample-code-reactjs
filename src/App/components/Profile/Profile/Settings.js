import React, { Component } from 'react';
import { FormGroup, Form, Col, Button, ControlLabel, FormControl } from 'react-bootstrap';
import Authentication from '../../../../Auth/authentication';
import "./Profile.css"

class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            validationError: false,
            validationErrorMsg: '',
            showSuccessMsg: false,
            errors: {}
        }

    }

    handlePasswordSubmit = async event => {
        event.preventDefault();

        if (this.validatePasswords()) {
            let result = await Authentication.changePassword(this.state.currentPassword, this.state.confirmPassword);
            console.log("result",result);
            let errors = {};
            if(result.code === "InvalidParameterException"){
                errors['currentPassword'] = `Current Password is not in correct format.`;
                this.setState({ errors: errors });
            }else if(result.code === "NotAuthorizedException"){
                errors['currentPassword'] = `Incorrect current password.`;
                this.setState({ errors: errors });
            }else if(result.code === "LimitExceededException"){
                errors['commonError'] = `Limit is exceeded. Please try again after some time.`;
                this.setState({ errors: errors });
            }else{
                this.resetPasswordData();
                this.setState({showSuccessMsg: true });
                setTimeout(() => {
                  this.setState({ showSuccessMsg: false })
                },3000)
            }
        }
    }

    validatePasswords = () => {
        let formIsValid = true;
        let errors = {};
        if (!this.state.currentPassword) {
          formIsValid = false;
          errors['currentPassword'] = `Current password can't be empty`;
        }
        if (!this.state.newPassword) {
          formIsValid = false;
          errors['password'] = `Password can't be empty`;
        }
        if (!this.state.confirmPassword) {
          formIsValid = false;
          errors['confirmPassword'] = `Confirm Password can't be empty`;
        }
        if (this.state.newPassword.length && this.state.confirmPassword.length) {
            if (this.state.newPassword !== this.state.confirmPassword) {
                formIsValid = false;
                errors['confirmPassword'] = `Password does not match`;
            } else if (this.state.newPassword === this.state.currentPassword) {
                formIsValid = false;
                errors['repeatSamePassword'] = `Current password and the new password should not be the same.`;
            }else {
            let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,99}$/;
            if (!this.state.newPassword.match(regex)) {
              formIsValid = false;
              errors['password'] = `Password must have a number, a special character, an uppercase and a lower case character. (Min length 6).`;
            }
          }
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

   /* validatePasswords = () => {
        let errString = null;
        var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,99}$/;

        if (this.state.currentPassword.length === 0 || this.state.newPassword.length === 0 || this.state.confirmPassword.length === 0) {
            errString = "Enter password!";
        } else if (!this.state.newPassword.match(regex)) {
            errString = "Incorrect password format"
        } else if (this.state.newPassword !== this.state.confirmPassword) {
            errString = "NewPassword and ConfirmPassword are not same!"
        }

        if (errString) {
            this.setState({
                validationErrorMsg: errString,
                validationError: true
            })
            return false;
        }

        return true;
    }*/

    handleInputChange = (event) => {
        let updateObject = {
            [event.target.id]: event.target.value
        }

        // Reset the validationError
        if (this.state.validationError) {
            updateObject.validationError = false;
            updateObject.validationErrorMsg = '';
        }

        this.setState(updateObject);
    }

    resetPasswordData = () => {
        this.setState({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    }

    render() {
        return (
            <Form horizontal onSubmit={this.handlePasswordSubmit} >
                <FormGroup>
                    <Col smOffset={5} sm={7}>
                        <span style={{ color: "red" }}>{this.state.errors["commonError"]}</span>
                    </Col>
                </FormGroup>
                <FormGroup controlId="currentPassword">
                    <Col componentClass={ControlLabel} sm={5}>CurrentPassword</Col>
                    <Col sm={7}>
                        <FormControl type="password" value={this.state.currentPassword} onChange={this.handleInputChange} />
                        <span style={{ color: "red" }}>{this.state.errors["currentPassword"]}</span>
                    </Col>
                </FormGroup>

                <FormGroup controlId="newPassword">
                    <Col componentClass={ControlLabel} sm={5}>NewPassword</Col>
                    <Col sm={7}>
                        <FormControl type="password" value={this.state.newPassword} onChange={this.handleInputChange} />
                        <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                    </Col>
                </FormGroup>
                <FormGroup controlId="confirmPassword">
                    <Col componentClass={ControlLabel} sm={5}>ConfirmPassword</Col>
                    <Col sm={7}>
                        <FormControl type="password" value={this.state.confirmPassword} onChange={this.handleInputChange} />
                        {this.state.validationError ? <h6 className="error"> {this.state.validationErrorMsg}</h6> : null}
                        <span style={{ color: "red" }}>{this.state.errors["confirmPassword"]}</span>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={5} sm={7}>
                        <Button type="submit">Submit</Button>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col smOffset={5} sm={7}>
                        <span style={{ color: "red" }}>{this.state.errors["repeatSamePassword"]}</span>
                    </Col>
                </FormGroup>
                {
                    (this.state.showSuccessMsg)?
                        <FormGroup>
                            <Col smOffset={5} sm={7}>
                                <span className="password-msg">Password changed successfully.</span>
                            </Col>
                        </FormGroup>
                    :
                    null
                }
            </Form>
        )
    }
}

export default Settings;