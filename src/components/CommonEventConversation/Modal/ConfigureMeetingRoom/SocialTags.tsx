import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { UICheckbox, UIFormGroup, UIInput } from "@theme";
import { useDispatch, useSelector } from "react-redux";
import { set, get } from "lodash";
import cloneDeep from "lodash/cloneDeep";
import * as selectors from "modules/selectors";
import * as actions from "modules/actions";
import styled from "styled-components";
import PerfectScrollbar from "react-perfect-scrollbar";
export const SocialTags: React.FC = () => {
  const dispatch = useDispatch();
  const eventData = useSelector(selectors.getEventComponentData);
  const [social, setSocial] = useState({
    isFacebook: false,
    isTwitter: false,
    isLinkedin: false,
    isYoutube: false,
    isInstagram: false
  });

  useEffect(() => {
    if (eventData && eventData.social) {
      setSocial((val) => ({
        ...val,
        isFacebook: val.isFacebook || get(eventData.social, "facebook", false),
        isTwitter: val.isTwitter || get(eventData.social, "twitter", false),
        isLinkedin: val.isLinkedin || get(eventData.social, "linkedin", false),
        isYoutube: val.isYoutube || get(eventData.social, "youtube", false),
        isInstagram:
          val.isInstagram || get(eventData.social, "instagram", false)
      }));
    }
  }, [eventData]);

  const handleFields = (e: any, path: string) => {
    const target: any = e.target;
    const value = target.value;
    const state = cloneDeep(eventData);
    set(state, path, value);
    dispatch(actions.createEventComponentActions(state));
  };

  const updateChecked = (e: any) => {
    const name = e.target.name;
    const value = e.target.checked;

    setSocial((val) => ({ ...val, [name]: value }));
  };

  return (
    <ScrollBar>
    <UIFormGroup
      onSubmit={(e) => e.preventDefault()}
      className='overview-wrapper welcome-config'
    >
      <Row>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
          <UIInput
            label='Social label'
            placeholder='Social label'
            type='text'
            name={"label"}
            value={get(eventData, "social.label", "")}
            onChange={(e) => {
              handleFields(e, "social.label");
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col
          md={1}
          xl={1}
          lg={1}
          sm={12}
          xs={12}
          className='mb-4 d-flex align-items-center justify-content-center mt-3'
        >
          <UICheckbox
            label=' '
            onChange={(e) => {
              updateChecked(e);
              if (!e.target.checked) {
                const state = cloneDeep(eventData);
                if (state && state.social && state.social.facebook) {
                  delete state.social.facebook;
                  dispatch(actions.createEventComponentActions(state));
                }
              }
            }}
            name='isFacebook'
            isChecked={social.isFacebook}
          />
        </Col>
        <Col md={5} xl={5} lg={5} sm={12} xs={12} className='mb-4'>
          <UIInput
            label='Facebook'
            placeholder='Enter Facebook URL'
            type='text'
            name={"facebook"}
            value={get(eventData, "social.facebook", "")}
            disabled={!social.isFacebook}
            onChange={(e) => {
              if (social.isFacebook) {
                handleFields(e, "social.facebook");
              }
            }}
          />
        </Col>
        <Col
          md={1}
          xl={1}
          lg={1}
          sm={12}
          xs={12}
          className='mb-4 d-flex align-items-center justify-content-center mt-3'
        >
          <UICheckbox
            label=' '
            onChange={(e) => {
              updateChecked(e);
              if (!e.target.checked) {
                const state = cloneDeep(eventData);
                if (state && state.social && state.social.twitter)
                  delete state.social.twitter;
                dispatch(actions.createEventComponentActions(state));
              }
            }}
            name='isTwitter'
            isChecked={social.isTwitter}
          />
        </Col>
        <Col md={5} xl={5} lg={5} sm={12} xs={12} className='mb-4'>
          <UIInput
            label='Twitter'
            placeholder='Enter Twitter URL'
            type='text'
            name={"twitter"}
            value={get(eventData, "social.twitter", "")}
            disabled={!social.isTwitter}
            onChange={(e) => {
              if (social.isTwitter) {
                handleFields(e, "social.twitter");
              }
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col
          md={1}
          xl={1}
          lg={1}
          sm={12}
          xs={12}
          className='mb-4 d-flex align-items-center justify-content-center mt-3'
        >
          <UICheckbox
            label=' '
            onChange={(e) => {
              updateChecked(e);
              if (!e.target.checked) {
                const state = cloneDeep(eventData);
                if (state && state.social && state.social.linkedin)
                  delete state.social.linkedin;
                dispatch(actions.createEventComponentActions(state));
              }
            }}
            name='isLinkedin'
            isChecked={social.isLinkedin}
          />
        </Col>
        <Col md={5} xl={5} lg={5} sm={12} xs={12} className='mb-4'>
          <UIInput
            label='Linked In'
            placeholder='Enter Linked In URL'
            type='text'
            name={"linkedin"}
            value={get(eventData, "social.linkedin", "")}
            disabled={!social.isLinkedin}
            onChange={(e) => {
              if (social.isLinkedin) {
                handleFields(e, "social.linkedin");
              }
            }}
          />
        </Col>
        <Col
          md={1}
          xl={1}
          lg={1}
          sm={12}
          xs={12}
          className='mb-4 d-flex align-items-center justify-content-center mt-3'
        >
          <UICheckbox
            label=' '
            onChange={(e) => {
              updateChecked(e);
              if (!e.target.checked) {
                const state = cloneDeep(eventData);
                if (state && state.social && state.social.youtube) {
                  delete state.social.youtube;
                  dispatch(actions.createEventComponentActions(state));
                }
              }
            }}
            name='isYoutube'
            isChecked={social.isYoutube}
          />
        </Col>
        <Col md={5} xl={5} lg={5} sm={11} xs={11} className='mb-4'>
          <UIInput
            label='Youtube'
            placeholder='Enter Youtube URL'
            type='text'
            name={"youtube"}
            value={get(eventData, "social.youtube", "")}
            disabled={!social.isYoutube}
            onChange={(e) => {
              if (social.isYoutube) {
                handleFields(e, "social.youtube");
              }
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col
          md={1}
          xl={1}
          lg={1}
          sm={12}
          xs={12}
          className='mb-4 d-flex align-items-center justify-content-center mt-3'
        >
          <UICheckbox
            label=' '
            onChange={(e) => {
              updateChecked(e);
              if (!e.target.checked) {
                const state = cloneDeep(eventData);
                if (state && state.social && state.social.instagram) {
                  delete state.social.instagram;
                  dispatch(actions.createEventComponentActions(state));
                }
              }
            }}
            name='isInstagram'
            isChecked={social.isInstagram}
          />
        </Col>
        <Col md={5} xl={5} lg={5} sm={12} xs={12} className='mb-4'>
          <UIInput
            label='Instagram'
            placeholder='Enter Instagram URL'
            type='text'
            name={"instagram"}
            value={get(eventData, "social.instagram", "")}
            disabled={!social.isInstagram}
            onChange={(e) => {
              if (social.isInstagram) {
                handleFields(e, "social.instagram");
              }
            }}
          />
        </Col>
      </Row>
    </UIFormGroup>
    </ScrollBar>
  );
};
export default SocialTags;

const ScrollBar = styled(PerfectScrollbar)`
  min-height: auto !important;
  .scrollbar-container {
    min-height: auto !important;
  }
  margin: -15px -30px !important;
  padding: 10px 30px 10px 30px;
  height: calc(100vh - 510px);
  overflow-y: auto;
  .ps__rail-y {
    border-radius: 6px;
  }
  .custome-filebrowse label {
    font-size: 14px;
    color: #283747;
    margin-bottom: 5px;
  }
`;
