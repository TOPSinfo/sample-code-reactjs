import React from "react";
import { Col, Row } from "react-bootstrap";
import { UIFormGroup, UIUploadFile, UIInput } from "@theme";
import UploadFile from "modules/utils/FirebaseUpload";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "modules/selectors";
import { get, cloneDeep, set } from "lodash";
import * as actions from "modules/actions";
import { setModalLoading } from "modules/actions";
import styled from "styled-components";
import PerfectScrollbar from "react-perfect-scrollbar";

export const SponsorsHall = () => {
  const dispatch = useDispatch();
  const organizationId = useSelector(selectors.getOrganizationId);
  const eventData = useSelector(selectors.getEventComponentData);

  const handleWithouttargetFields = (value: any, path: string) => {
    const state = cloneDeep(eventData);
    set(state, path, value);
    dispatch(actions.createEventComponentActions(state));
  };

  const handleFields = (e: any, path: string) => {
    const target: any = e.target;
    const value = target.value;
    const clonedState = cloneDeep(eventData);
    set(clonedState, path, value);
    dispatch(actions.createEventComponentActions(clonedState));
  };

  const UploadFileHandler = async (files: any[]) => {
    if (files && files.length > 0) {
      const filePath = `/dynamic/images/${organizationId}/Lobby/`;
      dispatch(setModalLoading(true));
      try {
        const response: any = await UploadFile(
          filePath,
          files[0],
          "bgImage",
          "/Lobby/"
        );
        handleWithouttargetFields(response.fileUrl, "sponsors.page.bgImage");
        dispatch(setModalLoading(false));
      } catch (e) {
        handleWithouttargetFields(
          "/assets/images/default/default_exhibitionH.jpg",
          "sponsors.page.bgImage"
        );
        dispatch(setModalLoading(false));
      }
    } else handleWithouttargetFields("", "sponsors.page.bgImage");
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
              <UIInput
                label='Sponsor reel title'
                placeholder='Sponsor reel title'
                name='sponsorsactionlabel'
                type='text'
                value={get(eventData, "sponsors.action.label", "")}
                onChange={(e) => handleFields(e, "sponsors.action.label")}
              />
            </Col>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIInput
                label='Dedicated sponsors page title'
                placeholder='Dedicated sponsors page title'
                name='sponsorspagetitle'
                type='text'
                value={get(eventData, "sponsors.page.title", "")}
                onChange={(e) => handleFields(e, "sponsors.page.title")}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4 px-0'>
              <UIUploadFile
                label='Sponsors BackGround Image'
                dropZoneContent={<div>Upload or select from library</div>}
                accept={"image/jpeg, image/png"}
                maxSize={2 * 1048576}
                staticText={
                  "JPG and PNG up to 2 MB, 1920x873px or a multiple (2.2 aspect ratio)"
                }
                maxFiles={1}
                changeUploadedFiles={(files) => UploadFileHandler(files)}
                value={
                  get(eventData, "sponsors.page.bgImage", "")
                    ? get(eventData, "sponsors.page.bgImage", "")
                      .split("/")
                      .pop()
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
export default SponsorsHall;

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
