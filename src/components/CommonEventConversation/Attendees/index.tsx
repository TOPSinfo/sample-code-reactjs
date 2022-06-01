import React, { useCallback, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { UIRadio, UICheckbox, UIButton, UIReactSelect2, UIInput } from "@theme";
import close from "assets/img/icons/ic-close.svg";
import info from "assets/img/icons/ic-info.svg";
import {
  AttendeesWrapper,
  CustomFlexDiv,
  EventDayWrapper,
  Remindar,
  GroupPolicies
} from ".././CreateEvent.style";
// import { UICustomSingleSelect } from "pages/Testing/components/customSingleSelect";
import { withProfiler } from "@sentry/react";
import {
  savingEventData,
  savingConversationData,
  setEventIdEditDatabase,
  toggleEditDatabaseModal,
  clearChat,
  fetchGroupLists,
  toggleAddGroupModal,
  setSelectedGroup
} from "modules/actions";
import { batch, useDispatch, useSelector } from "react-redux";
import get from "lodash/get";
import * as selectors from "modules/selectors";
import * as actions from "modules/actions";
import EditDatabaseModal from "./EditDatabaseModal";
import CSVReader from "react-csv-reader";
import styled from "styled-components";
import AddGroupModal from "../Modal/AddGroupModal";

export const EventAttendees = () => {
  // const [toggleImport, setToggleImport] = useState(false);
  const [isAlreadySetup, setIsAlreadySetup] = useState(false);
  const [selectedData, setSelectedData] = useState<any>({
    value: "",
    label: ""
  });
  const [groupList, setGroupList] = useState<any[]>([]);
  const eventId = useSelector(selectors.getCurrentEventId);
  const conversationId = useSelector(selectors.getCurrentConversationId);
  const dispatch = useDispatch();
  const createEventData = useSelector(selectors.getEventState);
  const createConversationData = useSelector(selectors.getConversationState);
  const componentType = useSelector(selectors.getEventType);
  const eventState =
    componentType === "event" ? createEventData : createConversationData;

  const conversationState = useSelector(selectors.getConversationState);
  const [rendomKey, setValue] = useState("");
  const groupListData = useSelector(selectors.getGrouplist);
  // const selectedValue = useSelector(selectors.getSelectedValue);

  useEffect(() => {
    if (eventState.id !== "" || conversationState.id !== "")
      dispatch(fetchGroupLists());
  }, [dispatch, eventState.id, conversationState.id]);

  const groupsAndPolicies = [
    {
      label: "Group 1",
      value: "group1"
    },
    {
      label: "Group 2",
      value: "group2"
    },
    {
      label: "Group 3",
      value: "group3"
    },
    {
      label: "Group 4",
      value: "group4"
    },
    {
      label: "Group 5",
      value: "group5"
    }
  ];

  useEffect(() => {
    if (groupListData) {
      let isDefaultGroup = false;
      const options: any[] = [];
      groupListData.map((group) => {
        isDefaultGroup = group.name === "Default" ? true : isDefaultGroup;
        const obj: any = {
          value: group.name,
          label: group.name,
          id: group.id,
          priority: group.priority,
          isCheckedPolls: group.isCheckedPolls
        };
        options.push(obj);
        return group;
      });
      if (!isDefaultGroup) {
        options.unshift({ value: "Default", label: "Default" });
      }
      options.push({ value: "Add Group", label: "Add Group..." });
      setGroupList(options);

      if (selectedData && selectedData.id) {
        const updatedData = options.find((data) => {
          return data.id === selectedData.id;
        });
        setSelectedData(updatedData);
      }
    }
    // eslint-disable-next-line
  }, [groupListData]);

  const editGroup = () => {
    const selectedgroups = groupList.find((group: any) => {
      return group.id === selectedData.id;
    });
    dispatch(setSelectedGroup(selectedgroups));
    dispatch(toggleAddGroupModal(true));
  };

  // const openImport = () => setToggleImport(true);

  const EditDatabase = useCallback(() => {
    if (eventId || conversationId) {
      if (!isAlreadySetup) {
        setIsAlreadySetup(true);
        batch(() => {
          dispatch(setEventIdEditDatabase());
          dispatch(toggleEditDatabaseModal(true));
        });
      } else {
        dispatch(toggleEditDatabaseModal(true));
      }
    }
  }, [dispatch, isAlreadySetup, eventId, conversationId]);

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header: any) => header.toLowerCase().replace(/\W/g, "_")
  };

  const cancelUploadedFile = () => {
    const randomString = Math.random().toString(36);
    setValue(randomString);
  };
  const ClearChat = () => {
    dispatch(clearChat());
  };

  const selectedGroup = (e: any) => {
    if (e.value.indexOf("Add Group") !== -1) {
      dispatch(toggleAddGroupModal(true));
      // setSelectedData(e.target.value);
      setSelectedData({ value: "Add Group", label: "Add Group..." });
    } else {
      setSelectedData(e);
    }
  };

  return (
    <AttendeesWrapper className='attendees-screen'>
      <AddGroupModal />
      <Row>
        <Col
          md={12}
          xl={6}
          lg={12}
          sm={12}
          xs={12}
          className='mb-2 registration'
        >
          <div className='registration'>
            <span className='title-500 mb-3'>Registration</span>
            <UIRadio
              name={"requiresRegistration"}
              label='This is a public event'
              isChecked={!get(eventState, "access.requiresRegistration", true)}
              onChange={() => {
                const obj = {
                  ...eventState,
                  access: {
                    ...eventState.access,
                    requiresRegistration: false
                  }
                };
                if (componentType === "event") {
                  dispatch(actions.setCreateEventState(obj));
                  dispatch(
                    savingEventData({
                      id: eventState.id,
                      access: {
                        requiresRegistration: false
                      }
                    })
                  );
                } else {
                  dispatch(actions.setCreateConversationState(obj));
                  dispatch(
                    savingConversationData({
                      id: eventState.id,
                      access: {
                        requiresRegistration: false
                      }
                    })
                  );
                }
              }}
            />
            <UIRadio
              name={"requiresRegistration"}
              label='Registration is required'
              isChecked={get(eventState, "access.requiresRegistration", true)}
              onChange={() => {
                const obj = {
                  ...eventState,
                  access: {
                    ...eventState.access,
                    requiresRegistration: true
                  }
                };
                if (componentType === "event") {
                  dispatch(actions.setCreateEventState(obj));
                  dispatch(
                    savingEventData({
                      id: eventState.id,
                      access: {
                        requiresRegistration: true
                      }
                    })
                  );
                } else {
                  dispatch(actions.setCreateConversationState(obj));
                  dispatch(
                    savingConversationData({
                      id: eventState.id,
                      access: {
                        requiresRegistration: true
                      }
                    })
                  );
                }
              }}
            />
          </div>
        </Col>
        <Col
          md={12}
          xl={6}
          lg={12}
          sm={12}
          xs={12}
          className='mb-2 send-registerbox no-display'
        >
          <span className='title-500 mb-3 '>Confirmation and reminders</span>
          <CustomFlexDiv className='custom-flex'>
            <UICheckbox
              label='Send a confirmation of registration with that template:'
              name='Send a confirmation of registration with that template:'
            />
            <UIReactSelect2
              placeholder='Select from library'
              name='select-box'
              options={groupsAndPolicies}
            />
          </CustomFlexDiv>
        </Col>
      </Row>
      <Row>
        <Col md={12} xl={6} lg={12} sm={12} xs={12} className='mb-4'>
          <BtnWrapper>
            <UIButton
              label={"Edit database"}
              border={true}
              disabled={!eventId && !conversationId}
              onClick={EditDatabase}
            />
            <div key={rendomKey || ""}>
              <CSVReader
                cssClass='csv-reader-input'
                label='Import CSV'
                onFileLoaded={(data, fileInfo) => {
                  console.log("csv data", fileInfo);
                  if (componentType === "event") {
                    dispatch(actions.importCsvData(data));
                  } else {
                    dispatch(actions.importCsvConversationData(data));
                  }
                  cancelUploadedFile();
                }}
                parserOptions={papaparseOptions}
                inputId='ObiWan'
                inputName='ObiWan'
                inputStyle={{ color: "black" }}
              />
            </div>
            <UIButton
              label={"Clear Chat"}
              border={true}
              disabled={true}
              onClick={ClearChat}
              className='d-none'
            />
          </BtnWrapper>
        </Col>
      </Row>
      <Row>
        <Col md={12} xl={6} lg={12} sm={12} xs={12} className='mb-4'>
          {/* <span className='title-500 mb-3'>Groups and Policies</span> */}
          <GroupPolicies className='groups-policies slctgrpbox'>
            {/* <UICustomSingleSelect
              placeholder='Select group'
              value={""}
              customButtonText={"Add group..."}
              buttonExternalEvent={() => {
                setToggleImport(false);
                dispatch(toggleAddGroupModal(true));
              }}
              options={groupList}
              openImport={openImport}
              toggleImport={toggleImport}
              importOptions={[]}
              className='searchicon'
            /> */}
            {/* <select
              placeholder='Select group'
              onChange={(e) => selectedGroup(e)}
              name='group'
              value={selectedData}
            >
              {groupList.map((option: any, index: number) => {
                return (
                  <option key={index} value={option.id}>
                    {option.label}
                  </option>
                );
              })}
            </select> */}
            <UIReactSelect2
              placeholder='Select'
              label='Groups  and  Policies'
              options={groupList}
              value={selectedData.value ? selectedData : ""}
              onChange={(event: any) => {
                selectedGroup(event);
              }}
            />
            <div style={{ marginTop: "19px" }}>
              <UIButton
                label='Edit'
                disabled={
                  !selectedData.value || selectedData.value === "Add Group"
                }
                onClick={editGroup}
              />
            </div>
          </GroupPolicies>
        </Col>
      </Row>
      <Row>
        <Col md={12} xl={6} lg={12} sm={12} xs={12} className='mb-4 no-display'>
          {eventState.currentSelectedTab === "attendees" && (
            <UICheckbox
              label='Sign-in with registration email is required'
              name='Sign-in with registration email is required'
              isChecked={eventState?.access?.isSignInWithEmailRequired}
              onChange={(event) => {
                const obj = {
                  ...eventState,
                  access: {
                    requiresRegistration: get(
                      eventState,
                      "access.requiresRegistration",
                      false
                    ),
                    isSignInWithEmailRequired: event.target.checked
                  }
                };
                dispatch(actions.setCreateEventState(obj));

                dispatch(
                  savingEventData({
                    id: eventState.id,
                    access: {
                      requiresRegistration: get(
                        eventState,
                        "access.requiresRegistration",
                        false
                      ),
                      isSignInWithEmailRequired: event.target.checked
                    }
                  })
                );
              }}
            />
          )}
        </Col>
        <Col md={12} xl={6} lg={12} sm={12} xs={12} className='mb-4 no-display'>
          <EventDayWrapper className='send-row'>
            <UIReactSelect2
              label={"Send"}
              placeholder='Select from library'
              name='select-box'
              options={groupsAndPolicies}
            />
            <span>as a reminder</span>
            <UIInput type='number' />
            <span>day(s) before the event</span>
            <img src={close} alt='close' />
          </EventDayWrapper>
          <Remindar className='add-a-reminder'>
            <a href='#'>Add a reminder</a>
          </Remindar>
        </Col>
      </Row>

      <Row className={"no-display"}>
        <Col md={12} xl={6} lg={12} sm={12} xs={12} className='mb-4'>
          <span className='title-500 mb-3'>Post-event</span>
          <CustomFlexDiv className='custom-flex post-event-row'>
            <UICheckbox
              label='Send a post-event follow-up email with that template:'
              name='Send a post-event follow-up email with that template:'
            />
            <UIReactSelect2
              placeholder='Select from library'
              name='select-box'
              options={groupsAndPolicies}
            />
            <img src={info} alt='info' className='info-icon' />
          </CustomFlexDiv>
        </Col>
      </Row>
      <Row className={"no-display"}>
        <Col
          md={12}
          xl={12}
          lg={12}
          sm={12}
          xs={12}
          className='mb-4 newly-components'
        >
          <UICheckbox
            label='Newly added components inherit access rules from their predecessor'
            name='Newly added components inherit access rules from their predecessor'
          />
          <img src={info} alt='info' className='info-icon' />
        </Col>
      </Row>
      <EditDatabaseModal />
    </AttendeesWrapper>
  );
};
export default withProfiler(EventAttendees);

export const BtnWrapper = styled.div`
  display: flex;
  & .csv-reader-input {
    position: relative;
    width: 127px;
    overflow: hidden;
    height: 40px;
    margin: 0 5px;
    padding: 12px 12px;
    border-radius: 4px;
    background-color: #0057e4;
    color: #fff;
    border: none;
    font-size: 14px;
    font-weight: 600;
    border: 1px solid #0057e4;
    background: none;
    color: #0057e4;
    display: inline-flex;
    justify-content: center;
    & .csv-input {
      color: black;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
`;
