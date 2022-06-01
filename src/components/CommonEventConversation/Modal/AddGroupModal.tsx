import React, { useState, useEffect } from "react";
import {
  UIModal,
  UIInput,
  UICheckbox,
  UIFormGroup,
  UIButton,
  UIModalFooter
} from "@theme";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import info from "assets/img/icons/ic-info.svg";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from "../../../modules/selectors";
import {
  toggleAddGroupModal,
  saveGroupData,
  setSelectedGroup
} from "../../../modules/actions";

const AddGroupModal: React.FC = () => {
  const [state, setState] = useState({
    name: "",
    priority: 1,
    isCheckedPolls: false
  });
  const [groupDisableBtn, setGroupDisableBtn] = useState(false);
  const [error, setError] = useState({
    name: ""
  });
  const dispatch = useDispatch();

  const addGroupModal = useSelector(selectors.getAddGroupModal);
  const selectedGroup = useSelector(selectors.getSelectedGrouplist);
  const groupListData = useSelector(selectors.getGrouplist);

  const handlefields = (e: any) => {
    if (e.target.name === "isCheckedPolls") {
      setState({ ...state, isCheckedPolls: e.target.checked });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (selectedGroup) {
      const obj = {
        name: selectedGroup.value,
        priority: selectedGroup.priority,
        isCheckedPolls: selectedGroup.isCheckedPolls
      };
      setState(obj);

      const checkedData = groupListData.find((group) => {
        return group.isCheckedPolls === true;
      });

      const disabledData = !!(
        checkedData && checkedData.id !== selectedGroup.id
      );
      setGroupDisableBtn(disabledData);
    } else {
      const checkedData = groupListData.find((group) => {
        return group.isCheckedPolls === true;
      });
      setGroupDisableBtn(checkedData);
    }
  }, [selectedGroup, groupListData]);

  const checkFieldValidation = () => {
    let formIsValid = true;
    const errorObj = {
      name: ""
    };

    if (!state.name) {
      errorObj.name = "group name must not empty";
      formIsValid = false;
    }
    setError(errorObj);
    return formIsValid;
  };

  const AddGroup = () => {
    let obj;
    if (selectedGroup.id !== "") {
      obj = {
        ...state,
        id: selectedGroup.id,
        prevCheckedValue: selectedGroup.isCheckedPolls
      };
    } else {
      obj = state;
    }
    if (checkFieldValidation()) {
      dispatch(saveGroupData(obj));
      dispatch(toggleAddGroupModal(false));
      setState({ ...state, name: "", priority: 1, isCheckedPolls: false });
      dispatch(setSelectedGroup(""));
    }
  };

  const CancelGroup = () => {
    dispatch(toggleAddGroupModal(false));
    setState({ ...state, name: "", priority: 1, isCheckedPolls: false });
    dispatch(setSelectedGroup(""));
    setError({ ...error, name: "" });
  };

  const ActionButton = (
    <UIModalFooter buttonAlignments='space-between'>
      <React.Fragment>
        <UIButton label='Cancel' border onClick={CancelGroup} />
        <UIButton
          label={selectedGroup?.id ? "Update" : "Add"}
          onClick={AddGroup}
        />
      </React.Fragment>
    </UIModalFooter>
  );
  return (
    <UIModal
      show={addGroupModal}
      onHide={CancelGroup}
      title={selectedGroup?.id ? "Edit Group" : "Add Group"}
      footer={ActionButton}
    >
      <UIFormGroup>
        <Row>
          <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
            <UIInput
              label='Group Name'
              placeholder='Enter Group Name'
              type='text'
              showCount
              maxLength={30}
              errorText={error.name}
              hasError={!!error.name}
              onChange={(e) => handlefields(e)}
              name='name'
              value={state.name}
              disabled={state.name === "Default"}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
            <UIInput
              label='Priority'
              type='number'
              labelWithIcon
              iconSvg={info}
              value={state.priority}
              onChange={(e) => handlefields(e)}
              name='priority'
              disabled={true}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
            <div className='checkgrouprow'>
              <UICheckbox
                label='Polls are exclusively triggered to this group'
                name='isCheckedPolls'
                position='after'
                isChecked={state.isCheckedPolls}
                onChange={(e) => handlefields(e)}
                disabled={groupDisableBtn || state.name === "Default"}
              />
            </div>
          </Col>
        </Row>
        {/* <Row>
          <Col
            md={12}
            xl={12}
            lg={12}
            sm={12}
            xs={12}
            className='mb-4 group-checkbox'
          >
            <label className='label-info mb-3'>
              <span>Policies</span>
            </label>
            <span className='inputlabelbox'>A group member can:</span>

            <div className='membercheckgroup mt-1'>
              <div className='checkgrouprow'>
                <UICheckbox
                  label='See & use event chat'
                  name='team-admin'
                  position='after'
                />
              </div>

              <div className='checkgrouprow'>
                <UICheckbox
                  label='See & use room chat'
                  name='team-admin'
                  position='after'
                />
              </div>

              <div className='checkgrouprow'>
                <UICheckbox
                  label='Write questions to moderators'
                  name='team-admin'
                  position='after'
                />
              </div>

              <div className='checkgrouprow'>
                <UICheckbox
                  label='Raise their hand'
                  name='team-admin'
                  position='after'
                />
              </div>

              <div className='checkgrouprow'>
                <UICheckbox
                  label='View event participants and their profile'
                  name='team-admin'
                  position='after'
                />
              </div>

              <div className='checkgrouprow'>
                <UICheckbox
                  label='View room participants and their profile'
                  name='team-admin'
                  position='after'
                />
              </div>

              <div className='checkgrouprow'>
                <UICheckbox
                  label='Access lounge(s)'
                  name='team-admin'
                  position='after'
                />
              </div>

              <div className='checkgrouprow'>
                <UICheckbox
                  label='Access (other) sponsors booths'
                  name='team-admin'
                  position='after'
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col
            md={12}
            xl={12}
            lg={12}
            sm={12}
            xs={12}
            className='mb-4 group-checkbox'
          >
            <label className='label-info mb-3'>
              <span>Access rights to components</span>
            </label>
            <div className='access-checkbox'>
              <UICheckbox
                label='Add to the access list of all components of this event'
                name='team-admin'
                position='after'
              />
              <span className='ml-2'>
                <img src={info} alt='info' className='info-icon' />
              </span>
            </div>
          </Col>
        </Row> */}
      </UIFormGroup>
    </UIModal>
  );
};
export default AddGroupModal;
