import React from "react";
import { UITextArea, UIInput, UICheckbox } from "@theme";
import { Row, Col } from "react-bootstrap";
import { get, cloneDeep, set } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "modules/selectors";
import * as actions from "modules/actions";
import styled from "styled-components";
import PerfectScrollbar from "react-perfect-scrollbar";
import RolesSpecialPerson from "./RolesSpecialPerson";
import { MEETING_TYPES } from "../../../../@theme/commonfile";
import { copyToClipboard } from "../../../../modules/utils";
// import moment from "moment-timezone";
// import ShoFloUnit from "./ShoFloUnit";

const Session: React.FC<{ externalRTMPCheck: any }> = () => {
  const dispatch = useDispatch();
  // const [error, setError] = useState({
  //   rtmlUrl: ""
  // });
  const componentType = useSelector(selectors.getEventType)
  // const eventData = useSelector(selectors.getEventComponentData);
  const eventDetail = useSelector(selectors.getEventComponentData);
  const conversationDetail = useSelector(selectors.getConversationComponentData);
  const eventData = componentType === "conversation" ? conversationDetail : eventDetail;
  const isModalLoading = useSelector(selectors.getModalLoading);

  const handleFields = (
    e: any,
    path: string,
    isCheckBox?: boolean,
    isNumeric?: boolean
  ) => {
    const target: any = e.target;
    const value = isCheckBox
      ? target.checked
      : isNumeric
        ? Math.abs(target.value)
        : target.value;
    const clonedState = cloneDeep(eventData);
    set(clonedState, path, value);
    if (componentType === "conversation") {
      dispatch(actions.createConversationComponentActions(clonedState));
    } else {
      dispatch(actions.createEventComponentActions(clonedState));
    }
  };

  // const checkValidation = () => {
  //   let formIsValid = true;
  //   const errs = error;
  //   if (
  //     !/((rtmp(s)|rtmp):\/\/.)(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g.test(
  //       eventData.rtmlUrl
  //     )
  //   ) {
  //     errs.rtmlUrl = "content is not a correct URL starting with rtmps";
  //     formIsValid = false;
  //   } else errs.rtmlUrl = "";
  //   setError((err: any) => ({ ...err, ...errs }));
  //   return formIsValid;
  // };

  return (
    <ScrollBar>
      <Row>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
          <UIInput
            label='Subtitle'
            type='text'
            maxLength={250}
            placeholder='Subtitle'
            name='subTitle'
            disabled={isModalLoading}
            value={get(eventData, "subTitle", "")}
            onChange={(e) => {
              handleFields(e, "subTitle");
            }}
            showCount
          />
        </Col>
      </Row>

      <Row>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
          <UITextArea
            showCount
            maxLength={400}
            label='Description'
            placeholder='Enter Description'
            disabled={isModalLoading}
            name='about'
            onChange={(e) => {
              handleFields(e, "about");
            }}
            value={get(eventData, "about", "")}
          />
        </Col>
      </Row>

      <Row>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
          <UIInput
            type={"number"}
            label='Order'
            placeholder='Order'
            disabled={isModalLoading}
            name='order'
            onChange={(e) => {
              handleFields(e, "order", false, true);
            }}
            value={get(eventData, "order", "")}
          />
        </Col>
      </Row>
      {eventData.componentType === MEETING_TYPES.BROADCAST_ROOM && (
        <Row>
          <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
            <UICheckbox
              label='Live stream this room to'
              name='isLiveStream'
              position='after'
              onChange={(e) => handleFields(e, "isLiveStream", true, false)}
              isChecked={get(eventData, "isLiveStream", false)}
            />
          </Col>
        </Row>
      )}

      {eventData.isLiveStream && (
        <Row>
          <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
            <UIInput
              type={"text"}
              label='Ingest server (RTMP source)'
              placeholder='rtmps://'
              disabled={isModalLoading}
              name='RTMPEndpoint '
              onChange={(e) => {
                handleFields(e, "RTMPEndpoint");
              }}
              value={get(eventData, "RTMPEndpoint", "")}
            // hasError={!!error.rtmlUrl}
            // errorText={error.rtmlUrl}
            />
          </Col>
        </Row>
      )}

      {eventData.isLiveStream && (
        <Row>
          <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
            <UIInput
              placeholder='Secret key'
              type={"text"}
              label='Secret Key'
              disabled={isModalLoading}
              inputCopyIcon={eventData.streamKey ? "icon-ic-copy-grey-1" : ""}
              inputInfoIconClick={() => copyToClipboard(eventData.streamKey)}
              name='streamKey'
              className={"pr-5 password-type"}
              onChange={(e) => {
                handleFields(e, "streamKey");
              }}
              value={get(eventData, "streamKey", "")}
            />
          </Col>
        </Row>
      )}
      <RolesSpecialPerson />
    </ScrollBar>
  );
};
export default Session;

const ScrollBar = styled(PerfectScrollbar)`
  min-height: auto !important;
  .scrollbar-container {
    min-height: auto !important;
  }
  margin: -15px -30px !important;
  padding: 30px 30px 10px 30px;
  height: calc(100vh - 510px);
  overflow-y: auto;
  .ps__rail-y {
    border-radius: 6px;
  }
  .Configuration-table table tbody tr td .radio-btn {
    margin-right: 10px !important;
    // margin-bottom: 0px !important;
  }
  .password-type {
    text-security: disc;
    -webkit-text-security: disc;
  }
`;
