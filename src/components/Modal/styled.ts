import styled from "styled-components";
import { Modal } from "react-bootstrap";

export const ModalContainer = styled(Modal)`
  & .modal-dialog {
    height: 100vh;
    display: flex;
    align-items: center;
    margin-top: 0;
  }
`;
