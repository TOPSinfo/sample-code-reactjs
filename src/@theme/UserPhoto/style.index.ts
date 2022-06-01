import styled from "styled-components";

interface CardImageProps {
  isLoaded?: boolean;
}
export const CardImage = styled.img<CardImageProps>`
  pointer-events: none;
  height: 90px;
  width: 90px;
  line-height: 90px;
  border-radius: 50%;
  background: #c1d5f8;
  ${(props) => !props.isLoaded && "display: none;"}
`;
export const CardInitials = styled.div`
  pointer-events: none;
  height: 90px;
  width: 90px;
  font-size: 32px;
  line-height: 90px;
  text-align: center;
  font-weight: 500;
  border-radius: 50%;
  background: #c1d5f8;
  color: #0057e4;
`;
export const UserUploadBox = styled.div`
  display: inline-flex;
  position: relative;
  a {
    text-decoration: none;
  }
`;
export const UserDropdownBox = styled.div`
  display: inline-block;
  position: absolute;
  right: 0;
  bottom: 0;
  .dropdown {
    .dropdown-menu {
      padding: 0;
      width: 100px;
      min-width: 100px;
      .dropdown-item {
        padding: 8px 15px;
        text-decoration: none !important;
        font-size: 13px;
      }
    }
    .dropdown-toggle {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #0057e4;
      border: 2px solid #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      &::after {
        display: none !important;
      }
      &:focus {
        box-shadow: none !important;
      }
      .dropdown-item {
        text-decoration: none !important;
      }
    }
  }
`;
export const BrowseFile = styled.input`
  display: none;
`;
