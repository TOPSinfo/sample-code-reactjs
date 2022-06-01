import styled from "styled-components";

export const ModalSteps = styled.div<{ count?: number }>`
  display: flex;
  justify-content: space-between;
  padding: 0 10%;
  .step {
    text-align: center;
    cursor: pointer;
    span {
      width: 40px;
      height: 40px;
      background: #f1f5f7;
      border-radius: 50%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: bold;
      color: #283747;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        width: ${(props) => (props.count === 2 ? "600%" : "300%")};
        height: 3px;
        background: #f1f5f7;
        left: 100%;
        top: 18px;
        @media (max-width: 430px) {
          width: ${(props) => (props.count === 2 ? "300%" : "150%")};
        }
      }
    }
    &.complete {
      span {
        &::before {
          background: #0057e4;
        }
      }
    }
    &:last-child {
      span {
        &::before {
          display: none;
        }
      }
    }
    &.active {
      span {
        background: #0057e4;
        color: #fff;
      }
      p {
        color: #0057e4;
      }
    }
    p {
      font-size: 14px;
      margin-top: 12px;
      color: rgba(40, 55, 71, 0.4);
    }
  }
`;

export const TypeDescription = styled.p`
  margin: 9px 0px 10px;
  font-size: 14px;
  line-height: normal;
  color: #8a9fba;
`;
