import React, { useCallback, useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { UIFormGroup, UIInput, UIRadio, UIUploadFile } from "@theme";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "modules/selectors";
import { get, set, cloneDeep } from "lodash";
import * as actions from "modules/actions";
import styled from "styled-components";
import PerfectScrollbar from "react-perfect-scrollbar";
import { MEETING_TYPES } from "../../../../@theme/commonfile";
import BasicCkEditor from "components/CKEditor";
import UploadFile from "modules/utils/FirebaseUpload";
import { ToolTip } from "components";
export const CallToActionCard = () => {
  const dispatch = useDispatch();
  const eventData = useSelector(selectors.getEventComponentData);
  const organizationId = useSelector(selectors.getOrganizationId);

  const handleFields = (value: any, path: string) => {
    const clonedState = cloneDeep(eventData);
    if (path === "card.html" && eventData.isEditorActive) {
      set(clonedState, "card.background.imageUrl", "");
    }
    set(clonedState, path, value);
    dispatch(actions.createEventComponentActions(clonedState));
  };

  const handleWithouttargetFields = useCallback(
    (value1: any, path1: string, value2: any, path2: string) => {
      const clonedState = cloneDeep(eventData);
      set(clonedState, path1, value1);
      set(clonedState, path2, value2);
      dispatch(actions.createEventComponentActions(clonedState));
    },
    [eventData, dispatch]
  );
  const availableCTA = useRef({
    left: true,
    right: true
  });

  const allEventComponents = useSelector(selectors.getAllEventComponents);

  useEffect(() => {
    const ctas = allEventComponents.filter(
      (x) => x.componentType === MEETING_TYPES.CALL_TO_ACTION
    );
    const left = ctas.some((x) => x?.name === "CallToAction");
    const right = ctas.some((x) => x?.name === "TakeAssessment");
    availableCTA.current = { left, right };
    const eventDataCTAName = get(eventData, "name", "");
    if (right && !left && !eventDataCTAName) {
      handleWithouttargetFields(0, "order", "CallToAction", "name");
      availableCTA.current.left = true;
    } else if (left && !right && !eventDataCTAName) {
      handleWithouttargetFields(1, "order", "TakeAssessment", "name");
      availableCTA.current.right = true;
    }
  }, [allEventComponents, eventData, handleWithouttargetFields]);

  const UploadFileHandler = async (files: any[]) => {
    const clonedState = cloneDeep(eventData);
    if (files && files.length > 0) {
      const filePath = `/dynamic/images/${organizationId}/CTA/`;
      dispatch(actions.setModalLoading(true));
      try {
        const response: any = await UploadFile(
          filePath,
          files[0],
          "ctaBgImage",
          "/CTA/"
        );
        set(clonedState, "card.html", "");
        set(clonedState, "card.background.imageUrl", response.fileUrl);
        dispatch(actions.createEventComponentActions(clonedState));
        dispatch(actions.setModalLoading(false));
      } catch (e) {
        dispatch(actions.setModalLoading(false));
      }
    } else {
      set(clonedState, "card.background.imageUrl", "");
      dispatch(actions.createEventComponentActions(clonedState));
    }
  };
  return (
    <ScrollBar>
      <UIFormGroup
        onSubmit={(e) => e.preventDefault()}
        className='overview-wrapper'
      >
        <React.Fragment>
          <Row>
            <Col md={6} xl={6} lg={6} sm={6} xs={6} className='mb-4'>
              <UIRadio
                label='Left'
                placeholder='Left'
                name='order'
                disabled={availableCTA.current.left}
                isChecked={get(eventData, "name", "") === "CallToAction"}
                onChange={() => {
                  handleWithouttargetFields(0, "order", "CallToAction", "name");
                }}
              />
            </Col>
            <Col md={6} xl={6} lg={6} sm={6} xs={6} className='mb-4'>
              <UIRadio
                label='Right'
                placeholder='Right'
                name='order'
                disabled={availableCTA.current.right}
                isChecked={get(eventData, "name", "") === "TakeAssessment"}
                onChange={() => {
                  handleWithouttargetFields(
                    1,
                    "order",
                    "TakeAssessment",
                    "name"
                  );
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <label className='label-info'>
                <span>Target URL</span>{" "}
                <ToolTip
                  infoText={`External links will be opened in a new tab. They must include http:// or https://. Internal links are opened in the current tab. Find the actual URL of the event component that you want to direct to and remove everything before the last '/'. For example, to direct to the exhibition hall of the event, put "/sponsors", for the schedule "/schedule", for a room, "/room/xxx", etc`}
                />
              </label>
              <UIInput
                label=''
                type='text'
                placeholder='Enter Url'
                name='openUrl'
                value={get(eventData, "card.openUrl", "")}
                onChange={(e) => {
                  handleFields(e.target.value, "card.openUrl");
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIRadio
                label='Image'
                name='Image'
                onChange={() => handleFields(false, "isEditorActive")}
                isChecked={!get(eventData, `isEditorActive`)}
              />
            </Col>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIRadio
                label='HTML'
                name='HTMl'
                onChange={() => handleFields(true, "isEditorActive")}
                isChecked={get(eventData, `isEditorActive`)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className=''>
              <div className={"form-component"}>
                <label className={"mb-2"}>
                  <span>CTA card background</span>
                </label>
              </div>
            </Col>
            <Col
              md={12}
              xl={12}
              lg={12}
              sm={12}
              xs={12}
              className={eventData.isEditorActive ? "mb-4" : "mb-4 px-0"}
            >
              <div className={"form-component"}>
                {eventData.isEditorActive ? (
                  <BasicCkEditor
                    value={get(eventData, "card.html", "")}
                    onValueChange={(data: any) => {
                      handleFields(data, "card.html");
                    }}
                  />
                ) : (
                  <UIUploadFile
                    label=''
                    dropZoneContent={<div>Upload or select from library</div>}
                    accept={"image/jpeg, image/png"}
                    maxSize={2 * 1048576}
                    staticText={`"JPG and PNG up to 2 MB, 615x192px or a multiple (3.2 aspect ratio)"`}
                    maxFiles={1}
                    changeUploadedFiles={(files) => UploadFileHandler(files)}
                    value={
                      get(eventData, "card.background.imageUrl", "")
                        ? get(eventData, "card.background.imageUrl", "")
                            .split("/")
                            .pop()
                        : ""
                    }
                  />
                )}
              </div>
            </Col>
          </Row>
          {eventData.isEditorActive && (
            <Row>
              <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
                <div
                  className={"form-component preview"}
                  dangerouslySetInnerHTML={{
                    __html: get(eventData, "card.html", "")
                  }}
                />
              </Col>
            </Row>
          )}
        </React.Fragment>
      </UIFormGroup>
    </ScrollBar>
  );
};
export default CallToActionCard;
const ScrollBar = styled(PerfectScrollbar)`
  min-height: auto !important;
  .scrollbar-container {
    min-height: auto !important;
  }
  margin: -15px -30px !important;
  padding: 30px;
  overflow-y: auto;
  height: calc(100vh - 450px);
  .radio-btn {
    width: 50%;
  }
  textarea,
  .preview {
    min-height: 200px;
  }
`;
