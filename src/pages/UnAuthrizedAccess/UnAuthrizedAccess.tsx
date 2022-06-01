import React from "react";
import { Col, Row } from "react-bootstrap";
import { withRouter, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UIButton } from "@theme";
import { signOutUser } from "../../modules/actions";
import styled from "styled-components";

const UnAuthrizedAccess = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <UnAuthorizedAccess className='unauthorized-screen'>
      <Row className='row no-gutters'>
        <Col className='' md={12} lg={12} sm={12}>
          <HilightedMessage1>403</HilightedMessage1>
          <HilightedMessage2>
            You are unauthorized to accesss.
          </HilightedMessage2>
        </Col>
        <Col className=' mt-4' md={12} lg={12} sm={12}>
          <UIButton
            type={"button"}
            label={"Back to Login "}
            onClick={() => {
              dispatch(signOutUser());
              history.push("/login");
            }}
          />
        </Col>
      </Row>
    </UnAuthorizedAccess>
  );
};
export default withRouter(UnAuthrizedAccess);
const HilightedMessage1 = styled.h1`
  font-size: 200px;
`;

const HilightedMessage2 = styled.h1`
  font-size: 40px;
`;

const UnAuthorizedAccess = styled.h1`
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100vh;
`;
