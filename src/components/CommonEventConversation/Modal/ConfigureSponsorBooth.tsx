import React, { useState } from "react";
import {
  UIReactSelect2,
  UICheckbox,
  UIInput,
  UIFormGroup,
  UIUploadFile,
  UIRadio
} from "@theme";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import { ErrorBoundary } from "components";
import { useDispatch, useSelector } from "react-redux";
import "./AddMeetingRoom.scss";
import { createEventComponentActions, setModalLoading } from "modules/actions";
import * as selectors from "modules/selectors";
import UploadFile from "modules/utils/FirebaseUpload";
import { get, set, cloneDeep } from "lodash";
import BasicCkEditor from "components/CKEditor";
import PerfectScrollbar from "react-perfect-scrollbar";
import RolesSpecialPerson from "./ConfigureMeetingRoom/RolesSpecialPerson";

interface AddSponsorsProps {
  id?: string;
  html?: string;
  logoUrl?: string;
  mediaUrl?: string;
  name?: string;
  sponsorLoungeRedirectToBreakout?: boolean;
  isSponsorWelcome?: boolean;
  type?: string;
  index?: number;
  websiteUrl?: string;
  bgSponImageUrl?: string;
}
const ScrollBar = styled(PerfectScrollbar)`
  min-height: auto !important;
  .scrollbar-container {
    min-height: auto !important;
  }
  margin: -15px -30px !important;
  padding: 30px 30px 10px 30px;
  height: calc(100vh - 450px);
  overflow-y: auto;
  .ps__rail-y {
    border-radius: 6px;
  }
`;
const StyledTextAreaLabel = styled.label`
  margin-bottom: 5px;
  span {
    font-size: 14px;
    font-weight: 500;
    color: #283747;
  }
`;
export const ConfigureSponsorBooth: React.FC<AddSponsorsProps> = ({
  id = "",
  html = "",
  logoUrl = "",
  mediaUrl = "",
  name = "",
  sponsorLoungeRedirectToBreakout = true,
  isSponsorWelcome = false,
  websiteUrl = "",
  type = "",
  bgSponImageUrl = ""
}) => {
  const dispatch = useDispatch();
  const initialState = {
    id,
    html,
    logoUrl,
    mediaUrl,
    name,
    sponsorLoungeRedirectToBreakout,
    isSponsorWelcome,
    type,
    websiteUrl,
    bgSponImageUrl
  };
  const [state, setState] = useState<AddSponsorsProps>(initialState);
  const [error, setError] = useState<AddSponsorsProps>({
    name: "",
    type: "",
    websiteUrl: "",
    logoUrl: ""
  });
  const eventData = useSelector(selectors.getEventComponentData);
  const organizationId = useSelector(selectors.getOrganizationId);
  const isModalLoading = useSelector(selectors.getModalLoading);
  const sposorTypes = useSelector(selectors.getAllSponsorTypes(true));
  const handleSubmit = (event: React.FormEvent) => event.preventDefault();
  const handleFields = (e: any, value: any) => {
    const name = e.target.name;
    const placeholder = e.target.placeholder;
    saveToLocalAndApi({ name, value, placeholder });
  };
  const saveToLocalAndApi = ({ name, value, placeholder }: any) => {
    /*
     * to store it locally
     * */
    // save to event component
    const clonedState = cloneDeep(eventData);
    set(clonedState, `${name}`, value);
    dispatch(createEventComponentActions(clonedState));

    setState((val) => ({ ...val, [name]: value }));
    setError((val) => ({
      ...val,
      [name]:
        typeof value === "string" && !value.trim()
          ? `${placeholder} must not be empty`
          : ""
    }));
  };

  const UploadFileHandler = async (files: any, field: string) => {
    if (files && files.length > 0) {
      const filePath = `/dynamic/images/${organizationId}/Sponsors/`;
      dispatch(setModalLoading(true));
      try {
        const response: any = await UploadFile(
          filePath,
          files[0],
          field,
          "/Sponsors/"
        );
        saveToLocalAndApi({
          name: field,
          value: response.fileUrl,
          placeholder: "Sponsor Logo"
        });
        dispatch(setModalLoading(false));
        setError((val: any) => ({ ...val, logoUrl: "" }));
      } catch (e) {
        dispatch(setModalLoading(false));
      }
    } else {
      setError((val: any) => ({
        ...val,
        logoUrl: ""
      }));
      saveToLocalAndApi({
        name: field,
        value: "",
        placeholder: "Sponsor Logo"
      });
    }
  };
  return (
    <ErrorBoundary>
      <ScrollBar>
        <UIFormGroup
          id={`sponsor_form_${id}`}
          onSubmit={handleSubmit}
          formDisabled={isModalLoading}
        >
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIReactSelect2
                disabled={isModalLoading}
                label='Tier'
                defaultValue={sposorTypes.find(
                  (x) =>
                    x.value.toLowerCase() ===
                    get(eventData, "type", "").toLowerCase()
                )}
                value={sposorTypes.find(
                  (x) =>
                    x.value.toLowerCase() ===
                    get(state, "type", "").toLowerCase()
                )}
                onChange={(event: any) => {
                  saveToLocalAndApi({
                    name: "type",
                    value: event.value,
                    placeholder: "Tier"
                  });
                }}
                options={sposorTypes}
                hasError={!!error.type}
                errorText={error.type}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIInput
                label='Sponsor website'
                placeholder='https://www.abc.com'
                type='text'
                disabled={isModalLoading}
                onChange={(e) => handleFields(e, e.target.value)}
                name='websiteUrl'
                errorText={error.websiteUrl}
                hasError={!!error.websiteUrl}
                value={get(eventData, "websiteUrl", "")}
              />
            </Col>
          </Row>

          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4 px-0'>
              <UIUploadFile
                disabled={isModalLoading}
                label='Sponsor logo'
                dropZoneContent={<div>Upload or select from library</div>}
                accept={"image/jpeg, image/png"}
                maxSize={2 * 1048576}
                maxFiles={1}
                errorText={error.logoUrl}
                changeUploadedFiles={(files) =>
                  UploadFileHandler(files, "logoUrl")
                }
                value={get(eventData, "logoUrl", "").split("/").pop() || ""}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIRadio
                label='Sponsor video'
                name='isBoothVideo'
                onChange={(e) => handleFields(e, false)}
                isChecked={!get(eventData, `isBoothVideo`)}
              />
            </Col>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIRadio
                label='Booth background image'
                name='isBoothVideo'
                onChange={(e) => handleFields(e, true)}
                isChecked={get(eventData, `isBoothVideo`)}
              />
            </Col>
          </Row>

          {eventData.isBoothVideo ? (
            <Row>
              <Col
                md={12}
                xl={12}
                lg={12}
                sm={12}
                xs={12}
                className='mb-4 px-0'
              >
                <UIUploadFile
                  disabled={isModalLoading}
                  label='Booth background image'
                  dropZoneContent={<div>Upload or select from library</div>}
                  accept={"image/jpeg, image/png"}
                  maxSize={2 * 1048576}
                  maxFiles={1}
                  errorText={error.logoUrl}
                  changeUploadedFiles={(files) =>
                    UploadFileHandler(files, "bgSponImageUrl")
                  }
                  value={
                    get(eventData, "bgSponImageUrl", "").split("/").pop() || ""
                  }
                />
              </Col>
            </Row>
          ) : (
            <Row>
              <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
                <UIInput
                  label='Booth video'
                  placeholder='Embedded link, upload or select from library'
                  type='text'
                  disabled={isModalLoading}
                  onChange={(e) => handleFields(e, e.target.value)}
                  name='mediaUrl'
                  errorText={error.mediaUrl}
                  hasError={!!error.mediaUrl}
                  value={get(eventData, "mediaUrl", "")}
                />
              </Col>
            </Row>
          )}
          <Row>
            <Col
              md={12}
              xl={12}
              lg={12}
              sm={12}
              xs={12}
              className='mb-4 d-flex align-items-center'
            >
              <UICheckbox
                label='Add a sponsor lounge'
                disabled={isModalLoading}
                onChange={(e) => {
                  saveToLocalAndApi({
                    name: "sponsorLoungeRedirectToBreakout",
                    value: e.target.checked,
                    placeholder: "Tier"
                  });
                }}
                name='sponsorLoungeRedirectToBreakout'
                isChecked={eventData.sponsorLoungeRedirectToBreakout}
                hasError={!!error.sponsorLoungeRedirectToBreakout}
                value={get(eventData, "sponsorLoungeRedirectToBreakout", true)}
              />
            </Col>
          </Row>
          {eventData.sponsorLoungeRedirectToBreakout && (
            <RolesSpecialPerson title='Roles in the sponsor lounge' />
          )}
          <Row>
            <Col
              md={12}
              xl={12}
              lg={12}
              sm={12}
              xs={12}
              className='mb-4 d-flex align-items-center'
            >
              <UICheckbox
                label='Show sponsor on welcome page'
                disabled={isModalLoading}
                onChange={(e) => {
                  saveToLocalAndApi({
                    name: "isSponsorWelcome",
                    value: e.target.checked,
                    placeholder: ""
                  });
                }}
                name='isSponsorWelcome'
                isChecked={eventData.isSponsorWelcome}
                hasError={!!error.isSponsorWelcome}
                value={get(eventData, "isSponsorWelcome", false)}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <StyledTextAreaLabel>
                <span>Sponsor description</span>
              </StyledTextAreaLabel>
              <BasicCkEditor
                value={get(eventData, "html", "")}
                onValueChange={(data: any) => {
                  if (data) {
                    saveToLocalAndApi({
                      name: "html",
                      value: data,
                      placeholder: "Sponsor description"
                    });
                  }
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIInput
                label='Sponsor followup button label'
                placeholder='Sponsor followup button label'
                name='sponsorFollowupLabel'
                type='text'
                value={get(eventData, "sponsorFollowupLabel", "")}
                onChange={(e) => handleFields(e, e.target.value)}
              />
            </Col>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIInput
                label='Sponsor visit website button label'
                placeholder='Sponsor visit website button label'
                name='sponsorVisitWebsiteLabel'
                type='text'
                value={get(eventData, "sponsorVisitWebsiteLabel", "")}
                onChange={(e) => handleFields(e, e.target.value)}
              />
            </Col>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIInput
                label='Sponsor Lounge button label'
                placeholder='Sponsor Lounge button label'
                name='sponsorLoungeBtn'
                type='text'
                value={get(eventData, "sponsorLoungeBtn", "")}
                onChange={(e) => handleFields(e, e.target.value)}
              />
            </Col>
          </Row>
        </UIFormGroup>
      </ScrollBar>
    </ErrorBoundary>
  );
};
export default ConfigureSponsorBooth;
