import styled from "styled-components";
import { Link } from "react-router-dom";

const SideBarContainer = styled.div<any>`
  width: 250px;
  height: calc(100vh - 62px);
  padding: 0;
  background-color: #ffffff;
  position: fixed;
  top: 63px;
  left: -100%;
  transition: all 0.2s ease-in-out;
  -webkit-transition: all 0.2s ease-in-out;
  ${(props) => props.open && `left: 0;`}
`;
const SideBarNavigation = styled.div<any>`
  padding: 0 10px;
  .nav {
    a {
      font-family: Roboto;
      padding: 20px;
      height: 60px;
      font-size: 14px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: normal;
      text-decoration: none;
      color: #8a9fba;
      display: flex;
      align-items: center;
      border-radius: 4px;
      justify-content: space-between;
      &:hover {
        background-color: #0057e4;
        color: #fff;
      }
      &.active {
        background-color: #0057e4;
        color: #fff;
      }
      i {
        margin-right: 13px;
        font-size: 18px;
      }
    }
  }
  .multilevenav,
  .multilevenav3 {
    height: 0;
    overflow: hidden;
  }

  .dd-toggle + ul.multilevenav,
  .dd-toggle + .multilevenav3 {
    height: auto;
    overflow: auto;
  }
  .multilevenav1 .dd-toggle {
    background: #0057e4;
    color: #fff !important;
    border-radius: 4px 4px 0 0 !important;
  }

  .multilevenav1 .dd-toggle + ul.multilevenav {
    background: #0057e4;
    border-radius: 0 0 4px 4px;
  }

  .multilevenav1 .dd-toggle + ul.multilevenav a {
    color: #fff;
  }

  .dd-toggle + ul.multilevenav3 li a {
    background-color: rgba(255, 255, 255, 0.14);
    border-radius: 0;
  }
  .dd-toggle + ul.multilevenav3 li:first-child a {
    border-radius: 4px 4px 0 0;
  }
  .dd-toggle + ul.multilevenav3 li:last-child a {
    border-radius: 0 0 4px 4px;
  }
  .dd-toggle + ul.multilevenav3 li a.active {
    background-color: rgba(255, 255, 255, 0.3) !important;
    border-radius: 0;
  }
  .dd-toggle + ul.multilevenav3 li:first-child a.active {
    border-radius: 4px 4px 0 0;
  }
  .dd-toggle + ul.multilevenav3 li:last-child a.active {
    border-radius: 0 0 4px 4px;
  }
  .multilevenav1 {
    width: 100%;
  }

  .singlelevelnav:nth-of-type(3) {
    padding-bottom: 20px;
    border-bottom: 1px solid #c0c0c0;
    margin-bottom: 20px;
  }

  ul.multilevenav3 {
    padding: 0 10px 0 10px;

    li {
      a {
        &:hover {
          background-color: rgba(255, 255, 255, 0.14) !important;
        }
        &.active {
          /* background-color: rgba(255, 255, 255, 0.30) !important;*/
        }
      }
    }
  }

  ul.multilevenav > li > a.active {
    background-color: rgba(255, 255, 255, 0.3) !important;
  }

  .multilevenav2 .dd-toggle + .multilevenav3 {
    margin-bottom: 10px;
  }

  .dd-menu.dd-toggle.nav-link {
    border-radius: 4px 4px 0 0;
    span {
      &:before {
        transform: rotate(180deg) !important;
        display: inline-block;
      }
    }
  }

  .sidebarnav {
    a.nav-link {
      div {
        display: flex;
        align-items: center;
        white-space: nowrap;
      }
    }
  }
`;

const LogoSidebar = styled.div`
  margin: 38px 0 38px 10px;
`;

const LogoIcon = styled(Link)`
  display: none;
`;

export { SideBarContainer, SideBarNavigation, LogoSidebar, LogoIcon };
