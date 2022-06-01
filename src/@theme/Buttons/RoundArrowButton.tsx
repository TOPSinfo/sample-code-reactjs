import React from "react";
import styled, { css, FlattenSimpleInterpolation } from "styled-components";
import { NavLink } from "react-router-dom";
import Arrow from "@theme/Buttons/Arrow";

const defaultBackground = css`linear-gradient(to bottom, #00d7ef, #00afef)`;

interface IProps {
  direction?: "left" | "right";
  title?: string;
  to: string;
  arrowBackground?: FlattenSimpleInterpolation | string;
}

const Link = styled(NavLink)`
  font-family: "Nunito Sans", sans-serif;
  color: $gray-dark-color;
  font-size: 1.07em;
  font-weight: 700;
  text-decoration: none;
  position: relative;
  &:hover,
  &:active {
    text-decoration: none;
    color: initial;
  }
  .header-navigation-container > & + & {
    margin-top: 5px;
  }
`;

export function RoundArrowButton({
  direction = "right",
  title = "",
  to = "/",
  arrowBackground
}: IProps) {
  return (
    <Link to={to} className='d-flex flex-row align-items-center'>
      <Arrow
        direction={direction}
        background={arrowBackground || defaultBackground}
      />
      {title && <div className='title text-nowrap ml-2'>{title}</div>}
    </Link>
  );
}
