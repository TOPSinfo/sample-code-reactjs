import React from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const Contianer = styled.div`
  &.icon-input input {
    padding-left: 40px;
    border: dotted 2px #e9ecef !important;
  }
`;
const FormGroup = styled(Form.Group)<IProps>`
  position: relative;
  margin-bottom: 20px;
  &.right-icon .form-control {
    padding-right: 40px;
    padding-left: 12px;
    border: ${({ haserror }) =>
      haserror
        ? "solid 0.5px #eb4b4b !important;"
        : "solid 0.5px #e9ecef !important;"};
  }
  & .input-icon {
    position: absolute;
    left: 10px;
    display: flex;
    align-items: center;
    height: 100%;
  }
  &.right-icon .input-icon {
    right: 10px;
    left: inherit;
    border-left: solid 1px #fbfbfc;
  }
  &.right-icon .indicatorSeparator {
    margin-bottom: 0;
    margin-top: 0;
    width: 1px;
    position: absolute;
    right: 34px;
    height: 38px;
    padding: 0;
    background-color: ${({ haserror }) => (haserror ? "" : "#cccccc")};
  }
  span.error {
    color: #eb4b4b;
    font-size: 12px;
    margin-top: 8px;
    display: block;
  }
`;

const FormLabel = styled(Form.Label)`
  margin: 0 0 5px 0;
  font-size: 14px;
  font-weight: normal;
`;

const FormControl = styled(Form.Control)`
  border-radius: 2px;
  font-size: 14px;
  border: solid 0.5px #e9ecef;
  height: 38px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: var(--grey);
  }
  :-ms-input-placeholder {
    color: var(--grey);
  }
  /* Chrome, Safari, Edge, Opera */
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  [type="number"] {
    -moz-appearance: textfield;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;
interface IProps {
  value?: any;
  placeholder?: string;
  type?: string;
  name?: string;
  isDisabled?: boolean;
  onChange?: (e: any) => void;
  hasError?: boolean;
  error?: string;
  isRequired?: any;
  titleName: string;
  extraPara?: any;
  isIcon?: boolean;
  icon?: string;
  iconInRight?: boolean;
  isArray?: boolean;
  as?: any;
  isReadOnly?: boolean;
  onFocus?: () => void;
  reference?: any;
}
export const InputField = (props: IProps) => {
  const {
    value,
    placeholder,
    type,
    name,
    isDisabled,
    onChange,
    hasError,
    error,
    isRequired,
    titleName,
    isIcon,
    icon,
    iconInRight,
    isArray,
    as,
    isReadOnly,
    onFocus,
    reference
  } = props;
  return (
    <Contianer className={isIcon ? "icon-input" : ""}>
      <FormGroup
        controlId='formBasicName'
        className={iconInRight ? "event-control right-icon" : "event-control "}
        haserror={hasError ? 1 : 0}
      >
        {!isArray && <FormLabel>{titleName}</FormLabel>}
        <InputWrapper>
          {iconInRight && <div className='indicatorSeparator' />}
          {isIcon && (
            <img src={icon} width='20' className='input-icon' alt='icons' />
          )}
          <FormControl
            className={
              hasError
                ? "form-control fadeIn second error"
                : "form-control fadeIn second"
            }
            value={value}
            type={type}
            name={name}
            controlid={name}
            disabled={isDisabled}
            onChange={onChange}
            aria-required='true'
            required={isRequired}
            placeholder={placeholder}
            as={as}
            readOnly={isReadOnly}
            onFocus={onFocus}
            ref={reference}
          />
        </InputWrapper>
        {hasError && <span className='error'>{error}</span>}
      </FormGroup>
    </Contianer>
  );
};

export default InputField;
