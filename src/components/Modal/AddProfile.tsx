import React, {useRef, useState,useEffect } from "react";
import {
  UIButton,
  UIModal,
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
  setProfileModalState,
  updateProfile
} from "../../modules/actions";
import {
  EmailPattern,
  getAvatarUrl
} from "../../modules/utils";
import { Location } from "components/Location";
import { ErrorBoundary } from "components";
import { omit, set } from "lodash";
import cloneDeep from "lodash/cloneDeep";
// import * as action from "modules/actions";
interface IState {
  firstName: string;
  lastName: string;
  email: string;
  organization?: string;
  title?: string;
  about?: string;
  location?: string;
  avatar?: string;
  linkedin?: string
  twitter?: string
}

export const AddProfile: React.FC = () => {
  const dispatch = useDispatch();
  const isModalLoading = useSelector(selectors.getModalLoading);
  const profileModalState = useSelector(selectors.getAddProfileModalState);
  const userId = useSelector(selectors.getUserUid);
  const userProfile = useSelector(selectors.getUserProfile);

  const firstRow: any = useRef(null);

  const initialState = useRef({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    title: "",
    location: "",
    about: "",
    avatar: "",
    linkedin:"",
    twitter:""
  });
  const [state, setState] = useState<IState>(initialState.current);
  const [backupData, setBackupData] = useState<IState>(initialState.current);
  const [error, setError] = useState<IState>(
    omit(initialState.current, ["avatar"])
  );

  useEffect(() => {
    if (userProfile) {
      const updatedData = {
        firstName: userProfile?.firstName,
        lastName: userProfile?.lastName,
        email: userProfile?.email,
        organization: userProfile?.companyName,
        title: userProfile?.jobTitle,
        location: userProfile?.workLocation,
        about: userProfile?.about,
        avatar: userProfile?.avatar,
        linkedin: userProfile?.linkedin,
        twitter: userProfile?.twitter
      }
      setState(updatedData);
      setBackupData(updatedData);
    }
  }, [userProfile]);

  const onHide = () => {
    batch(() => {
      setState(backupData);
      dispatch(setProfileModalState(false));
    });
  };
 
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


  const onSubmit = () => {
    if (checkFieldValidation()) {
      dispatch(updateProfile({...state}))
    }
  };

  const onCancel = () => {
    setState(backupData)
    dispatch(setProfileModalState(false));
  }

  const checkFieldValidation = () => {
    let formIsValid = true;
    const errorObj = cloneDeep(
      omit(initialState.current, ["avatar"])
    );
    if (!state.firstName || !state.firstName.trim()) {
      errorObj.firstName = "First Name must not empty";
      formIsValid = false;
    }
    if (!state.lastName || !state.lastName.trim()) {
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
    if(!state.title){
      errorObj.title = "Title must not empty";
      formIsValid = false;
    }
    if(!state.organization){
      errorObj.organization = "Organization must not empty";
      formIsValid = false;
    }
    if(state.linkedin && state.linkedin.indexOf('www.linkedin.com') === -1){
      errorObj.linkedin = "Correct Syntax Required";
      formIsValid = false;
    }
    if(state.twitter && !state.twitter.startsWith('@')){
      errorObj.twitter = "Correct Syntax Required";
      formIsValid = false;
    }
    setError(errorObj);
    return formIsValid;
  };
  const ActionButton = (
    <UIModalFooter buttonAlignments='space-between'>
        <UIButton label='Cancel' border onClick={onCancel}/>
        <div>
        <UIButton
          label='Save'
          border
          onClick={onSubmit}
          disabled={isModalLoading}
        />
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
        show={profileModalState}
        onHide={onHide}
        headerClass={"flex-column"}
        hasFooterBorder={false}
        footer={ActionButton}
        title={"Update Profile"}
      >
        <UIFormGroup>
          {isModalLoading && (
            <LoadingSpinner position={"absolute"} withCoverBg={true} />
          )}
          <Row ref={firstRow}>
            <Col md={12} xs={12} xl={12} lg={12} className='mb-4'>
              <UserPhoto
                name={state.firstName + " " + state.lastName}
                image={
                  typeof state.avatar === "string"
                    ? getAvatarUrl(state.avatar, userId)
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
                disabled={true}
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
                required
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
                required
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
                label='About me'
                placeholder='Enter about yourself'
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
          <Row>
          <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIInput
                label='Linkedin'
                placeholder='www.linkedin.com/in/your_profile'
                type='text'
                name='linkedin'
                onChange={(e) => handleFields(e, "linkedin")}
                errorText={error.linkedin}
                hasError={!!error.linkedin}
                value={state.linkedin}
              />
            </Col>
          </Row>
          <Row>
          <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIInput
                label='Twitter'
                placeholder='@your_handle'
                type='text'
                name='twitter'
                onChange={(e) => handleFields(e, "twitter")}
                errorText={error.twitter}
                hasError={!!error.twitter}
                value={state.twitter}
              />
            </Col>
          </Row>
        </UIFormGroup>
      </UIModal>
    </ErrorBoundary>
  );
};
export default AddProfile;
