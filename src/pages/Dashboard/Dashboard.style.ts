import styled, { css } from "styled-components";

const transitionall = css`
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
`;
const eventp = css`
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: #717b88;
`;
const Heading = css`
  font-family: Roboto;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #283747;
`;
const flexCenter = css`
  display: flex;
  align-items: center;
`;
const flexCenterMiddle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const iconbox = css`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #072157;
`;
const eventtitle = css`
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #283747;
`;
const cardtitle = css`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #283747;
  margin-bottom: 0;
  user-select: none;
`;
const cardp = css`
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: normal;
  color: #8a9fba;
`;
interface CardBoxProps {
  withoutPadding?: boolean;
}
export const H2 = styled.h2`
  display: flex;
  justify-content: space-between;
  & .close-icon {
    cursor: pointer;
    text-decoration: none;
  }
`;
export const CardBox = styled.div<CardBoxProps>`
  width: 100%;
  padding: 20px 30px 30px 30px;
  border-radius: 4px;
  background-color: #ffffff;
  margin-bottom: 30px;
  ${(props) =>
    props.withoutPadding &&
    `
  padding: 0;
  h2 {
    padding: 25px 30px 10px 30px;
  }
  `}
  &:last-child {
    margin-bottom: 0;
  }

  h2 {
    ${Heading}
    margin-bottom: 10px;
  }
  .event-box {
    cursor: pointer;
    padding: 27px 30px 24px;
    border-radius: 4px;
    border: solid 1px #e9ecef;
    background-color: #ffffff;
    margin: 15px 0;
    min-height: 110px;
    cursor: pointer;
    &:hover {
      box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
      ${transitionall}
      .event-icon {
        border-color: #0057e4 !important;
        i {
          color: #0057e4 !important;
        }
      }
      h3 {
        color: #0057e4 !important;
      }
      p {
        color: #283747 !important;
      }
    }
    .event-inrbox {
      ${flexCenter}
      .event-icon {
        ${iconbox}
        i {
          font-size: 22px;
        }
      }
      .eventbox-right {
        margin-left: 20px;
        flex: 1;
        h3 {
          ${eventtitle}
          margin-bottom: 4px;
        }
        p {
          ${eventp}
        }
      }
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    .event-box {
      padding: 20px;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    .event-box {
      min-height: 137px;
      align-items: center;
      display: flex;
    }
  }
  @media (max-width: 767px) {
    h2 {
      font-size: 16px;
    }
    .event-box {
      margin: 7px 0;
      .eventbox-right {
        h3 {
          font-size: 15px;
        }
      }
    }
    .tabsicons {
      position: relative;
      right: 0;
      top: 0;
      margin: 30px 0 15px 0;
      ${flexCenterMiddle}
      a {
        margin: 0 10px;
      }
    }

    .tab-content {
      .tab-content-box {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  }
`;
export const Custometab = styled.div`
  position: relative;
  .nav {
    border-color: #c0c0c0;
    a {
      min-width: 100px;
      text-decoration: none;
      color: #283747;
      font-size: 14px;
      text-align: center;
      padding: 20px 0;
      margin: 0 20px;
      border: none;
      position: relative;
      &.active {
        color: #0057e4;

        &:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: #0057e4;
        }
      }
    }
  }
  .tab-content {
    padding: 15px;
    min-height: 242px;
  }
  /*.nav {
    a.nav-item {
      padding: 14px 10px;
      margin: 0 10px 0 0;
      min-width: auto;
    }
  }*/

  a.devide-icon:before {
    display: none;
  }
  .card {
    width: 243px;
    &.selected {
      box-shadow: 0 15px 25px 0 rgba(0, 0, 0, 0.12);
      ${transitionall}
    }
    &:hover {
      box-shadow: 0 15px 25px 0 rgba(0, 0, 0, 0.12);
      ${transitionall}
    }
    .card-image-box {
      width: 100%;
      height: 128px;
      ${flexCenterMiddle}
      position: relative;
      .card-image-sdblock {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        right: 0;
        background: rgba(0, 0, 0, 0.47);
        ${flexCenterMiddle}
      }
    }
    .card-body {
      padding: 8px 16px;

      .card-title {
        ${cardtitle}
      }

      p {
        ${cardp}
      }
    }
  }
  .tab-content-box {
    .card {
      margin: 0.4% 0.4%;
    }
  }
  .card-meetup {
    cursor: pointer;
    .card-image-box {
      background: #e6e6e6 !important;
    }
  }

  .card-default {
    .card-image-box {
      background: #dbe5f9 !important;
    }
  }
  .ps__rail-y {
    opacity: 1;
  }
`;

export const Card = styled.div`
  width: 243px;

  &:hover {
    box-shadow: 0 15px 25px 0 rgba(0, 0, 0, 0.12);
    ${transitionall}
  }
  .card-image-box {
    width: 100%;
    height: 128px;
    ${flexCenterMiddle}
    position: relative;
    .card-image-sdblock {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      right: 0;
      background: rgba(0, 0, 0, 0.47);
      ${flexCenterMiddle}
    }
  }
  .card-body {
    padding: 8px 16px;

    .card-title {
      ${cardtitle}
    }

    p {
      ${cardp}
    }
  }
`;

export const CardMeetup = styled.div`
  .card-image-box {
    background: #e6e6e6 !important;
  }
`;

export const CardDefault = styled.div`
  .card-image-box {
    background: #dbe5f9 !important;
  }
`;

export const CardContentBox = styled.div`
  display: flex;
  .card {
    margin: 15px 15px;
  }
`;

export const TabsIcons = styled.div`
  position: absolute;
  right: 0;
  top: 18px;
  display: flex;
  height: 22px;

  a {
    text-decoration: none;
    color: #8a9fba;
    font-size: 20px;
    margin-right: 30px;
    ${transitionall}
    .img-svg {
      width: 20px;
      height: 20px;
      &:hover {
        color: #0057e4 !important;
      }
    }
    &.disable {
      pointer-events: none;
      cursor: default;
      opacity: 0.5;
    }
    &:hover {
      i {
        &:before {
          color: #0057e4 !important;
        }
      }
    }
  }
`;

export const CardBoxHeader = styled.div`
  ${Heading}
  margin-bottom: 10px;
`;
