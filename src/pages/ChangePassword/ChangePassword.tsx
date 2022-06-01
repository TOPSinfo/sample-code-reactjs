import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./ChangePassword.css";
import { useHistory, withRouter } from "react-router-dom";
import logo from "../../assets/img/tops.svg";
import UIFormGroup from "../../@theme/form";
import Container from "react-bootstrap/Container";
import UIInput from "../../@theme/input";
import UIButton from "../../@theme/button";
import {
  signOutUser,
  updatedPasswordError,
  updatePassword
} from "../../modules/actions";
import {
  getUserPasswordUpdateError,
  getUserPasswordUpdateState
} from "../../modules/selectors";
import { LoadingSpinner } from "../../@theme/LoadingSpinner";

const ChangePassword = () => {
  const passwordUpdateState = useSelector(getUserPasswordUpdateState);
  const updatePasswordError = useSelector(getUserPasswordUpdateError);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    renterPassword: "",
    password: "",
    message: "",
    showHidePassword: false
  });
  const [loginValidation, setError] = useState({
    password: "",
    renterPassword: ""
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const loginUser = (e: any) => {
    e.preventDefault();
    if (checkFormValidity()) {
      setIsLoading(true);
      dispatch(updatePassword(state.password));
      setError((val) => ({ ...val, userName: "", password: "" }));
    }
  };

  const handleInput = (e: any, label: string) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((val) => ({ ...val, [name]: value }));
    setError((val) => ({
      ...val,
      [name]: value.trim().length === 0 ? `${label} is required.` : ""
    }));
  };

  const checkFormValidity = () => {
    let formIsValid = true;
    if (state.password.length <= 0) {
      setError((val) => ({ ...val, password: "Password is required" }));
      formIsValid = false;
    }
    if (state.renterPassword.length <= 0) {
      setError((val) => ({
        ...val,
        renterPassword: "Confirm Password is required"
      }));
      formIsValid = false;
    }
    if (formIsValid && state.password !== state.renterPassword) {
      setError((val) => ({
        ...val,
        renterPassword: "Password and Confirm Password must match"
      }));
      formIsValid = false;
    }
    return formIsValid;
  };

  useEffect(() => {
    setIsLoading(false);
    console.log(updatePasswordError);
    if (passwordUpdateState) {
      history.push("/dashboard");
    } else if (updatePasswordError) {
      if (
        updatePasswordError ===
        "This operation is sensitive and requires recent authentication. Log in again before retrying this request."
      ) {
        dispatch(updatedPasswordError(""));
        dispatch(signOutUser());
        history.push("/login");
      }
      setIsLoading(false);
    }
  }, [passwordUpdateState, updatePasswordError, dispatch, history]);

  return (
    <>
      <div className='login-signup-screen'>
        <Row className='row no-gutters'>
          <Col className='login-form'>
            <UIFormGroup onSubmit={loginUser}>
              {isLoading && (
                <LoadingSpinner position={"absolute"} withCoverBg={true} />
              )}
              <div className='logo'>
                <img src={logo} alt='tops' />
              </div>
              <div className='login-form-content'>
                <h3>Change Password</h3>
                <Container className={"change-password-container"}>
                  <Row>
                    <Col
                      md={12}
                      xl={12}
                      lg={12}
                      sm={12}
                      xs={12}
                      className='mb-4'
                    >
                      <UIInput
                        type={"password"}
                        name={"password"}
                        label={"New Password"}
                        hasError={!!loginValidation.password}
                        errorText={loginValidation.password}
                        onChange={(e) => handleInput(e, "Password")}
                      />
                    </Col>
                    <Col
                      md={12}
                      xl={12}
                      lg={12}
                      sm={12}
                      xs={12}
                      className='mb-4'
                    >
                      <UIInput
                        type={"password"}
                        name={"renterPassword"}
                        onChange={(e) => handleInput(e, "Confirm Password")}
                        hasError={!!loginValidation.renterPassword}
                        errorText={loginValidation.renterPassword}
                        label={"Confirm New Password"}
                      />
                    </Col>
                    <Col>
                      <UIButton type={"submit"} label={"Change Password"} />
                    </Col>
                  </Row>
                </Container>
              </div>
            </UIFormGroup>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default withRouter(ChangePassword);
