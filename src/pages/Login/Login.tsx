import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authUser, authLoginErrors } from "modules/actions";
import "./Login.scss";
import { withRouter } from "react-router-dom";
import { getLoginErrors } from "modules/selectors/user";
import logo from "assets/img/shared_studio.png";
import eyeSvg from "assets/img/icons/eye.svg";
import errorSvg from "assets/img/icons/error.svg";
import { useTranslation } from "react-i18next";
import { EmailPattern } from "modules/utils/commonFn";
// eslint-disable-next-line
const Login = (props: any) => {
  const keepSignedInValue = localStorage.getItem("keepmeSigned");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    userName: "",
    password: "",
    message: "",
    checked: JSON.parse(keepSignedInValue as string),
    showHidePassword: false
  });
  const [loginValidation, setError] = useState({
    userName: "",
    password: ""
  });
  const { t } = useTranslation();
  const error = useSelector(getLoginErrors);
  const dispatch = useDispatch();
  const loginUser = (e: any) => {
    e.preventDefault();
    if (checkFormValidity()) {
      const obj = {
        email: state.userName,
        password: state.password,
        keepSignedIn: state.checked
      };
      dispatch(authUser(obj));
      setError((val) => ({ ...val, userName: "", password: "" }));
      setLoading(true);
    }
  };

  useEffect(() => {
    if (error && error.length && loading) {
      setLoading(false);
    }
  }, [error, loading]);

  const handleInput = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((val) => ({ ...val, [name]: value }));
  };

  const renderMessage = () => {
    if (error && error.length) return <span className='error'>{error}</span>;
    else return null;
  };

  const checkFormValidity = () => {
    let formIsValid = true;
    if (state.userName.length <= 0) {
      setError((val) => ({ ...val, userName: "Email is required" }));
      formIsValid = false;
    }
    if (!EmailPattern.test(state.userName)) {
      setError((val) => ({
        ...val,
        userName: "Please enter a valid email address"
      }));
      formIsValid = false;
    } else
      setError((val) => ({
        ...val,
        userName: ""
      }));
    if (state.password.length <= 0) {
      setError((val) => ({ ...val, password: "Password is required" }));
      formIsValid = false;
    }
    dispatch(authLoginErrors(""));
    return formIsValid;
  };

  const showHidePassword = () =>
    setState((val) => ({ ...val, showHidePassword: !val.showHidePassword }));

  const checkUncheck = () => {
    localStorage.setItem("keepmeSigned", state.checked ? "false" : "true");
    setState((val) => ({ ...val, checked: !val.checked }));
  };

  const redirectToResetPass = () => props.history.push("/forgot-password");

  const setClassNameOnError =
    (error && error.length) ||
    (loginValidation.userName && loginValidation.userName.length)
      ? "custom-input error"
      : "custom-input";
  const showHideTextValue = state.showHidePassword ? "text" : "password";

  return (
    <>
      <div className='login-signup-screen'>
        <Row className='row no-gutters'>
          <Col className='login-form'>
            <Form className='form' onSubmit={loginUser}>
              <div className='logo'>
                <img src={logo} alt='tops' />
              </div>
              <div className='login-form-content'>
                <h3>{t("login.signin")}</h3>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label className='mb-2 custom-lable'>
                    {t("login.email")}
                  </Form.Label>
                  <Form.Control
                    className={setClassNameOnError}
                    value={state.userName}
                    type='text'
                    name='userName'
                    placeholder={t("login.email.placeholder")}
                    onChange={handleInput}
                    autoComplete='off'
                  />
                  {((error && error.length) ||
                    (loginValidation.userName &&
                      loginValidation.userName.length)) && (
                    <span className='custom-icon'>
                      <img src={errorSvg} alt='error' />
                    </span>
                  )}
                  {loginValidation.userName &&
                    loginValidation.userName.length && (
                      <span className='error'>{loginValidation.userName}</span>
                    )}
                </Form.Group>
                <Form.Group controlId='formBasicPassword'>
                  <Form.Label className='mb-2 custom-lable'>
                    {t("login.password")}
                  </Form.Label>
                  <Form.Control
                    className={setClassNameOnError}
                    value={state.password}
                    type={showHideTextValue}
                    name='password'
                    placeholder={t("login.password.placeholder")}
                    onChange={handleInput}
                    autoComplete='off'
                  />
                  <span
                    role='button'
                    onClick={showHidePassword}
                    className='custom-icon'
                  >
                    <img src={eyeSvg} alt='eye' className='icon-handler' />
                  </span>
                  {renderMessage()}
                  {loginValidation.password &&
                    loginValidation.password.length && (
                      <span className='error'>{loginValidation.password}</span>
                    )}
                </Form.Group>
                <div className='mb-4 mt-4 keep-forgot'>
                  <div className='custom-checkboxes'>
                    <input
                      aria-checked='false'
                      checked={state.checked}
                      type='checkbox'
                      name='remember'
                      id='remember'
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                    />
                    <label
                      role='button'
                      className='custom-lable'
                      onClick={checkUncheck}
                      htmlFor='remember'
                    >
                      {t("login.keepme")}
                    </label>
                  </div>
                  <span role='button' onClick={redirectToResetPass}>
                    {t("login.forgotpassword")}
                  </span>
                </div>
                <Button variant='primary' type='submit' className='button'>
                  {loading ? (
                    <Spinner
                      as='span'
                      animation='border'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                  ) : (
                    <span>{t("login.signin")}</span>
                  )}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default withRouter(Login);
