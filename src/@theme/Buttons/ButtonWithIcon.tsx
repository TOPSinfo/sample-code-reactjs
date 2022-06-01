import React from "react";
import styled from "styled-components";
interface IProps {
  btnName?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  icon?: string;
  leftIcon?: boolean;
  bigIcon?: boolean;
}

const ButtonWithIconBtn = styled.button<IProps>`
  margin: 0px;
  border-radius: 2px;
  border: none;
  background-color: var(--white);
  font-size: 16px;
  line-height: 40px;
  letter-spacing: normal;
  min-width: 120px;
  color: var(--tops-blue);
  text-align: left;
  padding: 0 10px;
  display: flex !important;
  align-items: center;
  margin-left: 10px;
  outline: none;
  justify-content: center;
  &.bg-blue-btn {
    background: var(--tops-blue);
    color: var(--white);
    display: flex;
    outline: none;
  }
  > span {
    flex: 1;
  }
  > img {
    padding-right: 10px;
    vertical-align: middle;
  }
  &:focus {
    border: none;
    box-shadow: none;
  }
`;
const ButtonWithSmallIconBtn = styled.button<IProps>`
  &.btn {
    margin-left: 10px;
    font-size: 12px;
    min-width: 120px;
    height: 40px;
    font-weight: normal;
  }
  &.btn-icon {
    min-width: inherit;
    border: none;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &.blue-btn {
    border: 1px solid var(--tops-blue);
    background: var(--tops-blue);
    color: var(--tops-blue);
  }
  & .btn-icon > img {
    width: 16px;
  }
  &:focus {
    border: none;
    box-shadow: none;
  }
`;
const Icon = styled.img``;

export function ButtonWithIcon({
  btnName,
  className,
  onClick,
  disabled,
  type,
  icon,
  leftIcon,
  bigIcon
}: IProps) {
  return bigIcon ? (
    <ButtonWithIconBtn
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {!leftIcon && <span>{btnName}</span>}
      <Icon src={icon} alt='calender' width='25' />
      {leftIcon && btnName}
    </ButtonWithIconBtn>
  ) : (
    <ButtonWithSmallIconBtn
      className={className}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <Icon src={icon} alt='calender' width='16' />
    </ButtonWithSmallIconBtn>
  );
}
