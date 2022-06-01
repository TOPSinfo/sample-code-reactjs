import React, { useState, useRef, useEffect } from "react";
import {
  UIButton,
  UIModal,
  UIFormGroup,
  LoadingSpinner,
  UIModalFooter,
  UIReactSelect2
} from "@theme";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector, batch } from "react-redux";
import * as selectors from "../../modules/selectors";
import { ErrorBoundary } from "components";
import * as actions from "modules/actions";
import { cloneDeep, set } from "lodash";

export const AddSpeaker: React.FC = () => {
  const isModalLoading = useSelector(selectors.getModalLoading);
  const speakerModalState = useSelector(selectors.getAddSpeakerModalState);
  const selectedPeople = useSelector(selectors.getSelectedPeople);
  const addModalOpenState = useSelector(selectors.getAddOpenModalState);
  const dispatch = useDispatch();
  const modalRef = useRef<any>(
    document.getElementsByClassName("modal").length > 0
      ? document.getElementsByClassName("modal")[0]
      : null
  );
  const userlist = useSelector(selectors.getSelectedTabPeopleListArray(""));
  const speakerData = useSelector(selectors.getConversationSpeakerData);

  const [useroptions, setUserOptions] = useState<any>({
    options: [],
    selectedUser: []
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedPeople) {
      setUserOptions((value: any) => ({ ...value, selectedUser: [] }));
    } else {
      dispatch(actions.createConversationSpeakerActions(selectedPeople));
    }
  }, [selectedPeople, dispatch]);

  useEffect(() => {
    if (addModalOpenState) {
      setUserOptions((val: any) => ({ ...val, selectedUser: [] }));
    }
  }, [addModalOpenState]);

  useEffect(() => {
    if (userlist && Array.isArray(userlist)) {
      const options = userlist.map((data: any) => {
        return {
          label: `${data.firstName} ${data.lastName}`,
          value: data.email,
          ref: data.ref,
          id: data.id
        };
      });
      setUserOptions((value: any) => ({ ...value, options }));
    }
    return () => {
      dispatch(actions.setSelectedPeople(null));
      setUserOptions((val: any) => ({ ...val, options: [], selectedUser: [] }));
    };
  }, [userlist, dispatch]);

  useEffect(() => {
    if (selectedPeople) {
      const options = {
        label: `${selectedPeople.user.firstName} ${selectedPeople.user.lastName}`,
        value: selectedPeople.user.email,
        ref: selectedPeople.ref,
        id: selectedPeople.id
      };
      setUserOptions((value: any) => ({ ...value, selectedUser: options }));
    }
  }, [selectedPeople, userlist]);

  const addPresenters = async (selectedUser: any) => {
    selectedUser = [selectedUser];
    setError("");
    const obj = cloneDeep(speakerData);
    set(obj, "adminPeopleRefId", selectedUser[0].id);
    dispatch(actions.createConversationSpeakerActions(obj));
    setUserOptions((val: any) => ({ ...val, selectedUser: selectedUser }));
  };

  const onSubmit = () => {
    if (useroptions && useroptions.selectedUser.length) {
      selectedPeople
        ? (speakerData.id = selectedPeople.id)
        : (speakerData.id = "");
      dispatch(actions.savingConversationSpeakerAction(speakerData));
      dispatch(actions.setSpeakerModalState(false));
      dispatch(actions.setModalLoading(true));
      dispatch(actions.createConversationSpeakerActions({}));
      dispatch(actions.setSpeakerAddModalOpen(false));
      dispatch(actions.setSelectedPeople(null));
    } else {
      setError("Select User");
    }
  };

  const onHide = () => {
    batch(() => {
      dispatch(actions.setSpeakerModalState(false));
      dispatch(actions.setSpeakerAddModalOpen(false));
    });
  };

  const onCancel = () => {
    dispatch(actions.setSpeakerModalState(false));
    dispatch(actions.setSpeakerAddModalOpen(false));
  };

  const ActionButton = (
    <UIModalFooter buttonAlignments='space-between'>
      <UIButton label='Cancel' border onClick={onCancel} />
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

  return (
    <ErrorBoundary>
      <UIModal
        show={speakerModalState}
        onHide={onHide}
        headerClass={"flex-column"}
        hasFooterBorder={false}
        footer={ActionButton}
        title={selectedPeople ? "Update Speaker" : "Add Speaker"}
      >
        <UIFormGroup>
          {isModalLoading && (
            <LoadingSpinner position={"absolute"} withCoverBg={true} />
          )}
          <Row>
            <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
              <UIReactSelect2
                placeholder='Select Roles'
                label={"Roles"}
                options={useroptions.options}
                menuPortalTarget={modalRef.current}
                onChange={(selectedUser) => addPresenters(selectedUser)}
                value={useroptions.selectedUser}
                errorText={"A tops broadcast room must be moderated"}
                hasError={
                  speakerData.type === "broadcast" &&
                  !useroptions.selectedUser.some((x: any) => x.isModerator)
                }
              />
            </Col>
          </Row>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </UIFormGroup>
      </UIModal>
    </ErrorBoundary>
  );
};
export default AddSpeaker;
