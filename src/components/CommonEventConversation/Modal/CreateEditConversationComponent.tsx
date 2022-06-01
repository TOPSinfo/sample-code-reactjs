import React, { useEffect, useRef, useState } from "react";
import {
  UIReactSelect2,
  UIModal,
  UIFormGroup,
  UIInput,
  UIModalFooter,
  UIButton,
  LoadingSpinner
} from "@theme";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as classNames from "classnames";
import { ModalSteps, TypeDescription } from "./CreateEditEventComponent.style";
import { useSelector, useDispatch, batch } from "react-redux";
import * as selectors from "modules/selectors";
import * as actions from "modules/actions";
import { get, set, cloneDeep, isEmpty } from "lodash";
import {
  convertTime,
  createOptionWithValueChanges,
  eventTypeBasedKey,
  splitType,
  typeDescription
} from "modules/utils/commonFn";

import ConfigureMeetingRoom from "./ConfigureMeetingRoom/ConfigureMeetingRoom";
import AddEditConversationLobby from "./ConfigureMeetingRoom/AddEditConversationLobby";
import CallToActionCard from "./ConfigureMeetingRoom/CallToActionCard";
import DefineBehaviourModal from "./DefineBehaviourModal";
import styled from "styled-components";
import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment-timezone";
import BasicCkEditor from "components/CKEditor/index";

