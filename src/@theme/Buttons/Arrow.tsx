import React from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";

interface IProps {
  direction?: "left" | "right";
  background?: FlattenSimpleInterpolation | string;
}

const getArrowBackground = (background?: FlattenSimpleInterpolation | string) =>
  background || css`linear-gradient(to bottom, #00d7ef, #00afef)`;

const Icon = styled.div<IProps>`
  position: relative;
  width: 28px;
  height: 28px;
  background-image: ${(props) => getArrowBackground(props.background)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--white);
  flex-shrink: 0;
  svg {
    height: 100%;
    width: 100%;
    transform: scale(1.3, 1.3)
      rotate(${(props) => (props.direction === "left" ? "0deg" : "180deg")})
      translateX(${(props) => (props.direction === "left" ? "1px" : "0px")});
    stroke-width: 2;
    stroke: currentColor;
  }
`;

export default function Arrow({ direction = "right", background }: IProps) {
  return (
    <Icon direction={direction} background={background}>
      {/* ARROW ICON */}
      <svg viewBox='0 0 31 31'>
        <path d='M3,7,0,3.5,3,0' transform='translate(11 12)' />
        <path d='M7,.583H0' transform='translate(12 14.917)' />
      </svg>
    </Icon>
  );
}
