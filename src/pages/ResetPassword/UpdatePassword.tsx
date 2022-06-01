import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import "pages/Login/Login.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserPasswordUpdateError,
  getUserPasswordUpdateState
} from "modules/selectors/user";
import { updatePassword } from "modules/actions";
import { useTranslation } from "react-i18next";
import { LoginRightPanel } from "@theme";
import logo from "assets/img/tops.svg";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const error = useSelector(getUserPasswordUpdateError);
  const isPasswordSet = useSelector(getUserPasswordUpdateState);
  const history = useHistory();
  const { t } = useTranslation();
  const [state, setState] = useState({
    newPassword: "",
    reEnterPassword: ""
  });
  const [updatePassValidation, setError] = useState({
    newPassword: "",
    reEnterPassword: ""
  });

  useEffect(() => {
    if (isPasswordSet) {
      history.push("/dashboard");
    }
  }, [isPasswordSet, history]);

  const updatePass = (e: any) => {
    e.preventDefault();
    if (checkFormValidity()) {
      dispatch(updatePassword(state.newPassword));
    }
  };

  const handleInputChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((_val) => ({ ..._val, [name]: value }));
  };

  const renderMessage = () => {
    if (error && error.length) {
      return <span className='error'>{error}</span>;
    } else {
      return null;
    }
  };

  const checkFormValidity = () => {
    let formIsValid = true;
    if (state.newPassword.length <= 0) {
      setError((val) => ({ ...val, newPassword: "New Password is required" }));
      formIsValid = false;
    }
    if (state.reEnterPassword.length <= 0) {
      setError((val) => ({
        ...val,
        reEnterPassword: "Confirm Password is required"
      }));
      formIsValid = false;
    }
    if (state.reEnterPassword.length <= 0) {
      setError((val) => ({
        ...val,
        reEnterPassword: "Confirm Password is required"
      }));
      formIsValid = false;
    }
    if (state.newPassword !== state.reEnterPassword) {
      setError((val) => ({
        ...val,
        reEnterPassword: "Password Mismatched"
      }));
      formIsValid = false;
    }
    return formIsValid;
  };

  return (
    <div className='login-signup-screen'>
      <Row>
        <Col>
          <Form className='form login-form' onSubmit={updatePass}>
            <div className='logo'>
              <img src={logo} alt='tops' />
            </div>
            <div className='login-form-content'>
              <h3>{t("updatePassword.title")}</h3>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label className='mb-2 custom-lable'>
                  {t("updatePassword.passwordTitle")}
                </Form.Label>
                <Form.Control
                  className='custom-input'
                  value={state.newPassword}
                  type='password'
                  name='newPassword'
                  placeholder={t("updatePassword.passwordTitle.placeholder")}
                  onChange={handleInputChange}
                />

                {updatePassValidation.newPassword &&
                  updatePassValidation.newPassword.length && (
                    <span className='error'>
                      {updatePassValidation.newPassword}
                    </span>
                )}
              </Form.Group>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label className='mb-2 custom-lable'>
                  {t("updatePassword.reTypePassword")}
                </Form.Label>
                <Form.Control
                  className='custom-input'
                  value={state.reEnterPassword}
                  type='password'
                  name='reEnterPassword'
                  placeholder={t("updatePassword.reTypePassword.placeholder")}
                  onChange={handleInputChange}
                />

                {updatePassValidation.reEnterPassword &&
                  updatePassValidation.reEnterPassword.length && (
                    <span className='error'>
                      {updatePassValidation.reEnterPassword}
                    </span>
                )}
              </Form.Group>
              {renderMessage()}
              <Button variant='primary' type='submit' className='button'>
                {t("updatePassword.updateBtn")}
              </Button>
            </div>
          </Form>
        </Col>
        <Col>
          <LoginRightPanel resetComponent />
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(UpdatePassword);