import ConfigureSponsorBooth from "./ConfigureSponsorBooth";
import firebase from "modules/utils/Firebase";
import { getEventType, MEETING_TYPES } from "../../../@theme/commonfile";
import NetworkingArea from "./ConfigureMeetingRoom/NetworkingArea";
const CreateEditConversationComponent = () => {
  const [step, setStep] = useState(1);
  const [modalName, setModalName] = useState("Define name and location");
  const allConversationComponents = useSelector(
    selectors.getAllConversationComponents
  );
  const [options, setOptions] = useState(
    [] as { value: string; label: string }[]
  );
  const twoStepEvent = [MEETING_TYPES.NETWORKING_AREA, MEETING_TYPES.AGENDA, MEETING_TYPES.LOBBY];
  const [error, setError] = useState({
    title: "",
    componentType: ""
  });
  // const { setErrorFieldState } = useEventCreate();
  const showCreateEditConversationComponent = useSelector(
    selectors.getCreateEditConversationComponent
  );
  const selectedConversationComponent = useSelector(
    selectors.getSelectedConversationComponents
  );
  const conversationData = useSelector(selectors.getConversationComponentData);
  const dispatch = useDispatch();
  const isModalLoading = useSelector(selectors.getModalLoading);
  const modalRef = useRef<any>(null);
  const [minuteError, setMinuteError] = useState("");
  const [currentActiveKey, setCurrentActiveKey] = useState("0");
  const [externalRTMPCheck, setExternalRTMPCheck] = useState({
    channelName: "",
    ingestEndpoint: "",
    liveStreamSrc: ""
  });
  const conversationState = useSelector(selectors.getConversationState);
  const errFieldsState = useSelector(selectors.getFieldConversationErrorState);

  useEffect(() => {
    const data = selectedConversationComponent;
    if (data) {
      dispatch(actions.createConversationComponentActions(data));
    }
  }, [selectedConversationComponent, dispatch]);
  useEffect(() => {
    modalRef.current =
      document.getElementsByClassName("modal").length > 0
        ? document.getElementsByClassName("modal")[0]
        : null;
  }, []);
  useEffect(() => {
    let optns = [
      { value: MEETING_TYPES.MEETING_ROOM, label: "Meeting Room" },
      { value: MEETING_TYPES.BROADCAST_ROOM, label: "Broadcast Room" },
      { value: MEETING_TYPES.LOBBY, label: "Lobby" },
    ];
    if (
      allConversationComponents &&
      allConversationComponents.some((x) => x.componentType === MEETING_TYPES.LOBBY)
    ) {
      optns = optns.filter(
        (x) => x.label !== getEventType(MEETING_TYPES.LOBBY)
      );
    }
    if (
      allConversationComponents &&
      allConversationComponents.some(
        (x) => x.componentType === MEETING_TYPES.NETWORKING_AREA
      )
    ) {
      optns = optns.filter(
        (x) => x.label !== getEventType(MEETING_TYPES.NETWORKING_AREA)
      );
    }
    setOptions(optns);
    if (!showCreateEditConversationComponent) {
      setStep(1);
      setError({
        title: "",
        componentType: ""
      });
    }
  }, [showCreateEditConversationComponent, allConversationComponents]);

  useEffect(() => {
    if (step === 1) {
      setModalName("Define name and location");
    } else if (step === 2) {
      if (conversationData.componentType === MEETING_TYPES.SPONSOR_BOOTH)
        setModalName("Configure this sponsor booth");
      else setModalName("Define Behavior");
    } else if (step === 3 && conversationData.componentType) {
      setModalName(
        `Configure this ${splitType(
          conversationData.componentType.toLocaleLowerCase(),
          false
        )}`
      );
    }
  }, [step, conversationData.componentType]);

  useEffect(() => {
    if (step === 1) {
      if (minuteError) {
        setMinuteError("");
      }
    } else if (step === 2) {
      if (
        [MEETING_TYPES.BROADCAST_ROOM, MEETING_TYPES.MEETING_ROOM].includes(
          conversationData.componentType
        )
      ) {
        const meetingDur = conversationData?.durationMinutes || 0;
        if (meetingDur > 1440) {
          setMinuteError("A meeting can last up to 1440 min");
        } else if (meetingDur < 0) {
          setMinuteError("Meeting duration can't be negative.");
        }
      }
    }
  }, [
    step,
    minuteError,
    conversationData.componentType,
    conversationData?.durationMinutes
  ]);

  useEffect(() => {
    return () => {
      batch(() => {
        dispatch(actions.unMountConversationState());
        dispatch(
          actions.setDoubleClickConversationComponentsRowSelected({
            data: selectedConversationComponent,
            status: false
          })
        );
      });
    };
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const onCloseModal = () => {
    batch(() => {
      dispatch(actions.unMountConversationState());
      dispatch(actions.createEditConversationComponentModal(false));
      dispatch(
        actions.setDoubleClickConversationComponentsRowSelected({
          data: selectedConversationComponent,
          status: false
        })
      );
    });
  };

  const handleFields = (e: any, path: string) => {
    const target: any = e.target;
    const value = target.value;
    const state = cloneDeep(conversationData);
    set(state, path, value);
    dispatch(actions.createConversationComponentActions(state));
  };

  const handleEditor = (value: any, path: string) => {
    const clonedState = cloneDeep(conversationData);
    if (path === "card.html") {
      set(clonedState, "card.html", "");
    }
    set(clonedState, path, value);
    dispatch(actions.createConversationComponentActions(clonedState));
  }

  const handleWithouttargetFields = (value: any, path: string) => {
    let state = cloneDeep(conversationData);
    set(state, path, value);
    if (
      [MEETING_TYPES.MEETING_ROOM, MEETING_TYPES.BROADCAST_ROOM].includes(
        value
      ) &&
      !(state && state.type)
    ) {
      const type =
        value === MEETING_TYPES.MEETING_ROOM ? "breakout" : "broadcast";
      const userUtcOffset = moment().utcOffset();
      const eventUtcOffset = moment()
        .tz(
          conversationState.timezone
            ? conversationState.timezone.value.split(" ").pop()
            : moment.tz.guess()
        )
        .utcOffset();
      const obj = {
        ...state,
        ...{
          type,
          durationMinutes: 50,
          utcStartTimeMillis: (conversationState.startDate &&
            conversationState.startTime
            ? moment(
              `${conversationState.startDate} ${conversationState.startTime}`
            )
            : moment()
          )
            .add(userUtcOffset - eventUtcOffset, "minutes")
            .toDate()
            .getTime(),
          capacity: type === "breakout" ? 100 : 500
        }
      };
      if (
        moment()
          .add(userUtcOffset - eventUtcOffset, "minutes")
          .isAfter(moment(obj.utcStartTimeMillis))
      ) {
        obj.utcStartTimeMillis = moment().toDate().getTime();
      }
      state = obj;
    }
    dispatch(actions.createConversationComponentActions(state));
  };

  const saveExit = () => {
    if (
      checkValidation() &&
      !minuteError &&
      CheckBroadCastRoomExternalSource() &&
      CheckDateCondition()
    ) {
      saveData();
    }
  };

  const saveConversationComponent = (isToCloseModal?: boolean) => {
    if (
      checkValidation() &&
      CheckBroadCastRoomExternalSource() &&
      CheckDateCondition()
    ) {
      const obj = {
        ...conversationData,
        conversationId: conversationState.id,
        isToCloseModal
      };
      obj.key = eventTypeBasedKey(conversationData.componentType);
      // obj.isHidden = checkIsHidden(conversationState.roomType, obj.componentType)
      batch(() => {
        dispatch(actions.saveCreatedConversationComponent(obj));
        dispatch(
          actions.savingConversationData({
            id: conversationState.id,
            name: conversationState.name,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          })
        );
      });
    }
  };

  // const checkIsHidden = (roomType: string, componentType: string) => {
  //   let isHidden = true;
  //   if (roomType === "broadcast_room" && componentType === "BROADCAST_ROOM") {
  //     isHidden = false;
  //   }
  //   return isHidden;
  // };

  const CheckBroadCastRoomExternalSource = () => {
    if (conversationData.type === "stream" && step === 3) {
      const ingestEndpoint = conversationData.ingestEndpoint;
      const liveStreamSrc = conversationData.liveStreamSrc;
      let errIngestEndpoint = "";
      let errLiveStreamSrc = "";
      if (!ingestEndpoint) {
        errIngestEndpoint = "Ingest end point is required";
      } else {
        if (
          !/((rtmp(s)|rtmp):\/\/.)(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g.test(
            ingestEndpoint
          )
        ) {
          errIngestEndpoint = "Improper Ingest end point.";
        }
      }
      if (!liveStreamSrc) {
        errLiveStreamSrc = "Live stream is required";
      } else {
        if (
          !liveStreamSrc.match(
            /((http(s)|http):\/\/.)(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g
          )
        ) {
          errLiveStreamSrc = "Improper Playback url.";
        } else if (!liveStreamSrc.includes(".m3u8")) {
          errLiveStreamSrc = "Improper Playback url.";
        }
      }
      setExternalRTMPCheck((oldState) => ({
        ...oldState,
        ingestEndpoint: errIngestEndpoint,
        liveStreamSrc: errLiveStreamSrc,
        channelName: conversationData.channelName
          ? ""
          : "Channel name is required"
      }));
      return !(errIngestEndpoint || errLiveStreamSrc);
    }
    return true;
  };

  const CheckDateCondition = () => {
    if (
      [MEETING_TYPES.MEETING_ROOM, MEETING_TYPES.BROADCAST_ROOM].includes(
        conversationData.componentType
      )
    ) {
      try {
        if (conversationState.startDate && conversationState.startTime) {
          const tz = conversationState.timezone
            ? conversationState.timezone.value.split(" ").pop()
            : moment.tz.guess();
          const componentTime = moment(
            convertTime(conversationData.utcStartTimeMillis, tz)
          ).format("x");
          const eventTime = moment(
            `${conversationState.startDate} ${conversationState.startTime}`
          ).format("x");
          if (errFieldsState?.dateError || componentTime < eventTime) {
            const fieldErrorobj = {
              ...errFieldsState,
              dateError: "You cannot select a past date."
            };
            dispatch(actions.setConversationFieldErrorState(fieldErrorobj));
            setStep(2);
            return false;
          }
        }
      } catch { }
      return true;
    }
    return true;
  };

  const checkValidation = () => {
    let formIsValid = true;
    const errs = error;
    if (!conversationData.title || conversationData.title.length <= 0) {
      errs.title = "Name is required";
      formIsValid = false;
    } else errs.title = "";
    if (
      !conversationData.componentType ||
      conversationData.componentType.length <= 0
    ) {
      errs.componentType = "Type is required";
      formIsValid = false;
    } else errs.componentType = "";
    setError((err) => ({ ...err, ...errs }));
    if (!formIsValid && step !== 1) {
      setStep(1);
    }
    return formIsValid;
  };

  const saveData = (isToCloseModal?: boolean) => {
    saveConversationComponent(isToCloseModal);
  };

  const onNext = (steps: number, allowed: boolean) => {
    if (
      checkValidation() &&
      !minuteError &&
      isEmpty(errFieldsState.dateError)
    ) {
      const state = cloneDeep(conversationData);
      if (
        steps === 3 &&
        isEmpty(get(state, "title", "")) &&
        (state.componentType === MEETING_TYPES.MEETING_ROOM ||
          state.componentType === MEETING_TYPES.BROADCAST_ROOM)
      ) {
        set(state, "title", state.title);
        set(state, "name", state.title);
      }
      dispatch(actions.createConversationComponentActions(state));
      if (
        [MEETING_TYPES.MEETING_ROOM, MEETING_TYPES.BROADCAST_ROOM].includes(
          conversationData.componentType
        ) &&
        step === 3
      ) {
        if (steps <= 2) {
          setStep(steps);
        } else if (allowed) {
          setCurrentActiveKey(`${+currentActiveKey + 1}`);
        }
      }
      else if (conversationData.componentType === MEETING_TYPES.LOBBY) {
        if (steps <= 2) {
          setStep(steps);
        } else if (allowed) {
          setCurrentActiveKey(`${+currentActiveKey + 1}`);
        }
      }
      else {
        setStep(steps);
      }
    }
  };

  const ActionButton = (
    <UIModalFooter buttonAlignments='center'>
      <React.Fragment>
        {twoStepEvent.includes(conversationData.componentType) ? (
          <div
            className={classNames("modal-btn-m0 ", {
              "space-between":
                step === 1 || (step === 2 && currentActiveKey !== "4"),
              // "step-modal-btn":
              //   conversationData.componentType === MEETING_TYPES.LOBBY &&
              //   step === 2 &&
              //   currentActiveKey !== "4"
            })}
          >
            <StepsButtons
              step={step}
              currentActiveKey={""}
              isModalLoading={isModalLoading}
              onCloseModal={onCloseModal}
              onNext={onNext}
              saveData={saveData}
              saveExit={saveExit}
              setStep={(newStep: number) => {
                if (step === 2 && currentActiveKey !== "0") {
                  setCurrentActiveKey(`${+currentActiveKey - 1}`);
                } else {
                  setStep(newStep);
                }
              }}
              availabelSteps={2}
            />
          </div>
        ) : (
          <div
            className={classNames("modal-btn-m0 ", {
              "space-between":
                step === 1 || (step === 3 && currentActiveKey !== "0"),
              "step-modal-btn":
                step === 2 ||
                (step === 3 && currentActiveKey === "0") ||
                currentActiveKey === "1"
            })}
          >
            <StepsButtons
              step={step}
              currentActiveKey={currentActiveKey}
              isModalLoading={isModalLoading}
              onCloseModal={onCloseModal}
              onNext={onNext}
              saveData={saveData}
              saveExit={saveExit}
              setStep={(newStep: number) => {
                if (step === 3 && currentActiveKey !== "0") {
                  setCurrentActiveKey(`${+currentActiveKey - 1}`);
                } else {
                  setStep(newStep);
                }
              }}
              availabelSteps={3}
            />
          </div>
        )}
      </React.Fragment>
    </UIModalFooter>
  );
  return (
    <UIModal
      show={showCreateEditConversationComponent}
      onHide={onCloseModal}
      title={modalName}
      hasFooterBorder={false}
      backdrop='static'
      minHeight={"calc(100vh - 300px)"}
      maxHeight={"calc(100vh - 300px)"}
      footer={ActionButton}
    >
      <>
        {isModalLoading && (
          <LoadingSpinner
            position={"absolute"}
            spinnerPosition={"absolute"}
            spinnerTop={"50%"}
            spinnerLeft={"38%"}
            withCoverBg={true}
          />
        )}
        <Row>
          <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
            <ModalSteps
              className='modal-step'
              count={
                twoStepEvent.includes(conversationData.componentType) ? 2 : 3
              }
            >
              <div
                className={classNames({
                  step: true,
                  active: step >= 1,
                  complete: step > 1
                })}
                onClick={() => onNext(1, false)}
              >
                <span>1</span>
                <p>Information</p>
              </div>
              <div
                className={classNames({
                  step: true,
                  active: step >= 2,
                  complete: step > 2
                })}
                onClick={() => onNext(2, false)}
              >
                <span>2</span>
                <p>
                  {twoStepEvent.includes(conversationData.componentType)
                    ? "Configuration"
                    : "Schedule"}
                </p>
              </div>
              {!twoStepEvent.includes(conversationData.componentType) && (
                <div
                  className={classNames({
                    step: true,
                    active: step >= 3,
                    complete: step > 3
                  })}
                  onClick={() => onNext(3, false)}
                >
                  <span>3</span>
                  <p>Configuration</p>
                </div>
              )}
            </ModalSteps>
          </Col>
        </Row>
        {step === 1 ? (
          <UIFormGroup>
            <ScrollBar>
              <Row>
                <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
                  <UIInput
                    label='Name'
                    placeholder='Enter name'
                    type='text'
                    required
                    value={get(conversationData, "title", "")}
                    onChange={(e) => handleFields(e, "title")}
                    hasError={!!error.title}
                    errorText={error.title}
                  />
                </Col>
              </Row>
              <Row>
                <Col
                  md={12}
                  xl={12}
                  lg={12}
                  sm={12}
                  xs={12}
                  className='mb-4 custome-search'
                >
                  <UIReactSelect2
                    placeholder='Select Component Type'
                    label='Type*'
                    options={options}
                    disabled={true}
                    menuPortalTarget={modalRef.current}
                    onChange={(selectedUser: any) =>
                      handleWithouttargetFields(
                        selectedUser.value,
                        "componentType"
                      )
                    }
                    value={
                      conversationData.componentType
                        ? createOptionWithValueChanges(
                          getEventType(conversationData.componentType),
                          conversationData.componentType
                        )
                        : ""
                    }
                    hasError={!!error.componentType}
                    errorText={error.componentType}
                  // disabled={!!selectedConversationComponent}
                  />
                  <TypeDescription className='type-description'>
                    {typeDescription(conversationData.componentType)}
                  </TypeDescription>
                </Col>
              </Row>
            </ScrollBar>
          </UIFormGroup>
        ) : step === 2 ? (
          conversationData.componentType === MEETING_TYPES.LOBBY ? (
            <AddEditConversationLobby
              currentEvent={conversationState}
              activeKey={currentActiveKey}
              changeActiveKey={setCurrentActiveKey}
            />
          ) : conversationData.componentType ===
            MEETING_TYPES.CALL_TO_ACTION ? (
            <CallToActionCard />
          ) : conversationData.componentType === MEETING_TYPES.SPONSOR_BOOTH ? (
            <ConfigureSponsorBooth {...conversationData?.sponsorData} />
          ) : conversationData.componentType ===
            MEETING_TYPES.NETWORKING_AREA ? (
            <NetworkingArea />
          ) : conversationData.componentType === MEETING_TYPES.AGENDA ? (
            <BasicCkEditor
              value={get(conversationData, "card.html", "")}
              onValueChange={(data: any) => {
                handleEditor(data, "card.html");
              }}
            />
          ) : (
            <DefineBehaviourModal
              currentEvent={conversationState}
              minuteError={minuteError}
              setMinuteError={setMinuteError}
              dateValidationCheck={CheckDateCondition}
            />
          )
        ) : (
          <ConfigureMeetingRoom
            externalRTMPCheck={externalRTMPCheck}
            activeKey={currentActiveKey}
            changeActiveKey={setCurrentActiveKey}
          />
        )}
      </>
    </UIModal>
  );
};
export default CreateEditConversationComponent;
const ScrollBar = styled(PerfectScrollbar)`
  min-height: auto !important;
  .scrollbar-container {
    min-height: auto !important;
  }
  margin: -15px -30px !important;
  padding: 30px;
  height: calc(100vh - 450px);
  overflow-y: auto;
`;
const StepsButtons: React.FC<{
  step: number;
  isModalLoading: boolean;
  currentActiveKey?: string;
  onCloseModal: () => void;
  saveExit: () => void;
  onNext: (step: number, allowed: boolean) => void;
  setStep: (step: number) => void;
  saveData: (bool: boolean) => void;
  availabelSteps: 2 | 3;
}> = ({
  step,
  isModalLoading,
  onCloseModal,
  saveExit,
  setStep,
  onNext,
  saveData,
  currentActiveKey,
  availabelSteps
}) => {
    if (availabelSteps === 3) {
      return (
        <React.Fragment>
          {(step === 2 || step === 3) && (
            <UIButton
              disabled={isModalLoading}
              label='Previous'
              onClick={() => setStep(step - 1)}
            />
          )}
          <UIButton
            disabled={isModalLoading}
            label='Cancel'
            border={true}
            onClick={onCloseModal}
          />

          {step !== 3 && (
            <UIButton
              disabled={isModalLoading}
              label='Save & Exit'
              onClick={saveExit}
            />
          )}
          {step !== 3 && (
            <UIButton
              disabled={isModalLoading}
              label='Next'
              onClick={() => onNext(step + 1, true)}
            />
          )}

          {step === 3 && (
            <UIButton
              disabled={isModalLoading}
              label='Done'
              onClick={() => saveData(true)}
            />
          )}
          {currentActiveKey && currentActiveKey !== "2" && step === 3 && (
            <UIButton
              disabled={isModalLoading}
              label='Next'
              onClick={() => onNext(step + 1, true)}
            />
          )}
        </React.Fragment>
      );
    } else if (availabelSteps === 2) {
      return (
        <React.Fragment>
          {step === 2 && (
            <UIButton
              disabled={isModalLoading}
              label='Previous'
              onClick={() => setStep(step - 1)}
            />
          )}
          <UIButton
            disabled={isModalLoading}
            label='Cancel'
            border={true}
            onClick={onCloseModal}
          />
          {step !== 2 && (
            <UIButton
              disabled={isModalLoading}
              label='Save & Exit'
              onClick={saveExit}
            />
          )}
          {step !== 2 && (
            <UIButton
              disabled={isModalLoading}
              label='Next'
              onClick={() => onNext(step + 1, true)}
            />
          )}
          {step === 2 && (
            <UIButton
              disabled={isModalLoading}
              label='Done'
              onClick={() => saveData(true)}
            />
          )}
          {currentActiveKey && currentActiveKey !== "4" && step === 2 && (
            <UIButton
              disabled={isModalLoading}
              label='Next'
              onClick={() => onNext(step + 1, true)}
            />
          )}
        </React.Fragment>
      );
    } else {
      return null;
    }
  };
