import React from "react";
import Poster from "assets/img/icons/login-poster.svg";
import ResetPoster from "assets/img/icons/reset-poster.svg";
import Styled from "styled-components";

const Container = Styled.div`
  
  background-color: var(--tops-blue);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 70px;
  & .img-fluid{
    height: 100vh;
  }
`;
interface IProps {
  resetComponent?: boolean;
}
export function LoginRightPanel(props: IProps) {
  return (
    <Container className='login-signup-right'>
      {props.resetComponent ? (
        <img className='img-fluid' src={ResetPoster} alt='ResetPoster' />
      ) : (
        <img className='img-fluid' src={Poster} alt='tops' />
      )}
    </Container>
  );
}
