import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import info from "assets/img/icons/ic-info.svg";
import { UIReactSelect2Label, CustomTimezone } from "./index.style";
import { UIReactSelect2Props } from "./index.types";
import UIErrorBlock from "../errorbox";
import styled from "styled-components";

const animatedComponents = makeAnimated();
/*
 * please check https://react-select.com/home for more reference
 * */
export const UIReactSelect2: React.FC<UIReactSelect2Props> = ({
  isSearchable,
  disabled,
  defaultValue,
  required,
  placeholder,
  onChange,
  onBlur,
  hasError,
  multiple,
  label,
  value,
  options,
  className,
  errorText,
  menuPortalTarget,
  menuShouldBlockScroll,
  styles,
  isIcon,
  manuOpen
}) => {
  return (
    <CheckboxWrapper className={"form-component"}>
      {label && (
        <UIReactSelect2Label hasError={hasError}>
          <span>{label}</span>
          {required && <span>*</span>}
          {isIcon && <img src={info} alt='info' className='info-icon ml-1' />}
        </UIReactSelect2Label>
      )}
      <CustomTimezone className='custom-timezone' hasError={hasError}>
        <Select
          isMulti={multiple}
          isSearchable={isSearchable}
          value={value || defaultValue}
          styles={{
            IndicatorsContainer: (base: any) => ({
              ...base,
              background: "#fbfbfc",
              borderTopRightRadius: 4,
              borderBottomRightRadius: 4,
              borderColor: "#e9ecef"
            }),
            ...styles
          }}
          components={{ ...animatedComponents, IndicatorSeparator }}
          placeholder={placeholder}
          required={required}
          menuPortalTarget={menuPortalTarget}
          menuShouldBlockScroll={menuShouldBlockScroll}
          isDisabled={disabled}
          className={className}
          onChange={onChange}
          onBlur={onBlur}
          options={options}
          hasError
          menuPlacement='auto'
          menuIsOpen={manuOpen}
        />
        {hasError && (
          <UIErrorBlock errorText={errorText || `${name} is required.`} />
        )}
      </CustomTimezone>
    </CheckboxWrapper>
  );
};
export default UIReactSelect2;
const Style = {
  alignSelf: "stretch",
  backgroundColor: "hsl(210, 16%, 93%)",
  marginBottom: 0,
  marginTop: 0,
  width: 1,
  boxSizing: "border-box"
};
const IndicatorSeparator: React.FC<{ innerProps: any }> = ({ innerProps }) => {
  return <span style={Style} {...innerProps} />;
};

export const CheckboxWrapper = styled.div`
  z-index: 2;
`;
