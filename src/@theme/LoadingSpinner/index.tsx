import React, { ReactElement } from "react";
import styled, { css } from "styled-components";

interface ILoadingComponent {
  readonly withCoverBg?: boolean;
  readonly position?: string;
  readonly spinnerPosition?: string;
  readonly spinnerTop?: string;
  readonly spinnerLeft?: string;
}

const LoadingSpinnerStyled = styled.div<ILoadingComponent>`
  margin: 1em auto;
  width: 100px;
  height: 40px;
  text-align: center;
  font-size: 10px;

  ${(props) => props.spinnerPosition && `position: ${props.spinnerPosition};`}
  ${(props) => props.spinnerTop && `top: ${props.spinnerTop};`}
  ${(props) => props.spinnerLeft && `left: ${props.spinnerLeft};`}
  
  > div {
    height: 100%;
    width: 6px;
    display: inline-block;
    margin: 0 3px;
    background: #192150;
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }

  .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  .rect3 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  @-webkit-keyframes sk-stretchdelay {
    0%,
    40%,
    100% {
      -webkit-transform: scaleY(0.4);
    }
    20% {
      -webkit-transform: scaleY(1);
    }
  }

  @keyframes sk-stretchdelay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
      -webkit-transform: scaleY(1);
    }
  }
`;

const SpinnerWithCoverStyles = (position?: string) => css`
  position: absolute;
  display: flex;
  align-items: ${position || "flex-start"};
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 5;
  user-select: none;
  background-color: rgba(255, 255, 255, 0.35);
`;

const LoadingSpinnerWrapper = styled.div`
  pointer-events: none;
  ${({ withCoverBg, position }: ILoadingComponent) =>
    withCoverBg ? SpinnerWithCoverStyles(position) : ""}
`;

export const LoadingSpinner = ({
  withCoverBg,
  spinnerPosition,
  spinnerTop,
  spinnerLeft,
  position
}: ILoadingComponent): ReactElement => (
  <LoadingSpinnerWrapper
    withCoverBg={withCoverBg}
    position={position}
    className={"loading-spinner"}
  >
    <LoadingSpinnerStyled
      spinnerPosition={spinnerPosition}
      spinnerTop={spinnerTop}
      spinnerLeft={spinnerLeft}
    >
      <div className='rect1' />
      <div className='rect2' />
      <div className='rect3' />
      <div className='rect4' />
      <div className='rect5' />
    </LoadingSpinnerStyled>
  </LoadingSpinnerWrapper>
);

export default LoadingSpinner;
