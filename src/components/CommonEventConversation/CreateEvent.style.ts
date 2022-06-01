import styled from "styled-components";

export const CreateEventWrapper = styled.div`
  background: #fff;
  border-radius: 4px;
`;

export const CreateEventTabs = styled.div`
  position: relative;
  .tabsicons {
    top: 10px;
  }
  & .nav-tabs {
    border-bottom: solid 1px #c0c0c0;
    padding: 0 30px;
    & .nav-item {
      border: none;
      text-decoration: none;
      font-size: 14px;
    }
    & .nav-link.active {
      color: #0057e4;
      border-bottom: 4px solid #0057e4;
      padding-bottom: 14px;
    }
  }
  & .tab-content {
    padding: 30px 30px 10px 30px;
    & .overview-wrapper {
      label {
        font-weight: normal !important;
      }
    }
    & .custome-filebrowse {
      .container {
        max-width: 100%;
      }
      label {
        font-size: 14px;
        color: #283747;
        margin-bottom: 5px;
      }
      & .dropzone {
        p {
          display: flex;
          align-items: center;
        }
      }
    }
    & .border-none {
      border: none;
      padding: 0px;
    }
  }
  @media (max-width: 767px) {
    & .nav-tabs {
      padding: 0px;
    }
    & .nav-item {
      padding-left: 10px;
      padding-right: 10px;
    }
    & .tab-content {
      padding: 15px 0 0 0;
    }
  }
`;

export const CreateEventHead = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  @media (max-width: 767px) {
    padding: 15px 0;
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 767px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    flex-direction: column;
  }
`;

export const CreateEventHeadRight = styled.div`
  button {
    min-width: 80px;
    height: 30px;
    padding: 6px 12px;
    margin: 0 8px;
    font-weight: 700;
  }
  :last-child {
    margin-right: 0px;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 767px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
`;

export const CreateEventHeadLeft = styled.div`
  display: flex;
  align-items: center;
  & .icon-moon {
    cursor: pointer;
    font-size: 24px;
    color: #0057e4;
  }
  & .create-event-head-title {
    display: flex;
    flex-direction: column;
    padding-left: 30px;
  }
  label {
    font-size: 18px;
    font-weight: bold;
    color: #283747;
    line-height: normal;
    margin-bottom: 2px;
  }
  p {
    font-size: 14px;
    font-weight: normal;
    color: #283747;
  }
  & .create-event-head-calendar {
    background: #f2f6fd;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 28px;
    margin-left: 30px;
    .icon-moon {
      cursor: pointer;
      font-size: 24px;
      color: #0057e4;
    }
  }
  & img {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 28px;
    margin-left: 30px;
  }
  @media (max-width: 767px) {
    & .create-event-head-calendar {
      margin-left: 15px;
    }
    & .create-event-head-title {
      padding-left: 15px;
    }
    button {
      margin: 0 5px;
    }
  }
`;

export const AttendeesWrapper = styled.div`
  & .radio-btn {
    label {
      font-size: 14px;
    }
  }

  @media (max-width: 767px) {
    & .radio-btn {
      margin-bottom: 10px;
      :last-child {
        margin-bottom: 0px;
      }
    }
    & .newly-components {
      display: flex;
      & .custom-checkbox {
        label:before {
          flex: none;
        }
        label:after {
          top: auto;
        }
      }
    }
  }

  & .title-500 {
    display: block;
    font-size: 14px;
    font-weight: 500;
  }

  & .groups-policies {
    display: flex;
    padding-right: 60px;
    .custom-button {
      margin-left: 16px;
    }
  }
  & .info-icon {
    margin-left: 8px;
  }
  & .no-display {
    opacity: 0;
    pointer-events: none;
  }
`;

export const CustomFlexDiv = styled.div`
  display: flex;
  align-items: center;
  & .custom-checkbox {
    flex: 1;
    padding-right: 10px;
    label:before {
      flex: none;
    }
    input:checked + label:after {
      top: auto;
    }
  }
  & .custom-select {
    flex: none;
    width: 242px;
  }
  span {
    margin-right: 8px;
    font-size: 14px;
  }
  & .text-box {
    width: 40px;
    margin-right: 8px;
    label {
      display: none;
    }
  }
  & .text-box input[type="number"]::-webkit-inner-spin-button,
  & .text-box input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  img {
    cursor: pointer;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    & .custom-select {
      width: 90% !important;
      margin-top: 10px;
    }
    & .info-icon {
      position: absolute;
      right: 20px;
      bottom: 12px;
    }
  }
`;

export const EventDayWrapper = styled.div`
  display: flex;
  align-items: center;
  & .custom-select {
    width: 150px;
    margin-right: 8px;
  }
  span {
    margin-right: 8px;
    font-size: 14px;
  }
  .text-box {
    width: 40px;
    margin-right: 8px;
    label {
      display: none;
    }
  }
  .text-box input[type="number"]::-webkit-inner-spin-button,
  .text-box input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  img {
    cursor: pointer;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    margin-top: -8px;
    span {
      margin-right: 0px;
      margin-top: 8px;
    }
    & .text-box {
      width: 100%;
      margin-right: 0px;
      margin-top: 8px;
    }
    img {
      margin-top: 8px;
    }
    & .custom-select {
      width: 100%;
      margin-right: 0px;
      margin-top: 8px;
    }
  }
`;

export const Remindar = styled.div`
  a {
    color: #0057e4;
    font-size: 14px;
    text-decoration: none;
    margin-top: 5px;
    display: inline-block;
  }
`;

export const GroupPolicies = styled.div`
  display: flex;
  padding-right: 60px;
  & .custom-button {
    margin-left: 16px;
  }
  @media (max-width: 767px) {
    padding-right: 0px;
  }
`;

export const RegistrationDiv = styled.div``;
export const VerticleLine = styled.span`
  border: 1px solid #c0c0c0;
  margin-right: 30px;
`;
