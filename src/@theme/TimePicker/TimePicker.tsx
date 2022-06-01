import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const Container = styled.div`
  & .react-datepicker-wrapper {
    display: block;
  }
  & .react-datepicker__input-container {
    margin-bottom: 20px;
  }
  & .calendar-icon {
    position: absolute;
    right: 10px;
    top: 28px;
  }
  & .indicatorSeparator {
    margin-bottom: 0;
    margin-top: 0;
    width: 1px;
    position: absolute;
    right: 34px;
    height: 38px;
    padding: 0;
    background-color: #cccccc;
    top: 20px;
  }
`;
interface IProps {
  value?: any;
  placeholder?: string;
  type?: string;
  name?: string;
  onHandleChange?: (date: Date) => void;
  isIcon?: boolean;
  titleName?: string;
  icon?: string;
  timeStamp?: Date;
}
export const TimePicker = (props: IProps) => {
  const [state, setState] = useState({
    date: new Date(),
    time: true
  });
  console.log("props", props);
  const handleChange = (date: Date) => {
    setState((val) => ({ ...val, date }));
  };

  return (
    <Container>
      {state.time && (
        <DatePicker
          selected={state.date}
          onChange={(date: Date) => handleChange(date)}
          showTimeSelect
          placeholderText={props.placeholder}
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption='Time'
          dateFormat='h:mm aa'
        />
      )}
    </Container>
  );
};
export default TimePicker;
