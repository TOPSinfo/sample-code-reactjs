import React from "react";
import { UIInput, UIRadio, UIUploadFile } from "@theme";
import { get, cloneDeep, set } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "modules/selectors";
import * as actions from "modules/actions";
import { Row, Col } from "react-bootstrap";
import { ToolTip } from "components";
import { MEETING_TYPES } from "../../../../@theme/commonfile";
import PerfectScrollbar from "react-perfect-scrollbar";
import styled from "styled-components";
import UploadFile from "modules/utils/FirebaseUpload";

const Attendees: React.FC = () => {
  const componentType = useSelector(selectors.getEventType)
  // const eventData = useSelector(selectors.getEventComponentData);
  const dispatch = useDispatch();
  const eventDetail = useSelector(selectors.getEventComponentData);
  const conversationDetail = useSelector(selectors.getConversationComponentData);

  const eventData = componentType === "conversation" ? conversationDetail : eventDetail;

  const organizationId = useSelector(selectors.getOrganizationId);
  const handleWithouttargetFields = (value: any, path: string) => {
    const clonedState = cloneDeep(eventData);
    set(clonedState, path, value);
    if (componentType === "conversation") {
      dispatch(actions.createConversationComponentActions(clonedState));
    } else {
      dispatch(actions.createEventComponentActions(clonedState));
    }
  };

  const UploadFileHandler = async (files: any[]) => {
    if (files && files.length > 0) {
      const filePath = `/dynamic/images/${organizationId}/Event/`;
      dispatch(actions.setModalLoading(true));
      try {
        const response: any = await UploadFile(
          filePath,
          files[0],
          "breakoutWaitBgImg",
          "/Event/"
        );
        handleWithouttargetFields(response.fileUrl, "waitingImageSrc");
        dispatch(actions.setModalLoading(false));
      } catch (e) {
        dispatch(actions.setModalLoading(false));
      }
    } else {
      handleWithouttargetFields(
        "/assets/images/default/default_waitingR.jpg",
        "waitingImageSrc"
      );
    }
  };
  return (
    <ScrollBar>
      <Row>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
          <label className='label-info mb-1'>
            <span>Room capacity </span>
            <ToolTip
              infoText={
                eventData.componentType === MEETING_TYPES.MEETING_ROOM
                  ? "The maximum capacity of interactive meeting rooms is 250 participants"
                  : "The default capacity of interactive broadcast rooms is 500 participants"
              }
            />
          </label>
          <div className='room-capacity'>
            <UIInput
              type='number'
              placeholder='Enter capacity'
              name='capacity'
              onChange={(e) => {
                const value = e.target.value;
                if (eventData.componentType === MEETING_TYPES.MEETING_ROOM) {
                  if (value <= "250") {
                    handleWithouttargetFields(+value, "capacity");
                  } else e.preventDefault();
                } else handleWithouttargetFields(+value, "capacity");
              }}
              value={get(eventData, "capacity", "")}
            />
            <span>participants</span>
          </div>
        </Col>
      </Row>

      {eventData.componentType === MEETING_TYPES.MEETING_ROOM && (
        <Row>
          <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
            <label className='label-info mb-3'>
              <span>Waiting Room</span>{" "}
              <ToolTip infoText='this option is meant for appointments but should not be used for larger meetings' />
            </label>

            <div className='radio-groupbox'>
              <UIRadio
                label='Attendees can enter freely whenever the room is open'
                name='breakouttype'
                onChange={() => {
                  handleWithouttargetFields("breakout", "type");
                }}
                isChecked={get(eventData, "type", "") === "breakout"}
              />
              <UIRadio
                label='Have attendees wait outside and let them in when a special person with moderation controls starts the session'
                name='breakouttype'
                onChange={() => {
                  handleWithouttargetFields("waiting", "type");
                }}
                isChecked={get(eventData, "type", "") === "waiting"}
              />
            </div>
          </Col>
        </Row>
      )}

      {get(eventData, "type", "") === "waiting" && (
        <>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIInput
                label='Waiting Room Notifier Title'
                placeholder='Enter title here'
                type='text'
                name={"waitingNotifyTitle"}
                onChange={(e) =>
                  handleWithouttargetFields(
                    e.target.value,
                    "waitingNotifyTitle"
                  )
                }
                value={get(eventData, "waitingNotifyTitle")}
                maxLength={50}
                showCount
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4 px-0'>
              <UIUploadFile
                label='Waiting Room Background Image'
                dropZoneContent={<div>Upload or select from library</div>}
                accept={"image/jpeg, image/png"}
                maxSize={2 * 1048576}
                staticText={
                  "JPG and PNG up to 2 MB, 1328x664px or a multiple (2.0 aspect ratio)"
                }
                maxFiles={1}
                changeUploadedFiles={(files) => UploadFileHandler(files)}
                value={
                  get(eventData, "waitingImageSrc", "")
                    ? get(eventData, "waitingImageSrc", "").split("/").pop()
                    : ""
                }
              />
            </Col>
          </Row>
        </>
      )}
    </ScrollBar>
  );
};
export default Attendees;
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
    margin-bottom: 0px !important;
  }
`;
