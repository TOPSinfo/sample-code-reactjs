import styled, { css } from "styled-components/macro";
import { UIModal } from "@theme";
export const button = css`
  --background-color: var(--theme-color);
  --font-color: var(--mono-white-color);
  appearance: none;
  align-items: center;
  background-color: var(--background-color);
  border: none;
  border-radius: var(--access-unit-radius);
  box-sizing: border-box;
  color: var(--font-color);
  cursor: pointer;
  display: flex;
  font-size: var(--access-unit-font-size);
  font-weight: bold;
  height: var(--access-input-height);
  justify-content: center;
  outline: none;
  padding-top: calc(var(--access-unit-letting-y) / 2);
  padding-bottom: calc(var(--access-unit-letting-y) / 2);
  padding-left: var(--access-unit-letting-x);
  padding-right: var(--access-unit-letting-x);
  text-align: center;
  user-select: none;

  .label {
    font-weight: bold;
    margin-left: calc(var(--access-letting-x) / 2);
    margin-right: calc(var(--access-letting-x) / 2);
  }

  &:focus,
  &:active {
    outline: none;
  }

  &:not(.disabled) {
    & {
      &:hover,
      &:focus,
      &:active {
        --background-color: var(--theme-color);
      }
    }

    &.outline {
      --background-color: var(--mono-white-color);
      --font-color: var(--theme-color);
      box-shadow: inset 0 0 0 1px var(--theme-color);

      &:hover {
        --background-color: var(--blue-white-color);
      }

      &:focus,
      &:active {
        --background-color: var(--blue-bright-color);
      }
    }
  }

  &.disabled {
    --background-color: var(--slate-light-color);
    --font-color: var(--slate-color);
    pointer-events: none;
  }
`;

export const Button = styled.div`
  ${button}
  & {
    padding-left: calc(var(--access-unit-letting-x) * 3);
    padding-right: calc(var(--access-unit-letting-x) * 3);
    justify-self: flex-end;
    align-self: flex-end;
  }

  &[aria-expanded="true"] {
    --background-color: var(--blue-black-color);
  }

  &.dropdown-toggle::after {
    position: relative;
    vertical-align: middle !important;
    top: 2px;
    margin-left: var(--access-unit-letting-x);
  }

  .dropdown.btn-group &:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding-left: var(--access-unit-letting-x);
    padding-right: var(--access-unit-letting-x);
  }

  .dropdown.btn-group &:first-child + .dropdown-toggle-split {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding-left: var(--access-unit-letting-x);
    padding-right: var(--access-unit-letting-x);
  }
  .dropdown.btn-group &:first-child + .dropdown-toggle-split::after {
    margin-left: 0;
  }
`;

export const Horizontal = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
`;

export const ThumbnailComponent = styled(UIModal)`
  position: relative;
  display: block;
  width: 100%;
  .controls {
    position: relative;
    padding: var(--access-letting);
    display: flex;
    input {
      width: 100%;
      background-color: var(--blue-color);
    }
  }
`;

export const ThumbnailContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-height: var(--avatar-thumbnail-height);
  max-height: var(--avatar-thumbnail-width);
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
  text-align: center;

  #stream {
    height: var(--avatar-thumbnail-height);
    width: var(--avatar-thumbnail-width);
  }
`;

// export const SpaceNode = styled.div`
//     flex-shrink: 0;
//     flex-grow: 0;

//     & {
//         width: calc(${({ width }) => (width !== undefined ? width : 1)} * var(--access-letting-width));
//         height: calc(${({ height }) => (height !== undefined ? height : 1)} * var(--access-letting-height));
//     }
// `;

// export const Space: React.FC<NodeProperties> = SpaceNode;

// interface NodeProperties extends React.PropsWithChildren<any> {
//   height?: number;
//   width?: number;
//   size?: number;
// }

export const CropperWrapper = styled.div`
  & .cropper-container {
    width: 100%;
    height: 270px !important;
  }
  & .cropper-drag-box {
    height: 270px !important;
    max-height: 270px !important;
  }
`;

export const SliderWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 10px;
  input {
    width: 100%;
  }
`;
