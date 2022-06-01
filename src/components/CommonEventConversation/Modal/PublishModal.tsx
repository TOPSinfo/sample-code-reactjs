import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  UIModal,
  UIButton,
  UIFormGroup,
  LoadingSpinner,
  UIModalFooter
} from "@theme";
import * as selectors from "modules/selectors";
import { useDispatch, useSelector } from "react-redux";
import {
  setPublishModalState,
  storeEventDataWithoutDebounce
} from "modules/actions";
import styled from "styled-components";

export const PublishModal: React.FC = () => {
  const isPublishPopup = useSelector(selectors.getPublishPopup);
  const dispatch = useDispatch();
  const organizationId = useSelector(selectors.getOrganizationID);
  const isModalLoading = useSelector(selectors.getModalLoading);
  const eventState = useSelector(selectors.getEventState);
  const publishEvent = () => {
    const obj = {
      ...eventState,
      id: eventState.id,
      access: {
        ...eventState.access,
        link: {
          preview: true
        }
      },
      organizationId,
      status: "opened"
    };
    dispatch(storeEventDataWithoutDebounce(obj));
    dispatch(setPublishModalState(false));
  };

  const ActionButton = (
    <UIModalFooter buttonAlignments='space-between'>
      <React.Fragment>
        <UIButton
          label='Cancel'
          border
          onClick={() => dispatch(setPublishModalState(false))}
        />
        <UIButton label='Publish' onClick={publishEvent} />
      </React.Fragment>
    </UIModalFooter>
  );

  return (
    <UIModal
      show={isPublishPopup}
      onHide={() => dispatch(setPublishModalState(false))}
      title='Publish this event'
      closeButton
      hasFooterBorder={false}
      footer={ActionButton}
    >
      <UIFormGroup>
        {isModalLoading && (
          <LoadingSpinner position={"absolute"} withCoverBg={true} />
        )}
        <Row>
          <Col className={"mb-3"}>
            <StyledSpan>This will:</StyledSpan>
          </Col>
        </Row>
        <Row>
          <StyledUl>
            <StyledLI
              className={"col-12 col-md-12 col-xl-12 col-xs-12 col-lg-12 mb-2"}
            >
              <span className={"mr-2"}>&bull;</span>
              <span>Publish the welcome page</span>
            </StyledLI>
            <StyledLI
              className={"col-12 col-md-12 col-xl-12 col-xs-12 col-lg-12 mb-2"}
            >
              <span className={"mr-2"}>&bull;</span>
              <span>
                Make the event accessible from your tools (CRM, registration...)
                through our API
              </span>
            </StyledLI>
            <StyledLI
              className={"col-12 col-md-12 col-xl-12 col-xs-12 col-lg-12 mb-2"}
            >
              <span className={"mr-2"}>&bull;</span>
              <span>Publish the event on tops&apos;s attendee portal</span>
            </StyledLI>
          </StyledUl>
        </Row>
      </UIFormGroup>
    </UIModal>
  );
};
export default PublishModal;
const StyledUl = styled.ul``;
const StyledLI = styled.li`
  font-size: 14px;
  color: #283747;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  span:first-child {
    font-size: 25px;
    color: #0057e4;
  }
`;
const StyledSpan = styled.span`
  font-size: 14px;
  color: #283747;
`;
