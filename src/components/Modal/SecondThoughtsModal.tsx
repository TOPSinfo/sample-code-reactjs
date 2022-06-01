import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { UIModal, UIButton, UIRadio, UIFormGroup, UIModalFooter } from "@theme";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from "../../modules/selectors";
import { savingEventData } from "../../modules/actions";
// import { useEventCreate } from "../../pages/Events/CreateEvent/provider";
import * as action from "modules/actions";
interface SecondThoughtsProps {
  onHide: () => void;
}

const SecondThoughtsModal: React.FC<SecondThoughtsProps> = ({ onHide }) => {
  const isSecondThoughtsPopupOpen = useSelector(
    selectors.getSecondThoughtsPopup
  );
  const dispatch = useDispatch();
  const [stateOfEvent, setStateOfEvent] = useState("draft");
  const eventState = useSelector(selectors.getEventState);

  const PerformAction = () => {
    const eventData = {
      ...eventState,
      id: eventState.id,
      access: {
        ...eventState.access,
        link: {
          preview: false
        }
      },
      status: "draft",
      welcome: eventState.welcome,
      theme: eventState.theme
    };
    if (stateOfEvent === "draft") {
      eventData.access.link.preview = false;
      eventData.status = "draft";
    } else if (stateOfEvent === "live") {
      eventData.access.link.preview = true;
      eventData.status = "live";
    } else if (stateOfEvent === "closed") {
      eventData.access.link.preview = false;
      eventData.status = "closed";
    } else if (stateOfEvent === "opened") {
      eventData.access.link.preview = true;
      eventData.status = "opened";
    }
    dispatch(action.setCreateEventState(eventData));
    dispatch(savingEventData(eventData));

    onHide();
  };

  useEffect(() => {
    if (isSecondThoughtsPopupOpen) {
      setStateOfEvent(eventState.status || "opened");
    }
  }, [eventState.status, isSecondThoughtsPopupOpen]);

  const ActionButton = (
    <UIModalFooter buttonAlignments='center' className='button-group-footer'>
      <React.Fragment>
        <Row className='modal-btn-m0 modal-btn-full'>
          <Col md={6} xl={6} lg={6} sm={6} xs={6}>
            <UIButton label='Cancel' border onClick={onHide} />
          </Col>
          <Col md={6} xl={6} lg={6} sm={6} xs={6} className='text-right'>
            <UIButton label='Apply' onClick={PerformAction} />
          </Col>
        </Row>
      </React.Fragment>
    </UIModalFooter>
  );
  return (
    <UIModal
      show={isSecondThoughtsPopupOpen}
      onHide={onHide}
      customBodyPadding={"30px 30px 10px 30px"}
      hasFooterBorder={false}
      closeButton={true}
      title={`Manage the status of this event`}
      footer={ActionButton}
    >
      <UIFormGroup className='thoughts-modal'>
        <Row>
          <Col
            md={12}
            xl={12}
            lg={12}
            sm={12}
            xs={12}
            className='cnfgr-thumbox-row'
          >
            <UIRadio
              label='Draft - only visible and accessible to staff and exhibitors'
              value={stateOfEvent}
              isChecked={stateOfEvent === "draft"}
              onChange={() => setStateOfEvent("draft")}
              name='second_thoughts'
            />
            <UIRadio
              label='Closed - visible to anyone, only accessible to staff and exhibitors'
              name='second_thoughts'
              value={stateOfEvent}
              isChecked={stateOfEvent === "closed"}
              onChange={() => setStateOfEvent("closed")}
            />
            <UIRadio
              label='Open - visible and accessible to anyone'
              name='second_thoughts'
              value={stateOfEvent}
              isChecked={stateOfEvent === "opened"}
              onChange={() => setStateOfEvent("opened")}
            />
          </Col>
        </Row>
      </UIFormGroup>
    </UIModal>
  );
};
export default SecondThoughtsModal;
