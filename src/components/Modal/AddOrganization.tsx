import React, { useState } from "react";
import {
  UIModal,
  UIButton,
  UIInput,
  UIHeaderText,
  UIFormGroup,
  UIModalFooter
  // UIReactSelect2
} from "@theme";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";
import { useDispatch, useSelector, batch } from "react-redux";
import * as selectors from "modules/selectors";
import {
  setOrganizationModalState,
  createOrganization
  // fetchOrganizationsByContractId,
  // authUserSuccess,
  // resetOrganizationData,
  // setContractId
} from "modules/actions";

const AddOrganization: React.FC = () => {
  const isCreateMode = true;
  const dispatch = useDispatch();
  // const [selectedContractId, setSelectedContractId] = useState<any>(null);
  // const [selectedOrgId, setSelectedOrgId] = useState<any>(null);
  const orgModalState = useSelector(selectors.getOrganizationModalState);
  const [organizationName, setOrgName] = useState<string>("");
  // const organizations = useSelector(selectors.getOrganizations);
  // const organizationId = useSelector(selectors.getOrganizationId);
  // const contractId = useSelector(selectors.getContractId);
  // const contractIds = useSelector(selectors.getContractIds);
  // const [contractOptions, setContractOptions] = useState<any[]>([]);
  // const [orgOptions, setOrgOptions] = useState<any[]>([]);

  const onHide = () => {
    batch(() => {
      dispatch(setOrganizationModalState(false));
    });
  };

  const onSave = () => {
    batch(() => {
      dispatch(createOrganization(organizationName));
      dispatch(setOrganizationModalState(false));
    });
  };

  // const onSave = () => {
  //   if (selectedOrgId) {
  //     const obj = {
  //       organizationId: selectedOrgId?.value
  //     };

  //     batch(() => {
  //       dispatch(setContractId(selectedContractId?.value));
  //       dispatch(resetOrganizationData());
  //       dispatch(authUserSuccess(obj));
  //       dispatch(setOrganizationModalState(false));
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (contractIds && contractIds.length) {
  //     const contractIdOptions = contractIds.map((id) => {
  //       if (id === contractId) {
  //         setSelectedContractId({ value: id, label: id });
  //       }
  //       return { value: id, label: id };
  //     });
  //     setContractOptions(contractIdOptions);
  //   }
  // }, [contractIds, dispatch, contractId]);

  // useEffect(() => {
  //   if (organizations && organizations.length) {
  //     const orgOptions = organizations.map((organization) => {
  //       const obj = {
  //         value: organization.id,
  //         label: `${organization.name} (${organization.id})`
  //       };
  //       if (organization.id === organizationId) {
  //         setSelectedOrgId(obj);
  //       }
  //       return obj;
  //     });
  //     setOrgOptions(orgOptions);
  //   }
  // }, [organizations, dispatch, organizationId]);

  // const changeContractId = useCallback(
  //   (contract) => {
  //     dispatch(fetchOrganizationsByContractId(contract.value));
  //     setSelectedContractId(contract);
  //   },
  //   [dispatch]
  // );

  const handleFields = (e: any) => {
    const value = e.target.value;

    setOrgName(value);
  };

  const ActionButton = (
    <UIModalFooter buttonAlignments='center'>
      <React.Fragment>
        <UIButton label='Cancel' border onClick={onHide} />
        <UIButton label={!isCreateMode ? "Save" : "Create"} onClick={onSave} />
      </React.Fragment>
    </UIModalFooter>
  );

  return (
    <UIModal
      show={orgModalState}
      onHide={onHide}
      title={
        isCreateMode
          ? "Add a new organization"
          : "Change contract or organization"
      }
      closeButton={isCreateMode}
      footer={ActionButton}
    >
      <WrapperModal>
        <UIFormGroup>
          {isCreateMode && (
            <Row>
              <Col md={12} xl={12} lg={12} sm={12} xs={12}>
                <UIHeaderText
                  typeOf='text-h4'
                  text='Welcome to the tops Administration Console. It looks like you don’t have an organization yet, so let’s start by creating one.'
                />
              </Col>

              <Col
                md={12}
                xl={12}
                lg={12}
                sm={12}
                xs={12}
                className='mt-4 mb-4'
              >
                <UIInput
                  label='Organization Name'
                  placeholder='Enter Organization'
                  type='text'
                  required
                  maxLength={30}
                  showCount
                  onChange={handleFields}
                  // errorText={error.firstName}
                  // hasError={!!error.firstName}
                  value={organizationName}
                />
              </Col>
            </Row>
          )}
          {/* <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIReactSelect2
                placeholder='Select Contract Id'
                required
                value={selectedContractId}
                onChange={(event: any) => {
                  changeContractId(event);
                }}
                options={contractOptions}
              />
            </Col>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIReactSelect2
                placeholder='Select Organization Id'
                required
                value={selectedOrgId}
                onChange={(event: any) => {
                  setSelectedOrgId(event);
                }}
                options={orgOptions}
              />
            </Col>
          </Row> */}
        </UIFormGroup>
      </WrapperModal>
    </UIModal>
  );
};
export default AddOrganization;
const WrapperModal = styled.div`
  width: 100%;
  height: 100%;
`;
