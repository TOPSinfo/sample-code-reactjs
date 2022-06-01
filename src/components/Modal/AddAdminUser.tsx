import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  UIModal,
  UIButton,
  UIInput,
  UICheckbox,
  UIFormGroup,
  UIErrorBlock,
  LoadingSpinner,
  UIModalFooter
} from "@theme";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "modules/selectors";
import { ErrorBoundary } from "components";
import {
  setAdminUserModalState,
  addAdminUser,
  editAdminUser,
  setAdminSuccesModal,
  setSelectedTeamUser,
  setdoubleClickSelectedTeamUser
} from "modules/actions";
import remove from "lodash/remove";
import { EmailPattern } from "modules/utils";
import CommonErrorModal from "components/Modal/CommonErrorModal";
import { AddUser } from "../svgs/add-user";
import cloneDeep from "lodash/cloneDeep";
import { isEqual } from "lodash";
interface IState {
  firstName: string;
  lastName: string;
  email: string;
  roles?: string[] | any;
}
export const AddAdminUser: React.FC = () => {
  const dispatch = useDispatch();
  const adminUserModalState = useSelector(selectors.getAdminUserModalState);
  const organizationId = useSelector(selectors.getOrganizationId);
  const organizationName = useSelector(selectors.getOrganizationName);
  const isModalLoading = useSelector(selectors.getModalLoading);
  const selectedTeamRow = useSelector(selectors.getSelectedTeamuser);
  const teamAddEditSuccesModal = useSelector(
    selectors.getTeamAddEditUserSuccesModal
  );

  const initialState = useRef({
    firstName: "",
    lastName: "",
    email: "",
    roles: []
  });
  const [state, setState] = useState<IState>(initialState.current);
  const [error, setError] = useState<IState>({
    ...initialState.current,
    roles: ""
  });
  const [prevState, setPrevState] = useState<any>(initialState.current);

  const handleFields = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    const placeholder = e.target.placeholder;

    setState((val) => ({ ...val, [name]: value }));
    setError((val) => ({
      ...val,
      [name]: !value.trim() ? `${placeholder} must not empty` : ""
    }));
  };

  const resetState = useCallback(() => {
    setState(initialState.current);
    setError({ ...initialState.current, roles: "" });
  }, []);

  useEffect(() => {
    if (selectedTeamRow) {
      setState((val) => ({
        ...val,
        firstName: selectedTeamRow?.user.firstName,
        lastName: selectedTeamRow?.user.lastName,
        email: selectedTeamRow?.user.email,
        roles: selectedTeamRow.roles
      }));
      setPrevState((val: any) => ({
        ...val,
        firstName: selectedTeamRow?.user.firstName,
        lastName: selectedTeamRow?.user.lastName,
        email: selectedTeamRow?.user.email,
        roles: selectedTeamRow.roles
      }));
    }

    return () => {
      resetState();
    };
  }, [selectedTeamRow, resetState]);

  const handleCheckbox = (e: any) => {
    const name = e.target.name;
    let roles = [...state.roles];
    if (!roles.includes(name)) {
      setState((val) => ({ ...val, roles: val.roles.concat(name) }));
      setError((val) => ({
        ...val,
        roles: ""
      }));
    } else {
      roles = remove(roles, (v: string) => {
        return v !== name;
      });
      setError((val) => ({
        ...val,
        roles: roles.length === 0 ? "Please select at least one role." : ""
      }));
      setState((val) => ({ ...val, roles }));
    }
  };

  const checkFieldValidation = () => {
    let formIsValid = true;
    const errorObj = cloneDeep({ ...initialState.current, roles: "" });
    if (!state.firstName.trim()) {
      errorObj.firstName = "First Name must not empty";
      formIsValid = false;
    }
    if (!state.lastName.trim()) {
      errorObj.lastName = "Last Name must not empty";
      formIsValid = false;
    }
    if (
      (!state.email && !state.email.trim()) ||
      !EmailPattern.test(state.email)
    ) {
      errorObj.email = "Enter a valid email address";
      formIsValid = false;
    }
    if (state.roles.length === 0) {
      errorObj.roles = "Please select atlease one role.";
      formIsValid = false;
    }
    setError(errorObj);
    return formIsValid;
  };

  const callInviteFn = () => {
    if (checkFieldValidation()) {
      dispatch(addAdminUser({ ...state, organizationId }));
      dispatch(setdoubleClickSelectedTeamUser({ data: null, status: false }));
    }
  };

  const editFn = () => {
    if (checkFieldValidation()) {
      dispatch(
        editAdminUser({ ...state, organizationId, uid: selectedTeamRow.uid })
      );
    }
  };

  const handleSubmit = (event: React.FormEvent) => event.preventDefault();

  useEffect(() => {
    return () => {
      dispatch(
        setdoubleClickSelectedTeamUser({
          data: selectedTeamRow,
          status: false
        })
      );
    };
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const ActionButton = (
    <UIModalFooter buttonAlignments='space-between'>
      <React.Fragment>
        <UIButton
          label='Cancel'
          border
          disabled={isModalLoading}
          onClick={() => {
            dispatch(setAdminUserModalState(false));
            dispatch(
              setdoubleClickSelectedTeamUser({
                data: selectedTeamRow,
                status: false
              })
            );
          }}
        />
        <UIButton
          label={selectedTeamRow ? "Save" : "Invite"}
          disabled={isModalLoading}
          onClick={() => (selectedTeamRow ? editFn() : callInviteFn())}
        />
      </React.Fragment>
    </UIModalFooter>
  );
  useEffect(() => {
    if (!adminUserModalState) resetState();
  }, [adminUserModalState, resetState]);
  return (
    <ErrorBoundary>
      <UIModal
        show={adminUserModalState}
        backdrop={
          isModalLoading || !isEqual(prevState, state) ? "static" : true
        }
        onHide={() => dispatch(setAdminUserModalState(false))}
        title={`${selectedTeamRow ? "Edit" : "Add "} Admin User ${
          organizationName && "for "
        } ${organizationName || ""}`}
        hasFooterBorder={false}
        footer={ActionButton}
      >
        <UIFormGroup onSubmit={handleSubmit} formDisabled={isModalLoading}>
          {isModalLoading && (
            <LoadingSpinner position={"absolute"} withCoverBg={true} />
          )}
          <Row>
            <Col md={6} xl={6} lg={6} sm={12} xs={12} className='mb-4'>
              <UIInput
                label='First Name'
                placeholder='First Name'
                type='text'
                required
                onChange={handleFields}
                name='firstName'
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
                errorText={error.lastName}
                hasError={!!error.lastName}
                value={state.lastName}
                onChange={handleFields}
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
                value={state.email}
                inputInfoIcon={!!error.email && "icon-warning-icon"}
                disabled={selectedTeamRow}
                errorText={error.email}
                hasError={!!error.email}
                onChange={handleFields}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} xl={6} lg={6} sm={12} xs={12} className='mb-4'>
              <UICheckbox
                label='Team Admin'
                name='team-admin'
                position='after'
                onChange={handleCheckbox}
                hasError={!!error.roles}
                isChecked={state.roles.indexOf("team-admin") !== -1}
              />
            </Col>
            <Col md={6} xl={6} lg={6} sm={12} xs={12} className='mb-4'>
              <UICheckbox
                label='Event Admin'
                name='event-admin'
                position='after'
                onChange={handleCheckbox}
                hasError={!!error.roles}
                isChecked={state.roles.includes("event-admin")}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} xl={6} lg={6} sm={12} xs={12} className='mb-4'>
              <UICheckbox
                label='Billing/Contract'
                name='billing-contract'
                position='after'
                onChange={handleCheckbox}
                hasError={!!error.roles}
                isChecked={state.roles.includes("billing-contract")}
              />
            </Col>
            <Col md={6} xl={6} lg={6} sm={12} xs={12} className='mb-4'>
              <UICheckbox
                label='Integrations'
                name='integrations'
                position='after'
                onChange={handleCheckbox}
                hasError={!!error.roles}
                isChecked={state.roles.includes("integrations")}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-1'>
              <UIErrorBlock errorText={error.roles} />
            </Col>
          </Row>
        </UIFormGroup>
      </UIModal>
      <CommonErrorModal
        show={teamAddEditSuccesModal}
        onHide={() => {
          dispatch(setAdminSuccesModal(false));
          if (selectedTeamRow) {
            dispatch(setSelectedTeamUser(null));
          }
        }}
        hasFooterBorder={false}
        symbol={<AddUser />}
        customBodyPadding='40px 30px 10px 30px'
        closeButtonName={"Close"}
        message={"Changes successfully saved"}
      />
    </ErrorBoundary>
  );
};
export default AddAdminUser;
