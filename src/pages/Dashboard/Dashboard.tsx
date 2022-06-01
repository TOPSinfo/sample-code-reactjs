import React, { SyntheticEvent, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { CardBox, H2 } from "./Dashboard.style";
import { Events } from "pages/Events";
import { useDispatch, useSelector, batch } from "react-redux";
import {
  disableDashboardFrame,
  setAdminModalSuccess,
  setAdminUserModalState,
  setContentModalState,
  setPeopleModalState
} from "modules/actions";
import { AddAdminUser, ErrorBoundary } from "components";
import { useHistory } from "react-router-dom";
import CommonErrorModal from "../../components/Modal/CommonErrorModal";
import { AddUser } from "../../components/svgs/add-user";
import * as selectors from "../../modules/selectors";
import AddPeople from "../../components/Modal/AddPeople";
import { withProfiler } from "@sentry/react";
import { isEmpty, cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";
import useTimeZones from "hooks/useTimeZones/useTimeZones";
import { compactObject } from "modules/utils/commonFn";
import * as actions from "modules/actions";


const Dashboard = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    message: "Changes successfully saved",
    compType: "",
    isFrameActive: false
  });
  const addAdminUserSuccessModal = useSelector(
    selectors.getAddAdminUserSuccessModalState
  );
  const isLocalStorageFrameDisabled = localStorage.getItem("isFrameDisabled");
  const history = useHistory();
  const isFrameDisabled = useSelector(selectors.isDashboardframeEnabled);
  const options = useTimeZones();
  const organizationId = useSelector(selectors.getOrganizationId);
  const eventState = useSelector(selectors.getEventState);

  const CloseFrame = (e: SyntheticEvent, message: string, compType: string) => {
    e.preventDefault();
    dispatch(setAdminModalSuccess(true));
    setState((val) => ({ ...val, message, compType }));
  };

  const checkBoxChange = (e: any) =>
    setState((val) => ({ ...val, isFrameActive: e.target.checked }));

  const onHide = () => {
    dispatch(disableDashboardFrame(true));
    if (state.isFrameActive)
      localStorage.setItem("isFrameDisabled", state.isFrameActive.toString());
    dispatch(setAdminModalSuccess(false));
    setState((val) => ({ ...val, message: "", compType: "" }));
  };

  const createNewEvent = () => {
    if (isEmpty(eventState.id) && organizationId) {
      const id = uuidv4();
      const state = cloneDeep(eventState);
      const obj = {
        ...state,
        access: {
          requiresRegistration: false
        },
        timezone: options.selectedTimeZone,
        id
      };
      dispatch(
        actions.createEventApi({
          eventId: id,
          organizationId,
          timezone: options.selectedTimeZone,
          theme: compactObject(eventState.theme),
          welcome: compactObject(eventState.welcome),
          createdEventObj: obj
        })
      );

      dispatch(actions.setCreateEventState(obj));
      batch(() => {
        dispatch(actions.setEventFriendlyNameLocally({ friendlyUrl: "" }));
        dispatch(actions.addSponsorTypes([]));
        dispatch(actions.setBroadcastChannel([]));
        dispatch(actions.setCurrentEventId(id));
        // dispatch(actions.fetchUserListProfiles());
      });
      history.push(`/create-event/${id}`);
    }
  };
  return (
    <ErrorBoundary>
      <div>
        {(isLocalStorageFrameDisabled === "false" ||
          (isEmpty(isLocalStorageFrameDisabled) && !isFrameDisabled)) && (
          <CardBox>
            <H2>
              Welcome. Here are a few suggestions to get you started with
              organizing events.
              <a
                onClick={(e) =>
                  CloseFrame(
                    e,
                    "Don’t show me these suggestions again",
                    "checkbox"
                  )
                }
                className='close-icon'
              >
                <i className='icon-ic-close-black' />
              </a>
            </H2>

            <Row>
              <Col xs={12} md={6} lg={6}>
                <div className='event-box' onClick={createNewEvent}>
                  <div className='event-inrbox'>
                    <div className='event-icon new-event-icn'>
                      <i className='icon-ic-new-event-black' />
                    </div>
                    <div className='eventbox-right'>
                      <h3>Create a New Event</h3>
                      <p>
                        Let’s get started! Create an event using your own
                        design. Manage speakers, sponsors, graphics, rooms and
                        more.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={12} md={6} lg={6}>
                <div
                  className='event-box'
                  onClick={() => dispatch(setPeopleModalState(true))}
                >
                  <div className='event-inrbox'>
                    <div className='event-icon new-event-icn'>
                      <i className='icon-ic-addmember-black' />
                    </div>
                    <div className='eventbox-right'>
                      <h3>Add People</h3>
                      <p>
                        Add a user to your event with a specific role, such as a
                        Speaker, a host or a sponsor.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={12} md={6} lg={6}>
                <div
                  className='event-box'
                  onClick={() => dispatch(setContentModalState(true))}
                >
                  <div className='event-inrbox'>
                    <div className='event-icon new-event-icn'>
                      <i className='icon-ic-content-black' />
                    </div>
                    <div className='eventbox-right'>
                      <h3>Add Content</h3>
                      <p>Upload videos.</p>
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={12} md={6} lg={6}>
                <div
                  className='event-box'
                  onClick={() => dispatch(setAdminUserModalState(true))}
                >
                  <div className='event-inrbox'>
                    <div className='event-icon new-event-icn'>
                      <i className='icon-ic-addteam-black' />
                    </div>
                    <div className='eventbox-right'>
                      <h3>Add Team Members</h3>
                      <p>
                        Add a user with authorizations on this admin portal.
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </CardBox>
        )}
        <Events />
      </div>
      <AddAdminUser />
      <AddPeople />
      <CommonErrorModal
        show={addAdminUserSuccessModal}
        onHide={() => dispatch(setAdminModalSuccess(false))}
        hasFooterBorder={false}
        symbol={
          state.compType === "checkbox" ? (
            <input
              type='checkbox'
              onChange={checkBoxChange}
              checked={state.isFrameActive}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <AddUser />
          )
        }
        customBodyPadding='40px 30px 10px 30px'
        closeButtonName={"Cancel"}
        message={state.message}
        deleteButtonName={"Close"}
        onDelete={onHide}
        swithBtnPos
      />
    </ErrorBoundary>
  );
};
export default withProfiler(Dashboard);
