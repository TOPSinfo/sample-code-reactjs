import styled from "styled-components";

export const ImageWrapper = styled.div`
  .user {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 5px;
  }
`;

export const UserlistHead = styled.div`
  position: relative;
  & .user-tabsicons {
    position: absolute;
    right: 30px;
    top: 20px;
  }
`;
