import React from "react";
import { UICheckbox, UIUploadFile } from "@theme";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "modules/selectors";
import { cloneDeep, set, get } from "lodash";
import * as actions from "modules/actions";
import UploadFile from "modules/utils/FirebaseUpload";

const Content1: React.FC = () => {
  const componentType = useSelector(selectors.getEventType)
  // const eventData = useSelector(selectors.getEventComponentData);
  const organizationId = useSelector(selectors.getOrganizationId);

  const eventDetail = useSelector(selectors.getEventComponentData);
  const conversationDetail = useSelector(selectors.getConversationComponentData);

  const eventData = componentType === "conversation" ? conversationDetail : eventDetail;

  const dispatch = useDispatch();
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
          "breakoutBgImg",
          "/Event/"
        );
        handleWithouttargetFields(response.fileUrl, "backgroundImageSrc");
        dispatch(actions.setModalLoading(false));
      } catch (e) {
        dispatch(actions.setModalLoading(false));
      }
    } else {
      handleWithouttargetFields(
        "",
        "backgroundImageSrc"
      );
    }
  };

  return (
    <>
      {/* <Row>
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
      </Row> */}

      <Row>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
          <label className='label-info mb-3'>Record Session</label>
          <UICheckbox
            label='Automatically record meeting in this room'
            name='team-admin'
            position='after'
            onChange={(e) =>
              handleWithouttargetFields(e.target.checked, "autoRecord")
            }
            isChecked={get(eventData, "autoRecord", false)}
          />
          {/* <div>
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
          </div> */}
        </Col>
      </Row>
      <Row>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
          <UICheckbox
            label='Automatically record breakout rooms'
            name='team-admin'
            position='after'
            onChange={(e) =>
              handleWithouttargetFields(e.target.checked, "autoBreakoutGroupRecord")
            }
            isChecked={get(eventData, "autoBreakoutGroupRecord", false)}
          />
        </Col>
      </Row>


      {/* <Row>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
          <UIInput
            label='Post-session survey'
            placeholder='select from content library of orgID'
            type='text'
            inputIcon={"icon-moon icon-ic-search"}
          />
        </Col>
      </Row> */}

      {/* <Row>
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
      </Row> */}

      {/* <Row>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
          <div className='disabled-section'>
            <UICheckbox
              label='Do not ask special persons of this session'
              name='team-admin'
              position='after'
            />
          </div>
        </Col>
      </Row> */}
      <Row>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4 px-0'>
          <UIUploadFile
            label='Room Background Image'
            dropZoneContent={<div>Upload or select from library</div>}
            accept={"image/jpeg, image/png"}
            maxSize={2 * 1048576}
            staticText={
              "JPG and PNG up to 2 MB, 1328x664px or a multiple (2.0 aspect ratio)"
            }
            maxFiles={1}
            changeUploadedFiles={(files) => UploadFileHandler(files)}
            value={
              get(eventData, "backgroundImageSrc", "")
                ? get(eventData, "backgroundImageSrc", "").split("/").pop()
                : ""
            }
          />
        </Col>
      </Row>
    </>
  );
};
export default Content1;
