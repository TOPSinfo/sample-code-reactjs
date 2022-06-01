import React from "react";
import styled from "styled-components";
interface IProps {
  btnName?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = styled.button<IProps>`
  font-size: 16px;
  display: inline-block !important;
  &.margin {
    margin-right: 1rem;
  }

  line-height: 40px;
  min-width: 130px;
  border-radius: 2px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  &.primary-btn {
    color: var(--white);
    border: 0;
    background: var(--tops-blue);
  }
  &.secondary-btn {
    border: solid 1px var(--tops-blue);
    background: var(--white);
    color: var(--tops-blue);
    padding: 0 20px;
  }
  &.danger-btn {
    background: var(--red);
    color: var(--white);
    padding: 0 20px;
    border: solid 1px #e8ecf1;
  }
  &.disable-btn {
    background: #e8ecf1;
    color: var(--grey);
    padding: 0 20px;
    border: solid 1px #e8ecf1;
  }
  &.secondary-disable-btn {
    background: var(--dark-grey);
    color: var(--grey);
    padding: 0 20px;
    border: solid 1px #e8ecf1;
  }
  &:focus {
    outline: none;
  }
`;

export function CommonButton({
  btnName,
  className,
  onClick,
  disabled,
  type
}: IProps) {
  return (
    <Button
      className={!disabled ? className : "disable-btn"}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {btnName}
    </Button>
  );
}
