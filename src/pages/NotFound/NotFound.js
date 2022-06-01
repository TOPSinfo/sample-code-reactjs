import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import WaveSvg from "./Wave";
import "./NotFound.scss";

function NotFound() {
  return (
    <Container fluid className='p-0 vh-100'>
      <div className='error-page'>
        <div className='error-page-wave error-page-wave-top-right'>
          <WaveSvg />
        </div>
        <div className='error-page-wave error-page-wave-bottom-left'>
          <WaveSvg />
        </div>
        <div className='error-page-wrapper'>
          <Row className='error-page-title'>
            <Col>4</Col>
            <Col className='p-0'>
              <img
                alt='Copado Logo'
                className='error-page-logo'
                src='/images/copado/logo/copado-symbol/copado-symbol.svg'
              />
            </Col>
            <Col>4</Col>
          </Row>
          <div className='error-page-description'>Page Not Found</div>
          <div className='error-page-redirect'>
            <Link className='error-page-link' to='/lobby'>
              Click here
            </Link>{" "}
            to be redirected to the lobby.
          </div>
        </div>
      </div>
    </Container>
  );
}

export default NotFound;
