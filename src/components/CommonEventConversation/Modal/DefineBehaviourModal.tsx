import React, { useState, useEffect } from "react";
import { UIFormGroup, UIInput, UIRadio, UICheckbox } from "@theme";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "modules/selectors";
import * as actions from "modules/actions";
import { get, set, cloneDeep, isEmpty } from "lodash";
import moment from "moment-timezone";
import TimePicker from "@theme/TimePicker";
import styled from "styled-components";
import PerfectScrollbar from "react-perfect-scrollbar";
import { convertToNewTimeZone, convertTime } from "modules/utils/commonFn";
moment.suppressDeprecationWarnings = true;
export const DefineBehaviourModal = ({
  currentEvent,
  minuteError,
  setMinuteError,
  dateValidationCheck
}: any) => {
  const dispatch = useDispatch();
  const componentType = useSelector(selectors.getEventType)
  const [isTimePickerFocused, setIsTimePickerFocused] = useState(false);
  const selectedEventComponent = useSelector(
    selectors.getSelectedEventComponents
  );

  const dt =
    currentEvent?.startDate && currentEvent?.startTime
      ? moment(currentEvent.startDate + " " + currentEvent.startTime).toDate()
      : moment().toDate();
  const tz = currentEvent.timezone
    ? currentEvent.timezone.value.split(" ").pop()
    : moment.tz.guess();
  const isToday = moment().tz(tz).isSame(dt, "day");
  const [minTime, setMinTime] = useState(
    !isToday ? moment().startOf("day").toDate() : dt
  );
  // const eventData = useSelector(selectors.getEventComponentData);
  const eventDetail = useSelector(selectors.getEventComponentData);
  const conversationDetail = useSelector(selectors.getConversationComponentData);
  const eventData = componentType === "conversation" ? conversationDetail : eventDetail;

  const selectedDateTime = get(eventData, `utcStartTimeMillis`, null);
  const errFieldsState = useSelector(selectors.getFieldEventErrorState);

  const [dateValue, setStateValue] = useState(
    selectedDateTime ? convertTime(selectedDateTime, tz) : dt
  );

  useEffect(() => {
    if (currentEvent?.startDate) {
      const dt =
        currentEvent?.startDate && currentEvent?.startTime
          ? moment(
            currentEvent.startDate + " " + currentEvent.startTime
          ).toDate()
          : moment().toDate();
      if (
        moment(selectedDateTime).format("YYYY-MM-DD") ===
        moment(dt).format("YYYY-MM-DD")
      ) {
        setMinTime(dt);
      } else {
        setMinTime(moment(selectedDateTime).startOf("day").toDate());
      }
    } else {
      if (
        moment(selectedDateTime).format("YYYY-MM-DD") ===
        moment().format("YYYY-MM-DD")
      ) {
        setMinTime(moment().toDate());
      } else {
        setMinTime(moment(selectedDateTime).startOf("day").toDate());
      }
    }
  }, [currentEvent?.startDate, currentEvent?.startTime, selectedDateTime]);

  useEffect(() => {
    if (currentEvent?.startDate && selectedEventComponent) {
      const dt =
        currentEvent?.startDate && currentEvent?.startTime
          ? moment(
            currentEvent.startDate + " " + currentEvent.startTime
          ).toDate()
          : moment().toDate();
      if (dt) {
        dateValidationCheck();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentEvent?.startDate,
    currentEvent?.startTime,
    selectedEventComponent
  ]);

  const handleWithouttargetFields = (value: any, path: any) => {
    const eventState = cloneDeep(eventData);
    set(eventState, path, value);
    if (path === `utcStartTimeMillis`)
      set(eventState, "utcStartTimeMillis", value);
    if (!("visible" in eventState)) set(eventState, "visible", true);

    if (componentType === "conversation") {
      dispatch(actions.createConversationComponentActions(eventState));
    } else {
      dispatch(actions.createEventComponentActions(eventState));
    }
  };

  const onChangeDate = (date: Date) => {
    const dt =
      currentEvent?.startDate && currentEvent?.startTime
        ? moment(currentEvent.startDate + " " + currentEvent.startTime).toDate()
        : moment().toDate();
    const currentSelected = moment(date).add().format("x");
    const prevSelected = moment(dt).startOf("minute").format("x");
    if (date) {
      let timeStamp = moment(date).valueOf();
      setStateValue(date.toISOString());
      timeStamp = convertToNewTimeZone(date, tz);
      handleWithouttargetFields(timeStamp, `utcStartTimeMillis`);
      setIsTimePickerFocused(false);
      if (currentSelected >= prevSelected) {
        const fieldErrorobj = {
          dateError: ""
        };
        dispatch(actions.setEventFieldErrorState(fieldErrorobj));
      } else {
        const fieldErrorobj = {
          dateError: "Selected Date is not Valid"
        };
        dispatch(actions.setEventFieldErrorState(fieldErrorobj));
      }
    }
  };
  useEffect(() => {
    return () => {
      const fieldErrorobj = {
        dateError: ""
      };
      dispatch(actions.setEventFieldErrorState(fieldErrorobj));
    };
  }, [dispatch]);
  return (
    <UIFormGroup>
      <ScrollBar>
        {" "}
        <Row>
          <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
            <TimePicker
              placeholder='Select date and time'
              label={"Date/Time"}
              inputIcon={"icon-moon icon-ic-event-white"}
              name='utcStartTimeMillis'
              dateFormat={"d MMM yyyy hh:mm a"}
              minDate={
                currentEvent?.startDate && currentEvent?.startTime
                  ? moment(
                    currentEvent.startDate + " " + currentEvent.startTime
                  ).toDate()
                  : moment().toDate()
              }
              minTime={minTime}
              maxTime={
                currentEvent?.startDate && currentEvent?.startTime
                  ? moment(
                    currentEvent.startDate + " " + currentEvent.startTime
                  )
                    .endOf("day")
                    .toDate()
                  : moment().endOf("day").toDate()
              }
              showTimeSelect={true}
              timeIntervals={30}
              timeFormat={"hh:mm a"}
              onCalendarOpen={() => setIsTimePickerFocused(true)}
              onCalendarClose={() => setIsTimePickerFocused(false)}
              onChange={onChangeDate}
              value={dateValue}
              hasError={!isEmpty(errFieldsState?.dateError)}
              errorText={errFieldsState?.dateError}
              onClickOutside={dateValidationCheck}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
            <span className='step-span'>Lasts</span>
            <div className='lasts'>
              <UIInput
                type='number'
                hasError={!!minuteError}
                errorText={minuteError}
                onChange={(e) => {
                  if (+e.target.value > 1440) {
                    setMinuteError("A meeting can last up to 1440 min");
                    e.preventDefault();
                  } else if (minuteError !== "") {
                    setMinuteError("");
                  }
                  if (+e.target.value < 0) {
                    setMinuteError("Meeting duration can't be negative.");
                    e.preventDefault();
                  }
                  handleWithouttargetFields(
                    Math.abs(parseInt(e.target.value)),
                    `durationMinutes`
                  );
                }}
                value={get(eventData, `durationMinutes`, 0)}
              />
              <p>minutes</p>
            </div>
          </Col>
        </Row>
        {!isTimePickerFocused && (
          <Row>
            <Col
              md={12}
              xl={12}
              lg={12}
              sm={12}
              xs={12}
              className='mb-4 visibility-schedule checkbox-fs-14'
            >
              <span className='step-span'>Visibility in the schedule</span>
              <UIRadio
                label='Public'
                name='public'
                onChange={() => {
                  handleWithouttargetFields(true, `visible`);
                }}
                isChecked={get(eventData, `visible`, true)}
              />
              <div className='mt-2'>
                <UICheckbox
                  label='Promote this session'
                  name='Promote this session'
                  position='after'
                  isChecked={get(eventData, "promoteSession", false)}
                  onChange={(e) =>
                    handleWithouttargetFields(
                      e.target.checked,
                      "promoteSession"
                    )
                  }
                  isWidth
                />
              </div>

              {/* <UIRadio
                label='Authorized users only'
                name='authorized'
                onChange={() => {
                  handleWithouttargetFields(false, `visible`);
                }}
                isChecked={!get(eventData, `visible`, true)}
              /> */}
            </Col>
          </Row>
        )}
      </ScrollBar>
    </UIFormGroup>
  );
};
export default DefineBehaviourModal;

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
`;
