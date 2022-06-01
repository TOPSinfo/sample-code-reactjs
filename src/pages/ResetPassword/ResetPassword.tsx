import React, { useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import {
  sendMailToResetPassword,
  authPasswordResetErrors
} from "modules/actions";
import { useDispatch, useSelector } from "react-redux";
import "pages/Login/Login.scss";
import { getResetPasswordErrors } from "modules/selectors/user";
import { LoginRightPanel } from "@theme";
import logo from "assets/img/icons/tops-logo.svg";
import { useTranslation } from "react-i18next";
import { EmailPattern } from "../../@theme/commonfile";

// eslint-disable-next-line
const ResetPassword = () => {
  const [state, setState] = useState({
    email: ""
  });
  const [forgetPassValidation, setError] = useState({
    email: ""
  });
  const error = useSelector(getResetPasswordErrors);
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const resetPassword = (e: any) => {
    e.preventDefault();
    if (checkFormValidity()) {
      const obj = { email: state.email };
      setError((val) => ({ ...val, email: "" }));
      dispatch(sendMailToResetPassword(obj));
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

  const redirectToLogin = () => {
    history.push("/login");
  };

  const checkFormValidity = () => {
    let formIsValid = true;
    if (state.email.length <= 0) {
      setError((val) => ({ ...val, email: "Email is required" }));
      formIsValid = false;
    } else if (!EmailPattern.test(state.email)) {
      setError((val) => ({
        ...val,
        email: "Please enter a valid email address"
      }));
      formIsValid = false;
    }
    dispatch(authPasswordResetErrors(""));
    return formIsValid;
  };

  return (
    <div className='login-signup-screen'>
      <Row>
        <Col>
          <Form className='form login-form' onSubmit={resetPassword}>
            <div className='logo'>
              <img src={logo} alt='tops' />
            </div>
            <div className='login-form-content'>
              <h3>{t("resetPassword.title")}</h3>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label className='mb-2 custom-lable'>
                  {t("resetPassword.email")}
                </Form.Label>
                <Form.Control
                  className='custom-input'
                  value={state.email}
                  type='text'
                  name='email'
                  placeholder={t("resetPassword.email.placeholder")}
                  onChange={handleInputChange}
                  autoComplete='off'
                />
              </Form.Group>
              <Button variant='primary' type='submit' className='button'>
                {t("resetPassword.resetbtn")}
              </Button>
              <div className='mb-4 mt-4 keep-forgot'>
                <label className='custom-lable'>
                  {t("resetPassword.label")} &nbsp;
                  <span> {t("resetPassword.resend")}</span>
                </label>
                <span role='button' onClick={redirectToLogin}>
                  {t("resetPassword.backtoSignIn")}
                </span>
              </div>
              {renderMessage()}
              {forgetPassValidation.email &&
                forgetPassValidation.email.length && (
                  <span className='error'>{forgetPassValidation.email}</span>
              )}
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

export default withRouter(ResetPassword);
