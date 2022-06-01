import React, { useState, Fragment, useMemo, useRef, useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import {
  UIButton,
  UICheckbox,
  UITextArea,
  UIInput,
  UIFormGroup,
  UIUploadFile,
  Timepicker as TimePicker,
  UIReactSelect2
} from "@theme";
import styled from "styled-components";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import { set, get } from "lodash";
import * as selectors from "modules/selectors";
import * as actions from "modules/actions";
import moment from "moment-timezone";
import UploadFile from "modules/utils/FirebaseUpload";
import { convertTime } from "modules/utils/commonFn";
import KeynotesGradients from "./KeynoteGradients";
moment.suppressDeprecationWarnings = true;
const Keynotes = ({ currentEvent }: any) => {
  const dispatch = useDispatch();
  const modalRef = useRef<any>(
    document.getElementsByClassName("modal").length > 0
      ? document.getElementsByClassName("modal")[0]
      : null
  );
  const organizationId = useSelector(selectors.getOrganizationId);
  const eventData = useSelector(selectors.getEventComponentData);
  // const selectedDateTime = get(eventData, "keynotes.utcStartTimeMillis", null);
  const getFilteredMeetingRoom = useSelector(selectors.getFilteredMeetingRoom);
  const tz = useMemo(
    () =>
      currentEvent.timezone
        ? currentEvent.timezone.value.split(" ").pop()
        : moment.tz.guess(),
    [currentEvent]
  );
  const [keynoteDetails, setKeynoteDetails] = useState({
    showDropdown: false,
    isSelected: false,
    roomId: "",
    durationMinutes: 0,
    _startDate: "",
    lobbyDescription: "",
    lobbyTitle: ""
  });

  const handleFields = (
    value: any,
    path: string,
    isCheckBox?: boolean,
    isNumber?: boolean
  ) => {
    const clonedState = cloneDeep(eventData);
    set(
      clonedState,
      path,
      !isCheckBox
        ? isNumber
          ? isNaN(+value)
            ? Math.abs(value)
            : Math.abs(+value)
          : value
        : value
    );
    dispatch(actions.createEventComponentActions(clonedState));
  };

  const UploadFileHandler = async (files: any[]) => {
    const clonedState = cloneDeep(eventData);
    if (files && files.length > 0) {
      const filePath = `/dynamic/images/${organizationId}/Keynotes/`;
      dispatch(actions.setModalLoading(true));
      try {
        const response: any = await UploadFile(
          filePath,
          files[0],
          "keynoteCardBgImg",
          "/Keynotes/"
        );
        set(clonedState, "keynotes.card.background.imageUrl", response.fileUrl);
        dispatch(actions.createEventComponentActions(clonedState));
        dispatch(actions.setModalLoading(false));
      } catch (e) {
        set(
          clonedState,
          "keynotes.card.background.imageUrl",
          "/assets/images/default/default_keynote.jpg"
        );
        dispatch(actions.createEventComponentActions(clonedState));

        dispatch(actions.setModalLoading(false));
      }
    } else {
      set(clonedState, "keynotes.card.background.imageUrl", "");
      dispatch(actions.createEventComponentActions(clonedState));
    }
  };

  const setKeynoteBymeetingRoom = useCallback(
    (value: any, isAddNew: boolean) => {
      let clonedState = cloneDeep(eventData);
      let roomIds = [];
      if (isAddNew) {
        roomIds = get(clonedState, "keynotes.roomIds", []);
        if (!Array.isArray(roomIds)) {
          roomIds = Object.values(roomIds);
        }
        if (!roomIds.some((x: any) => x === value.value)) {
          roomIds.push(value.value);
        }
        setKeynoteDetails({
          showDropdown: false,
          isSelected: false,
          roomId: "",
          durationMinutes: 0,
          _startDate: "",
          lobbyDescription: "",
          lobbyTitle: ""
        });
      } else {
        roomIds = value.map((x: any) => x.id || x.value);
      }
      clonedState = {
        ...clonedState,
        keynotes: {
          ...clonedState.keynotes,
          roomIds
        }
      };
      dispatch(actions.createEventComponentActions(clonedState));
    },
    [dispatch, eventData]
  );

  const selectedRooms = useMemo(() => {
    const options: {
      value: string;
      label: string;
      utcStartTimeMillis: number;
    }[] = [];
    let roomIds = get(eventData, "keynotes.roomIds", []);
    if (!Array.isArray(roomIds)) {
      roomIds = Object.values(roomIds);
    }
    const opt = getFilteredMeetingRoom
      .filter((x: any) => roomIds.includes(x?.id))
      .map((x) => ({
        label: x.title,
        value: x.id,
        utcStartTimeMillis: x.utcStartTimeMillis
      }));
    opt.forEach((x) => options.push(x));
    return options.sort((a: any, b: any) =>
      a.utcStartTimeMillis > b.utcStartTimeMillis ? 1 : -1
    );
  }, [getFilteredMeetingRoom, eventData]);

  const allOptions = useMemo(() => {
    const ids = selectedRooms.map((x) => x.value);
    const usedTime = selectedRooms.map(
      (x) =>
        getFilteredMeetingRoom.find((y) => y.id === x.value)?.utcStartTimeMillis
    );
    return getFilteredMeetingRoom
      .filter(
        (x) =>
          ids.indexOf(x.id) === -1 &&
          usedTime.indexOf(x.utcStartTimeMillis) === -1
      )
      .sort((a, b) => (a.utcStartTimeMillis > b.utcStartTimeMillis ? 1 : -1));
  }, [getFilteredMeetingRoom, selectedRooms]);

  const allAvailableOptions = useMemo(() => {
    let options: { value: string; label: string }[] = [];
    if (allOptions.length > 0) {
      options = [
        {
          label: "Add new",
          value: "new"
        }
      ];
    }
    selectedRooms.forEach((x) => {
      options.push(x);
      options.push({ label: x.label, value: `${x.value}_` });
    });
    return options;
  }, [selectedRooms, allOptions]);

  const customStyles = useMemo(
    () => ({
      option: (provided: any, state: any) => {
        if (selectedRooms.length > 0 && state.data.value === "new") {
          return {
            ...provided,
            borderBottom: "1px solid #3f3f3f"
          };
        }
        return provided;
      }
    }),
    [selectedRooms]
  );


  const changeKeynoteSessionSequenceChange = useCallback(
    (selected: any) => {
      if (selected.some((x: any) => x.value === "new")) {
        setKeynoteDetails((prevVal) => ({
          ...prevVal,
          showDropdown: true,
          isSelected: false,
          roomId: "",
          durationMinutes: 0,
          _startDate: "",
          lobbyDescription: "",
          lobbyTitle: ""
        }));
      } else {
        let eventRooms = eventData?.keynotes?.roomIds || [];
        if (!Array.isArray(eventRooms)) {
          eventRooms = Object.values(eventRooms);
        }
        if (eventRooms.length > selected.length) {
          setKeynoteBymeetingRoom(selected, false);
        }
        const selectedItem = selected.find((x: any) => !x.utcStartTimeMillis);
        if (selectedItem) {
          const val = selectedItem.value;
          const selectedRoom = getFilteredMeetingRoom.find(
            (x) => x.id === val.slice(0, val.length - 1)
          );
          if (selectedRoom) {
            setKeynoteDetails({
              showDropdown: false,
              isSelected: true,
              roomId: selectedRoom.id,
              durationMinutes: selectedRoom.durationMinutes,
              _startDate: convertTime(selectedRoom.utcStartTimeMillis, tz),
              lobbyDescription: selectedRoom.subTitle || "",
              lobbyTitle: selectedRoom.title
            });
          }
        }
      }
    },
    [eventData, getFilteredMeetingRoom, setKeynoteBymeetingRoom, tz]
  );

  const selectSessionCallback = useCallback(
    (selected: any) =>
      setKeynoteDetails((prevVal) => ({
        ...prevVal,
        roomId: selected.id,
        lobbyTitle: selected.title,
        lobbyDescription: selected.subTitle,
        durationMinutes: selected.durationMinutes,
        _startDate: convertTime(selected.utcStartTimeMillis, tz),
        utcStartTimeMillis: selected.utcStartTimeMillis,
        isSelected: true
      })),
    [tz]
  );

  const addNewRoom = useCallback(
    () =>
      setKeynoteBymeetingRoom(
        {
          value: keynoteDetails.roomId,
          label: keynoteDetails.lobbyTitle
        },
        true
      ),
    [setKeynoteBymeetingRoom, keynoteDetails]
  );

  return (
    <ScrollBar>
      <UIFormGroup
        onSubmit={(e) => e.preventDefault()}
        className='overview-wrapper'
      >
        <Fragment>
          <Row>
            <Col
              md={6}
              xl={6}
              lg={6}
              sm={12}
              xs={12}
              className='mb-4 d-flex align-items-center'
            >
              <UICheckbox
                label={"Show keynote section"}
                name='showKeynoteSection'
                isChecked={get(eventData, "keynotes.showKeynoteSection", false)}
                onChange={(e) =>
                  handleFields(
                    e.target.checked,
                    "keynotes.showKeynoteSection",
                    true
                  )
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIInput
                type={"text"}
                label={"Active keynote text"}
                placeholder={"Active keynote text"}
                value={get(eventData, "keynotes.activeKeynoteText", "")}
                onChange={(e) => {
                  handleFields(e.target.value, "keynotes.activeKeynoteText");
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIInput
                type={"text"}
                label={"Expired keynote text"}
                placeholder={"Expired keynote text"}
                value={get(eventData, "keynotes.expiredKeynoteText", "")}
                onChange={(e) => {
                  handleFields(e.target.value, "keynotes.expiredKeynoteText");
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4 px-0'>
              <UIUploadFile
                label='Keynote background image'
                dropZoneContent={<div>Upload or select from library</div>}
                accept={"image/jpeg, image/png"}
                maxSize={2 * 1048576}
                staticText={
                  "JPG and PNG up to 2 MB, 1230x351px or a multiple (3.5 aspect ratio)"
                }
                maxFiles={1}
                changeUploadedFiles={(files) => UploadFileHandler(files)}
                value={
                  get(eventData, "keynotes.card.background.imageUrl", "")
                    ? get(eventData, "keynotes.card.background.imageUrl", "")
                      .split("/")
                      .pop()
                    : ""
                }
              />
            </Col>
          </Row>
          {/* <Row>
            <Select2ColWrapper
              md={12}
              xl={12}
              lg={12}
              sm={12}
              xs={12}
              className='mb-4'
            >
              <UICheckbox
                label={"Automatically join"}
                onChange={(e) => {
                  handleFields(e.target.checked, "keynotes.automaticJoin");
                }}
                isChecked={get(eventData, "keynotes.automaticJoin", false)}
              />
            </Select2ColWrapper>
          </Row> */}
          <KeynotesGradients />
          <Row>
            <Select2ColWrapper
              md={12}
              xl={12}
              lg={12}
              sm={12}
              xs={12}
              className='mb-4'
            >
              <UIReactSelect2
                label='Keynote sessions sequence'
                placeholder={"No Keynote sessions sequence selected"}
                defaultValue={selectedRooms}
                value={selectedRooms}
                menuPortalTarget={modalRef.current}
                multiple={true}
                styles={customStyles}
                onChange={changeKeynoteSessionSequenceChange}
                options={allAvailableOptions}
              />
            </Select2ColWrapper>
          
          </Row>
          {keynoteDetails.showDropdown && (
            <Row>
              <SelectSessionWrapper
                md={8}
                xl={8}
                lg={8}
                sm={12}
                xs={12}
                className='mb-4'
              >
                <UIReactSelect2
                  label='Select a session'
                  value={{
                    label: keynoteDetails.lobbyTitle,
                    value: keynoteDetails.roomId
                  }}
                  menuPortalTarget={modalRef.current}
                  onChange={selectSessionCallback}
                  options={allOptions}
                />
              </SelectSessionWrapper>
              <Col md={4} xl={4} lg={4} sm={12} xs={12} className='mb-4 mt-3'>
                <UIButton border label={"Add"} onClick={addNewRoom} />
              </Col>
            </Row>
          )}
          {keynoteDetails.isSelected && (
            <Fragment>
              <Row>
                <Select2ColWrapper
                  md={12}
                  xl={12}
                  lg={12}
                  sm={12}
                  xs={12}
                  className='mb-4'
                >
                  <UICheckbox
                    label={"Automatically join"}
                    onChange={(e) => {
                      const roomAutoJoin = get(
                        eventData,
                        "keynotes.roomAutomaticJoin",
                        {}
                      );
                      roomAutoJoin[keynoteDetails.roomId] = e.target.checked;
                      handleFields(roomAutoJoin, "keynotes.roomAutomaticJoin");
                    }}
                    isChecked={
                      !!get(eventData, "keynotes.roomAutomaticJoin", {})[
                        keynoteDetails.roomId
                      ]
                    }
                  />
                </Select2ColWrapper>
              </Row>
              <Row>
                <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
                  <UIInput
                    type={"text"}
                    label={"Keynote title"}
                    placeholder={"Keynote title"}
                    disabled={true}
                    value={keynoteDetails.lobbyTitle}
                    onChange={(e) => {
                      handleFields(e.target.value, "keynotes.lobbyTitle");
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
                  <UITextArea
                    label={"Keynote subtitle"}
                    placeholder={"Keynote subtitle"}
                    value={keynoteDetails.lobbyDescription}
                    disabled={true}
                    onChange={(e) => {
                      handleFields(e.target.value, "keynotes.lobbyDescription");
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
                  <TimePicker
                    placeholder='Start time and date'
                    label={"Start time and date"}
                    inputIcon={"icon-moon icon-ic-event-white"}
                    disabled={true}
                    name={"_startDate"}
                    dateFormat={"d MMM yyyy hh:mm a"}
                    minDate={
                      currentEvent?.startDate && currentEvent?.startTime
                        ? moment(
                          currentEvent.startDate +
                              " " +
                              currentEvent.startTime
                        ).toDate()
                        : new Date()
                    }
                    showTimeSelect={true}
                    timeIntervals={30}
                    timeFormat={"hh:mm a"}
                    // onChange={TimeChangeHandler}
                    hasError={false}
                    errorText={""}
                    value={keynoteDetails._startDate}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
                  <UIInput
                    label='Keynote duration'
                    type='number'
                    placeholder='Enter keynote duration'
                    name='durationMinutes'
                    disabled={true}
                    value={keynoteDetails.durationMinutes}
                    onChange={(e) => {
                      handleFields(
                        e.target.value,
                        "keynotes.durationMinutes",
                        false,
                        true
                      );
                    }}
                  />
                </Col>
              </Row>
            </Fragment>
          )}
        </Fragment>
      </UIFormGroup>
    </ScrollBar>
  );
};
export default Keynotes;
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
  .date-time-box {
    input:disabled {
      background: #e9ecef;
    }
  }
`;
const Select2ColWrapper = styled(Col)`
  .custom-timezone > div > div > div > div {
    width: auto !important;
  }
`;
const SelectSessionWrapper = styled(Col)`
  .form-component label span {
    font-weight: normal !important;
  }
`;
