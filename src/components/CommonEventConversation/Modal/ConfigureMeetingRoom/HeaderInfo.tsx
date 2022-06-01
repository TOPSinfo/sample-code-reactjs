import React from "react";
import { Col, Row } from "react-bootstrap";
import { UIFormGroup, UIUploadFile } from "@theme";
import UploadFile from "modules/utils/FirebaseUpload";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "modules/selectors";
import { get, cloneDeep, set } from "lodash";
import BasicCkEditor from "components/CKEditor";
import * as actions from "modules/actions";
import { setModalLoading } from "modules/actions";
import styled from "styled-components";
import PerfectScrollbar from "react-perfect-scrollbar";

export const HeaderInfo = () => {
  const dispatch = useDispatch();
  const organizationId = useSelector(selectors.getOrganizationId);
  const componentType = useSelector(selectors.getEventType)
  const eventDetail = useSelector(selectors.getEventComponentData);
  const conversationDetail = useSelector(selectors.getConversationComponentData);
  const eventData = componentType === "conversation" ? conversationDetail : eventDetail;

  const handleWithouttargetFields = (value: any, path: string) => {
    const state = cloneDeep(eventData);
    set(state, path, value);
    if (path === "header.titleHtml" && value === "<p><br></p>")
      set(state, path, "");
    if (componentType === "conversation") {
      dispatch(actions.createConversationComponentActions(state));
    } else {
      dispatch(actions.createEventComponentActions(state));
    }
  };

  const UploadFileHandler = async (files: any[]) => {
    if (files && files.length > 0) {
      const filePath = `/dynamic/images/${organizationId}/Event/`;
      dispatch(setModalLoading(true));
      try {
        const response: any = await UploadFile(
          filePath,
          files[0],
          "headerImg",
          "/Event/"
        );
        handleWithouttargetFields(response.fileUrl, "header.imageUrl");
        dispatch(setModalLoading(false));
      } catch (e) {
        dispatch(setModalLoading(false));
      }
    } else handleWithouttargetFields("", "header.imageUrl");
  };

  return (
    <ScrollBar>
      <UIFormGroup
        onSubmit={(e) => e.preventDefault()}
        className='overview-wrapper'
      >
        <React.Fragment>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <label className={"mb-2 common-label"}>Event Header Title</label>
              <BasicCkEditor
                value={get(eventData, "header.titleHtml", "")}
                onValueChange={(data: any) => {
                  handleWithouttargetFields(data, "header.titleHtml");
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIUploadFile
                label='Event Header Logo'
                dropZoneContent={<div>default tops-logo.jpeg</div>}
                accept={"image/jpeg, image/png"}
                maxSize={2 * 1048576}
                staticText={"JPG and PNG up to 2 MB"}
                maxFiles={1}
                changeUploadedFiles={(files) => UploadFileHandler(files)}
                value={
                  get(eventData, "header.imageUrl", "")
                    ? get(eventData, "header.imageUrl", "").split("/").pop()
                    : ""
                }
              />
            </Col>
          </Row>
        </React.Fragment>
      </UIFormGroup>
    </ScrollBar>
  );
};
export default HeaderInfo;

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
