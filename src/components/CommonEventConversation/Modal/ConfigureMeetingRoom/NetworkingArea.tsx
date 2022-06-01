import React, { useMemo, useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import {
  UIFormGroup,
  UICheckbox,
  UIInput,
  UIReactSelect2,
  UIUploadFile,
  UIRadio
  // UITextArea
} from "@theme";
import styled from "styled-components";
import PerfectScrollbar from "react-perfect-scrollbar";
import * as selectors from "modules/selectors";
import { useSelector, useDispatch } from "react-redux";
import { get, cloneDeep, set } from "lodash";
import * as actions from "modules/actions";
import { createOptionWithoutChanges } from "modules/utils/commonFn";
import UploadFile from "modules/utils/FirebaseUpload";
import { ToolTip } from "components";

export const NetworkingArea = () => {
  const [tableName, setTableName] = useState<any[]>([]);
  const dispatch = useDispatch();

  const eventData = useSelector(selectors.getEventComponentData);
  const organizationId = useSelector(selectors.getOrganizationId);
  const handleWithouttargetFields = (value: any, path: string) => {
    const state = cloneDeep(eventData);
    set(state, path, value);
    dispatch(actions.createEventComponentActions(state));
  };

  useEffect(() => {
    const rows: any[] = [];
    let i = 0;
    if (eventData) {
      const minVal = eventData.meetingTables.minTables;
      while (++i <= minVal) rows.push(i);
      setTableName(rows);
    }
  }, [eventData]);

  const UploadFileHandler = async (files: any[], path: string) => {
    if (files && files.length > 0) {
      const filePath = `/dynamic/images/${organizationId}/Event/`;
      dispatch(actions.setModalLoading(true));
      try {
        const response: any = await UploadFile(
          filePath,
          files[0],
          "loungeImg",
          "/Event/"
        );
        handleWithouttargetFields(response.fileUrl, path);
        dispatch(actions.setModalLoading(false));
      } catch (e) {
        dispatch(actions.setModalLoading(false));
      }
    } else handleWithouttargetFields("", path);
  };
  const discussionGroupOptions: any = useMemo(
    () =>
      Array.from(Array(10).keys())
        .filter((x) => x > 1 && x < 8)
        .map((x) => ({ label: x, value: x })),
    []
  );
  return (
    <ScrollBar isWidth>
      <UIFormGroup
        onSubmit={(e) => e.preventDefault()}
        className='overview-wrapper'
      >
        <React.Fragment>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <label className='label-info mb-2'>Capacity</label>

              <div className='limittobox'>
                <UICheckbox
                  label='Limit to'
                  name='team-admin'
                  position='after'
                  isChecked={get(eventData, "isLimitedCapacity")}
                  onChange={(e) =>
                    handleWithouttargetFields(
                      e.target.checked,
                      "isLimitedCapacity"
                    )
                  }
                  isWidth
                />
                <UIInput
                  type='number'
                  value={get(eventData, "capacity")}
                  onChange={(e) => {
                    if (+e.target.value > 100 || +e.target.value <= 0) {
                      return;
                    }
                    handleWithouttargetFields(
                      parseInt(e.target.value),
                      "capacity"
                    );
                  }}
                />
                <span>participants</span>
              </div>
            </Col>
            <Col
              md={12}
              xl={12}
              lg={12}
              sm={12}
              xs={12}
              className='mb-4 px-0 upload-part'
            >
              {/* <div> */}
              {/* <p className='inputlabelbox mb-2'>Lounge Access Card Image</p> */}
              <UIUploadFile
                label='Lounge Access Card Image'
                dropZoneContent={<div>Upload or select from library</div>}
                accept={"image/jpeg, image/png"}
                maxSize={2 * 1048576}
                staticText={
                  "JPG and PNG up to 2 MB, 593x174px or a multiple (3.4 aspect ratio)"
                }
                maxFiles={1}
                changeUploadedFiles={(files) =>
                  UploadFileHandler(files, "cardImg")
                }
                value={
                  get(eventData, "cardImg", "")
                    ? get(eventData, "cardImg", "").split("/").pop()
                    : ""
                }
              />
              {/* </div> */}
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <label className='label-info mb-3'>
                <span>Meeting Tables</span>
              </label>
              <Row>
                <Col
                  md={12}
                  xl={12}
                  lg={12}
                  sm={12}
                  xs={12}
                  className='mb-2 d-flex align-items-center'
                >
                  Show
                  <div
                    style={{
                      width: "100px",
                      height: "40px",
                      margin: "0 10px",
                      zIndex: 3
                    }}
                  >
                    <UIReactSelect2
                      placeholder='Search and select person'
                      required
                      value={createOptionWithoutChanges(
                        get(eventData, "meetingTables.minTables", "").toString()
                      )}
                      options={[
                        // { value: "1", label: "1" },
                        // { value: "2", label: "2" },
                        // { value: "3", label: "3" },
                        { value: "4", label: "4" },
                        { value: "5", label: "5" },
                        { value: "6", label: "6" },
                        { value: "7", label: "7" },
                        { value: "8", label: "8" },
                        { value: "9", label: "9" },
                        { value: "10", label: "10" }
                      ]}
                      onChange={(selected: any) => {
                        handleWithouttargetFields(
                          parseInt(selected.value),
                          "meetingTables.minTables"
                        );
                      }}
                    />
                  </div>
                  tables
                </Col>
              </Row>
              {/* <div className='meetingsubsection'>
                <p>Up to</p>
                <UIInput
                  type='number'
                  value={get(
                    eventData,
                    "meetingTables.capacity",
                    ""
                  ).toString()}
                  onChange={(e: any) => {
                    handleWithouttargetFields(
                      parseInt(e.target.value),
                      "meetingTables.capacity"
                    );
                  }}
                />
                <p className='mr-1'>participants can join a table</p>{" "}
                <img src={info} alt='info' />
              </div> */}
            </Col>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <Row>
                <Col>
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: "14px",
                      marginRight: "15px"
                    }}
                  >
                    Show Tablename
                  </span>
                  <UIRadio
                    name={"tableName"}
                    label='Unnamed'
                    isChecked={
                      !get(eventData, "meetingTables.isNamedTable", true)
                    }
                    onChange={() =>
                      handleWithouttargetFields(
                        false,
                        "meetingTables.isNamedTable"
                      )
                    }
                  />
                  <UIRadio
                    name={"tableName"}
                    label='Named'
                    isChecked={get(
                      eventData,
                      "meetingTables.isNamedTable",
                      true
                    )}
                    onChange={() =>
                      handleWithouttargetFields(
                        true,
                        "meetingTables.isNamedTable"
                      )
                    }
                  />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  {eventData.meetingTables.isNamedTable
                    ? tableName.map((val, i) => {
                        return (
                          <>
                            <UIInput
                              key={i}
                              label={`Table${i + 1} name`}
                              type='text'
                              maxLength={14}
                              placeholder={`Enter table${i + 1} name`}
                              name='meetingTableName'
                              value={get(
                                eventData,
                                `meetingTables.meetingTableNames[${i}]`
                              )}
                              onChange={(e) => {
                                handleWithouttargetFields(
                                  e.target.value,
                                  `meetingTables.meetingTableNames[${i}]`
                                );
                              }}
                            />
                            <br />
                          </>
                        );
                      })
                    : null}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <label className='label-info mb-3'>
                <span>Discussion Groups </span>
                <ToolTip infoText='Unlike meeting tables, discussion groups are not public' />
              </label>
              {/* <UICheckbox
                label='Participants can create closed discussion groups'
                name='team-admin'
                position='after'
                isChecked={get(eventData, "groupDiscuss.isGroupParticipant")}
                onChange={(e) =>
                  handleWithouttargetFields(
                    e.target.checked,
                    "groupDiscuss.isGroupParticipant"
                  )
                }
              /> */}

              <div className='meetingsubsection mb-3'>
                <p className='mr-1'>Up to</p>
                <UIReactSelect2
                  placeholder='Search and select person'
                  required
                  value={createOptionWithoutChanges(
                    get(
                      eventData,
                      "groupDiscuss.maxGroupParticipant",
                      ""
                    ).toString()
                  )}
                  options={discussionGroupOptions}
                  onChange={(selected: any) => {
                    handleWithouttargetFields(
                      parseInt(selected.value),
                      "groupDiscuss.maxGroupParticipant"
                    );
                  }}
                  className={"ml-2 mr-2"}
                />
                <p className='ml-1'>participants can join a group call</p>
              </div>

              {/* <div className='checkwithinfo mb-3'>
                <UICheckbox
                  label='Provide a ‘random match’ option'
                  name='team-admin'
                  position='after'
                  isChecked={get(eventData, "groupDiscuss.isRandomMatch")}
                  onChange={(e) =>
                    handleWithouttargetFields(
                      e.target.checked,
                      "groupDiscuss.isRandomMatch"
                    )
                  }
                />{" "}
                <ToolTip infoText='Provide a random match feature' />
              </div> */}

              <div className='limittobox mb-3'>
                <UICheckbox
                  label='Limit discussions to'
                  name='team-admin'
                  position='after'
                  isChecked={get(eventData, "groupDiscuss.isLimitDiscussGroup")}
                  onChange={(e) =>
                    handleWithouttargetFields(
                      e.target.checked,
                      "groupDiscuss.isLimitDiscussGroup"
                    )
                  }
                  requiredChange
                  isWidth
                />
                <UIReactSelect2
                  placeholder='Search and select person'
                  required
                  value={createOptionWithoutChanges(
                    get(
                      eventData,
                      "groupDiscuss.limitDicussionGroupTime",
                      ""
                    ).toString()
                  )}
                  options={[
                    { value: "5", label: "5" },
                    { value: "10", label: "10" },
                    { value: "15", label: "15" },
                    { value: "30", label: "30" }
                  ]}
                  onChange={(selected: any) => {
                    handleWithouttargetFields(
                      parseInt(selected.value),
                      "groupDiscuss.limitDicussionGroupTime"
                    );
                  }}
                />
                <span>minutes</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12}>
              <label className='label-info mb-3'>
                <span>Make it cool</span>
              </label>
            </Col>
            <Col
              md={12}
              xl={12}
              lg={12}
              sm={12}
              xs={12}
              className='mb-4 px-0 upload-part'
            >
              {/* <div className='mb-3'> */}
              {/* <p className='inputlabelbox mb-2'>Background image</p> */}
              <UIUploadFile
                label={"Background image"}
                dropZoneContent={<div>Upload or select from library</div>}
                accept={"image/jpeg, image/png"}
                maxSize={2 * 1048576}
                staticText={"JPG and PNG up to 2 MB"}
                maxFiles={1}
                changeUploadedFiles={(files) =>
                  UploadFileHandler(files, "bgImage")
                }
                value={
                  get(eventData, "bgImage", "")
                    ? get(eventData, "bgImage", "").split("/").pop()
                    : ""
                }
              />
              {/* </div> */}
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIInput
                label='Subtitle'
                type='text'
                maxLength={250}
                placeholder='Subtitle'
                name='subTitle'
                value={get(eventData, "subTitle", "")}
                onChange={(e) => {
                  handleWithouttargetFields(e.target.value, "subTitle");
                }}
                showCount
              />
            </Col>
          </Row>
          {/* 
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UITextArea
                showCount
                maxLength={500}
                label='Description'
                placeholder='Enter Description'
                name='description'
                onChange={(e) => {
                  handleWithouttargetFields(e.target.value, "description");
                }}
                value={get(eventData, "description", "")}
              />
            </Col>
          </Row> */}
        </React.Fragment>
      </UIFormGroup>
    </ScrollBar>
  );
};
export default NetworkingArea;

const ScrollBar = styled(PerfectScrollbar)<any>`
  min-height: auto !important;
  .scrollbar-container {
    min-height: auto !important;
  }
  margin: -15px -30px !important;
  padding: 10px 30px 10px 30px;
  height: calc(100vh - 428px);
  overflow-y: auto;
  .ps__rail-y {
    border-radius: 6px;
  }
  .custome-filebrowse label {
    font-size: 14px;
    color: #283747;
    margin-bottom: 5px;
  }
  .upload-part .form-component label span {
    font-weight: normal;
  }
  .limittobox .form-component input[type="checkbox"] {
    margin: 0 !important;
    width: ${({ isWidth }) => (isWidth ? "20px" : "100%")} !important;
  }
`;
