import styled from "styled-components/macro";
export const LocationResultsContainer = styled.div`
  display: block;
  position: relative;
  margin-top: 0 !important;
  width: 100%;
  & > div {
    background-color: #ffffff;
    border: 1px solid #ededee;
    box-shadow: 0 2px 10px 0 rgba(0, 47, 110, 0.22);
    list-style: none;
    max-height: 444px;
    overflow-y: auto;
    padding: 10px;
    position: absolute;
    border-radius: 4px;
    width: 100%;
    z-index: 1;

    & > div {
      border-radius: 4px;
      cursor: pointer;
      padding: 5px 14px 5px 14px;
      &:hover {
        background-color: #c1d5f8;
      }

      &.focused {
        background-color: #c1d5f8;
      }

      & > :last-child {
        margin-left: 4px;
      }
    }
  }
`;
export const Vertical = styled.div`
  display: flex;
  flex-flow: column;
  label {
    font-size: 14px;
    color: #283747;
    margin-bottom: 5px;
  }
  input {
    border-radius: 4px;
    border: solid 1px #e9ecef;
    background-color: #ffffff;
    padding: 0 10px;
    height: 40px;
    color: #283747 !important;
    font-size: 14px;
    width: 100%;
    padding-right: 45px;
  }
`;

export const Input = styled.input`
  appearance: none;
  background-color: #ffffff;
  border: 1px solid #e8ecf1;
  border-radius: 4px;
  box-sizing: border-box;
  color: var(--font-color);
  display: flex;
  font-size: 14px;
  padding-top: calc(10px / 2);
  padding-bottom: calc(10px / 2);
  padding-left: 10px;
  padding-right: calc(22px + 10px);
  height: 38px;

  &.invalid {
    border-color: #eb4b4b;
  }

  &::placeholder {
    color: #8a9fba;
  }
`;
