import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  UIModal,
  UIButton,
  UIInput,
  UITextArea,
  UIFormGroup,
  UserPhoto,
  LoadingSpinner,
  UIModalFooter
} from "@theme";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector, batch } from "react-redux";
import * as selectors from "../../modules/selectors";
import {
  setPeopleModalState,
  addPeople,
  editPeople,
  setPeopleSuccessModal,
  fetchProfileByEmail,
  setFetchedProfile,
  setDoubleClickSelectedPeople
} from "../../modules/actions";
import {
  EmailPattern,
  getAvatarUrl,
  mapProfileToAEP
} from "../../modules/utils";
import { Location } from "components/Location";
import CommonErrorModal from "../../components/Modal/CommonErrorModal";
import { ErrorBoundary } from "components";
import { AddUser } from "../svgs/add-user";
import { omit, set, isEmpty, isEqual } from "lodash";
import cloneDeep from "lodash/cloneDeep";
import * as action from "modules/actions";
interface IState {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  title: string;
  about: string;
  location: string;
  profileStatus?: string;
  avatar?: string;
}

export const AddPeople: React.FC = () => {
  const dispatch = useDispatch();
  const isModalLoading = useSelector(selectors.getModalLoading);
  const peopleModalState = useSelector(selectors.getAddPeopleModalState);
  const organizationName = useSelector(selectors.getOrganizationName);
  const organizationId = useSelector(selectors.getOrganizationId);
  const selectedTeamRow = useSelector(selectors.getSelectedPeople);
  const teamAddEditSuccesModal = useSelector(selectors.getPeopleAddSuccesModal);
  const selectedProfile = useSelector(selectors.getSelectedProfile);
  const firstRow: any = useRef(null);

  const onHide = () => {
    batch(() => {
      dispatch(setPeopleModalState(false));
      dispatch(setFetchedProfile(null));
      dispatch(
        setDoubleClickSelectedPeople({ data: selectedTeamRow, status: false })
      );
    });
  };
  const initialState = useRef({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    title: "",
    location: "",
    about: "",
    profileStatus: "pending",
    avatar: ""
  });
  const [state, setState] = useState<IState>(initialState.current);
  const [error, setError] = useState<IState>(
    omit(initialState.current, ["profileStatus", "avatar"])
  );
  const [prevState, setPrevState] = useState<any>(initialState.current);

  const resetState = useCallback(() => {
    setState(initialState.current);
    setPrevState(initialState.current);
    setError(omit(initialState.current, ["profileStatus", "avatar"]));
  }, []);
  const handleFields = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldLabel: string
  ) => {
    const target: any = e.target;
    const value = target.value;
    const name = target.name;
    const isRequired = target.required;
    setState((val) => ({ ...val, [name]: value }));
    if (isRequired) {
      setError((val) => ({
        ...val,
        [name]: !value.trim() ? `${fieldLabel} must not empty` : ""
      }));
    }
  };

  const handleLocationField = (value: any) => {
    setState((val) => ({ ...val, location: value }));
  };

  const inviteAndSave = () => {
    if (checkFieldValidation() && selectedTeamRow) {
      setState((val) => ({ ...val, profileStatus: "invited" }));
    }
    dispatch(action.setCropperImageData(null));
  };

  const save = () => {
    if (checkFieldValidation()) {
      if (selectedTeamRow) {
        dispatch(
          editPeople({
            ...state,
            organizationId,
            uid: selectedTeamRow.uid
          })
        );
      } else {
        dispatch(addPeople({ ...state, organizationId }));
      }
      dispatch(action.setCropperImageData(null));
    }
  };

  const checkFieldValidation = () => {
    let formIsValid = true;
    const errorObj = cloneDeep(
      omit(initialState.current, ["profileStatus", "avatar"])
    );
    if (!state.firstName || !state.firstName.trim()) {
      errorObj.firstName = "First Name must not empty";
      formIsValid = false;
    }
    if (!state.firstName || !state.lastName.trim()) {
      errorObj.lastName = "Last Name must not empty";
      formIsValid = false;
    }
    if (
      !state.email ||
      !state.email.trim() ||
      !EmailPattern.test(state.email)
    ) {
      errorObj.email = "Enter a valid email address";
      formIsValid = false;
    }
    setError(errorObj);
    return formIsValid;
  };

  useEffect(() => {
    if (peopleModalState && firstRow.current !== null) {
      firstRow.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [peopleModalState]);

  useEffect(() => {
    if (!peopleModalState && !selectedTeamRow) resetState();
  }, [peopleModalState, selectedTeamRow, resetState]);

  useEffect(() => {
    if (state.profileStatus === "invited") save();
  }, [state.profileStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!selectedProfile) {
      return;
    }
    if (!state.email && selectedProfile) return;
    const result = mapProfileToAEP(selectedProfile);
    setState((val) => ({
      ...val,
      ...result
    }));
  }, [selectedProfile, state.email]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (state.email && peopleModalState && !selectedTeamRow) {
      dispatch(
        fetchProfileByEmail({
          organizationId,
          email: state.email
        })
      );
    }
  }, [
    organizationId,
    state.email,
    dispatch,
    selectedTeamRow,
    peopleModalState
  ]);
  useEffect(() => {
    if (selectedTeamRow) {
      setState((val) => ({
        ...val,
        firstName: selectedTeamRow?.firstName,
        lastName: selectedTeamRow?.lastName,
        email: selectedTeamRow?.email,
        organization: selectedTeamRow?.companyName,
        title: selectedTeamRow?.jobTitle,
        location: selectedTeamRow?.workLocation,
        about: selectedTeamRow?.description,
        avatar: selectedTeamRow?.avatar
      }));
      setPrevState((val: any) => ({
        ...val,
        firstName: selectedTeamRow?.firstName,
        lastName: selectedTeamRow?.lastName,
        email: selectedTeamRow?.email,
        organization: selectedTeamRow?.companyName,
        title: selectedTeamRow?.jobTitle,
        location: selectedTeamRow?.workLocation,
        about: selectedTeamRow?.description,
        avatar: selectedTeamRow?.avatar
      }));
    }

    return () => {
      resetState();
    };
  }, [selectedTeamRow, resetState]);

  const getPeopleStatus = () => {
    if (isEmpty(selectedTeamRow.roles)) {
      return true;
    } else if (
      !isEmpty(selectedTeamRow.roles) &&
      selectedTeamRow.status.toLowerCase() === "pending"
    ) {
      return false;
    } else if (
      !isEmpty(selectedTeamRow.roles) &&
      selectedTeamRow.status.toLowerCase() === "active"
    ) {
      return true;
    }
    return false;
  };

  const ActionButton = (
    <UIModalFooter buttonAlignments='space-between'>
      <div>
        <UIButton
          label='Cancel'
          border
          onClick={onHide}
          disabled={isModalLoading}
        />
      </div>
      <div>
        <UIButton
          label={selectedTeamRow ? "Save" : "Add"}
          className='no-extra-margin'
          onClick={save}
          disabled={isModalLoading}
        />
        {selectedTeamRow && (
          <UIButton
            label={selectedTeamRow ? "Reinvite" : "Add and Invite"}
            onClick={inviteAndSave}
            disabled={selectedTeamRow && getPeopleStatus()}
          />
        )}
      </div>
    </UIModalFooter>
  );
  const onKeyUp = (e: any) => {
    if (e.keyCode === 13) {
      const txtArea: any = document.getElementById("textId");
      txtArea.value += "\r\n";
      setState((val: any) => {
        set(val, "about", txtArea.value);
        return val;
      });
    }
  };
  return (
    <ErrorBoundary>
      <UIModal
        show={peopleModalState}
        onHide={onHide}
        backdrop={
          isModalLoading || !isEqual(prevState, state) ? "static" : true
        }
        headerClass={"flex-column"}
        hasFooterBorder={false}
        footer={ActionButton}
        title={
          selectedTeamRow
            ? "Edit People"
            : `Add a special person to ${organizationName}`
        }
      >
        <UIFormGroup onSubmit={(event) => event.preventDefault()}>
          {isModalLoading && (
            <LoadingSpinner position={"absolute"} withCoverBg={true} />
          )}
          <Row ref={firstRow}>
            <Col md={12} xs={12} xl={12} lg={12} className='mb-4'>
              <UserPhoto
                name={state.firstName + " " + state.lastName}
                image={
                  typeof state.avatar === "string"
                    ? getAvatarUrl(state.avatar, organizationId)
                    : state.avatar
                }
                changeUploadedFiles={(file: any) =>
                  setState((val) => ({
                    ...val,
                    avatar: file
                  }))
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} xl={6} lg={6} sm={12} xs={12} className='mb-4'>
              <UIInput
                label='First Name'
                placeholder='First Name'
                type='text'
                required
                name='firstName'
                onChange={(e) => handleFields(e, "First Name")}
                errorText={error.firstName}
                hasError={!!error.firstName}
                value={state.firstName}
              />
            </Col>
            <Col md={6} xl={6} lg={6} sm={12} xs={12} className='mb-4'>
              <UIInput
                label='Last Name'
                placeholder='Last Name'
                type='text'
                required
                name='lastName'
                onChange={(e) => handleFields(e, "Last Name")}
                errorText={error.lastName}
                hasError={!!error.lastName}
                value={state.lastName}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIInput
                label='Email'
                placeholder='Email'
                type='email'
                required
                name='email'
                onChange={(e) => handleFields(e, "Email")}
                errorText={error.email}
                hasError={!!error.email}
                value={state.email}
                disabled={!!selectedTeamRow}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} xl={6} lg={6} sm={12} xs={12} className='mb-4'>
              <UIInput
                label='Organization'
                placeholder='Enter Organization'
                type='text'
                name='organization'
                onChange={(e) => handleFields(e, "Organization")}
                errorText={error.organization}
                hasError={!!error.organization}
                value={state.organization}
              />
            </Col>
            <Col md={6} xl={6} lg={6} sm={12} xs={12} className='mb-4'>
              <UIInput
                label='Title'
                placeholder='Enter Title'
                type='text'
                name='title'
                onChange={(e) => handleFields(e, "Title")}
                errorText={error.title}
                hasError={!!error.title}
                value={state.title}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <Location
                label='Location'
                placeholder='Enter Location'
                type='text'
                name='location'
                onChange={handleLocationField}
                errorText={error.location}
                hasError={!!error.location}
                value={state.location}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12}>
              <UITextArea
                label='About me / Short biography'
                placeholder='For presenters, this information also appears in the event schedule'
                showCount
                maxLength={400}
                name='about'
                onChange={(e) => handleFields(e, "About me / Short biography")}
                errorText={error.about}
                hasError={!!error.about}
                value={state.about}
                onKeyup={onKeyUp}
                id='textId'
              />
            </Col>
          </Row>
        </UIFormGroup>
      </UIModal>
      <CommonErrorModal
        show={teamAddEditSuccesModal}
        onHide={() => dispatch(setPeopleSuccessModal(false))}
        hasFooterBorder={false}
        symbol={<AddUser />}
        customBodyPadding='40px 30px 10px 30px'
        closeButtonName={"Close"}
        message={
          selectedTeamRow
            ? "Person successfully updated"
            : "Person successfully added"
        }
      />
    </ErrorBoundary>
  );
};
export default AddPeople;
