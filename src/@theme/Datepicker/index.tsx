import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import moment from "moment-timezone";
moment.suppressDeprecationWarnings = true;

const InputField = styled.input`
  border-radius: 2px;
  font-size: 14px;
  border: solid 0.5px #e9ecef;
  height: 38px;
  padding: 0.375rem 0.75rem;
  width: 100%;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: var(--grey);
  }
  :-ms-input-placeholder {
    color: var(--grey);
  }
  padding-right: 36px;
`;
const Label = styled.label`
  margin: 0 0 5px 0;
  font-size: 14px;
  display: block;
`;
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
  onHandleChange: (date: Date) => void;
  isIcon?: boolean;
  titleName?: string;
  icon?: string;
  timeStamp?: Date;
}
export const Datepicker = (props: IProps) => {
  const { value, onHandleChange, titleName, icon, timeStamp } = props;
  const Input = forwardRef(
    ({ onChange, placeholder, value, id, onClick }: any, ref: any) => (
      <>
        <Label>{titleName}</Label>
        <InputField
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          id={id}
          ref={ref}
          onClick={onClick}
        />
        <div className='indicatorSeparator' />
        <img
          src={icon}
          className='calendar-icon'
          onClick={onClick}
          alt='calender'
        />
      </>
    )
  );
  return (
    <Container>
      <DatePicker
        dateFormat='d MMMM yyyy'
        customInput={<Input />}
        selected={moment(value).toDate()}
        onChange={(date: Date) => onHandleChange && onHandleChange(date)}
        showMonthDropdown
        showYearDropdown
        minDate={timeStamp && timeStamp > new Date() ? timeStamp : new Date()}
      />
    </Container>
  );
};
export default Datepicker;
