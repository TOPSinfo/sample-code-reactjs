import React from "react";
import { Col, Row } from "react-bootstrap";
import { UIInput, UIFormGroup, UICheckbox } from "@theme";
import styled from "styled-components";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import get from "lodash/get";
import * as selectors from "modules/selectors";
import * as actions from "modules/actions";

export const GeneralLobby = () => {
  const dispatch = useDispatch();
  const eventData = useSelector(selectors.getEventComponentData);

  const handleFields = (e: any, path: string, isCheckBox?: boolean) => {
    const target: any = e.target;
    const value = isCheckBox ? target.checked : target.value;
    const clonedState = cloneDeep(eventData);
    set(clonedState, path, value);
    dispatch(actions.createEventComponentActions(clonedState));
  };
  return (
    <ScrollBar>
      <UIFormGroup
        onSubmit={(e) => e.preventDefault()}
        className='overview-wrapper'
      >
        <React.Fragment>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIInput
                label='Invitation Placeholder'
                name='inviteplaceholder'
                type='text'
                value={get(eventData, "invite.placeholder", "")}
                onChange={(e) => {
                  handleFields(e, "invite.placeholder");
                }}
              />
            </Col>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIInput
                label='Social invitation label'
                name='invitelabel'
                type='text'
                value={get(eventData, "invite.label", "")}
                onChange={(e) => {
                  handleFields(e, "invite.label");
                }}
              />
            </Col>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UICheckbox
                label='Show Invite Colleague'
                name='showInvitee'
                isChecked={get(eventData, "invite.showInvitee", false)}
                onChange={(e) => handleFields(e, "invite.showInvitee", true)}
              />
            </Col>

            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIInput
                label='Lobby button label'
                name='lobbyactionlabel'
                type='text'
                value={get(eventData, "action.label", "")}
                onChange={(e) => {
                  handleFields(e, "action.label");
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIInput
                label='Schedule Action Label'
                name='scheduleactionlabel'
                type='text'
                value={get(eventData, "schedule.action.label", "")}
                onChange={(e) => {
                  handleFields(e, "schedule.action.label");
                }}
              />
            </Col>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIInput
                label='Dedicated schedule page Title'
                name='schedulepagetitle'
                type='text'
                value={get(eventData, "schedule.page.title", "")}
                onChange={(e) => {
                  handleFields(e, "schedule.page.title");
                }}
              />
            </Col>
          </Row>
        </React.Fragment>
      </UIFormGroup>
    </ScrollBar>
  );
};
export default GeneralLobby;
const ScrollBar = styled(PerfectScrollbar)`
  min-height: auto !important;
  .scrollbar-container {
    min-height: auto !important;
  }
  margin: -15px -30px !important;
  padding: 10px 30px 10px 30px;
  height: calc(100vh - 510px);
  overflow-y: auto;
  .ps__rail-y {
    border-radius: 6px;
  }
  .custome-filebrowse label {
    font-size: 14px;
    color: #283747;
    margin-bottom: 5px;
  }
`;
