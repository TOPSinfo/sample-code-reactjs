import React from "react";
import { UICheckbox, UIRadio, UITextArea } from "@theme";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToolTip } from "components";
const Content2: React.FC = () => {
  return (
    <>
      <Row>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
          <span>Thumbnail</span> <ToolTip infoText='helloou' />
          <UIRadio
            placeholder='Default thumbnail for meeting rooms'
            position='after'
            label='Default thumbnail for meeting rooms'
            name='text-box'
          />
          <UIRadio
            placeholder='This image'
            position='after'
            label='This image'
            name='text-box'
          />
        </Col>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
          <div className='image-selected-tags'>kishan</div>
        </Col>
        <UIRadio
          placeholder='Live view of the room'
          position='after'
          label='Live view of the room'
          name='text-box'
        />
      </Row>

      <Row>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
          <span>Before the session starts</span>{" "}
          <ToolTip infoText='If this room is moderated, you can define what attendees will see and hear while waiting for the session to start' />
          <div>
            <span>Play this sound file</span>{" "}
            <div className='image-selected-tags'>kishan</div>
          </div>
          <div>
            <span>Show this background image</span>{" "}
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
          <UICheckbox
            label='Also display this message'
            name='team-admin'
            position='after'
          />
        </Col>
      </Row>

      <Row>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
          <UITextArea
            placeholder='Please wait, this session will start soon.'
            showCount
            maxLength={100}
            name='about'
          />
        </Col>
      </Row>
    </>
  );
};
export default Content2;
