import React from "react";
import { UICheckbox, UIRadio, UIInput } from "@theme";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import info from "assets/img/icons/ic-info.svg";
const Content: React.FC = () => {
  return (
    <>
      <Row>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
          <label className='label-info mb-1'>
            <span>Presentations, videos and contents</span>{" "}
            <img src={info} alt='info' />
          </label>
          <UIInput
            label=''
            placeholder='Select contents'
            type='text'
            inputIcon={"icon-moon icon-ic-search"}
          />
        </Col>
      </Row>

      <Row>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
          <label className='label-info mb-3'>Record Session</label>
          <UICheckbox
            label='Automatically record meeting in this room'
            name='team-admin'
            position='after'
          />
          <div>
            <div className='subsectionbox'>
              <label className='label-info mt-3 mb-3'>
                Make it available for replay
              </label>
              <UICheckbox
                label='In content delivery kiosks'
                name='team-admin'
                position='after'
              />
              <div className='subsectionbox mb-3'>
                <UIInput
                  label=''
                  placeholder='Select kiosks'
                  type='text'
                  inputIcon={"icon-moon icon-ic-search"}
                />
              </div>
              <UICheckbox
                label='When accessing this room from the agenda'
                name='team-admin'
                position='after'
              />
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
          <UIInput
            label='Post-session survey'
            placeholder='select from content library of orgID'
            type='text'
            inputIcon={"icon-moon icon-ic-search"}
          />
        </Col>
      </Row>

      <Row>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
          <div className='disabled-section'>
            <UIRadio
              label='Trigger the survey when participants exit the session'
              name='team-admin'
            />
            <div className='subsectionbox mt-3 mb-3'>
              <UICheckbox
                label='Make it optional and email it to participants who didn’t fill it out'
                name='team-admin'
                position='after'
              />
            </div>

            <UIRadio label='Send it by email' name='team-admin' />
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
          <div className='disabled-section'>
            <UICheckbox
              label='Do not ask special persons of this session'
              name='team-admin'
              position='after'
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Content;
