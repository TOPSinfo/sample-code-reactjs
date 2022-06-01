import React, { useEffect, useRef, useState } from "react";
import { UICheckbox, UIRadio, Table, UIReactSelect2 } from "@theme";
import { Row, Col } from "react-bootstrap";
import info from "assets/img/icons/ic-info.svg";
import { cloneDeep, set } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "modules/selectors";
import * as actions from "modules/actions";
import {
  getManipulatedPresentersModerators,
  sortItems
} from "modules/utils/commonFn";
interface IProps {
  title?: string;
}
const RolesSpecialPerson = (props: IProps) => {
  const dispatch = useDispatch();
  const modalRef = useRef<any>(
    document.getElementsByClassName("modal").length > 0
      ? document.getElementsByClassName("modal")[0]
      : null
  );
  const componentType = useSelector(selectors.getEventType)
  const eventDetail = useSelector(selectors.getEventComponentData);
  const conversationDetail = useSelector(selectors.getConversationComponentData);
  const userlist = useSelector(selectors.getSelectedTabPeopleListArray(""));
  // const eventData = useSelector(selectors.getEventComponentData);
  const eventData = componentType === "conversation" ? conversationDetail : eventDetail;

  const [useroptions, setUserOptions] = useState<any>({
    options: [],
    selectedUser: []
  });
  const selectedEvent = useSelector(selectors.getSelectedEventComponents)
  const selectedConversation = useSelector(selectors.getSelectedConversationComponents)
  const selectedEventComponent = componentType === "conversation" ? selectedConversation : selectedEvent

  useEffect(() => {
    if (userlist && Array.isArray(userlist)) {
      const options = userlist.map((data: any) => {
        return {
          label: `${data.firstName} ${data.lastName}`,
          value: data.email,
          ref: data.ref,
          checked: "Others",
          isPresenter: false,
          isModerator: false
        };
      });
      setUserOptions((value: any) => ({ ...value, options }));
    }
    return () => {
      dispatch(actions.setSelectedEvent(null));
      setUserOptions((val: any) => ({ ...val, options: [], selectedUser: [] }));
    };
  }, [userlist, dispatch]);

  useEffect(() => {
    if (selectedEventComponent) {
      let options = [] as any;
      const referencedData = { ...selectedEventComponent };
      let allData: any[] = [];
      if (referencedData?.presenters && referencedData.presenters.length) {
        allData = allData.concat(referencedData.presenters);
      }
      if (referencedData?.moderators && referencedData.moderators.length) {
        allData = allData.concat(referencedData.moderators);
      }
      if (referencedData?.tags?.presenters.length) {
        allData = allData.concat(referencedData?.tags?.presenters);
      }
      if (referencedData?.tags?.moderators.length) {
        allData = allData.concat(referencedData?.tags?.moderators);
      }
      if (referencedData?.tags?.others.length) {
        allData = allData.concat(referencedData?.tags?.others);
      }
      if (Array.isArray(allData) && allData.length > 0) {
        options = getManipulatedPresentersModerators(
          allData,
          userlist,
          referencedData?.presenters ?? [],
          referencedData?.moderators ?? [],
          referencedData?.tags?.presenters ?? [],
          referencedData?.tags?.moderators ?? [],
          referencedData?.tags?.others ?? []
        );
      }

      setUserOptions((value: any) => ({ ...value, selectedUser: options }));
    }
  }, [selectedEventComponent, userlist]);

  const handlePersonsRole = (tag: string, id: number) => {
    const selectedUser = useroptions.selectedUser;
    const index = selectedUser.findIndex((val: any) => val.value === id);
    if (tag === "Presenter") {
      selectedUser[index].isPresenter = !selectedUser[index].isPresenter;
    }
    if (tag === "Moderator") {
      selectedUser[index].isModerator = !selectedUser[index].isModerator;
    }

    setOptionsByRole(selectedUser);
  };

  const handlePersonsTag = (tag: string, id: number) => {
    const selectedUser = useroptions.selectedUser;
    const index = selectedUser.findIndex((val: any) => val.value === id);
    selectedUser[index].checked = tag;

    setOptionsByTag(selectedUser);
  };

  const addPresenters = async (selectedUser: any) => {
    const presenters = selectedUser
      .filter((val: any) => val.checked === "Presenter")
      .map((val: any) => val.ref);
    const moderators = selectedUser
      .filter((val: any) => val.checked === "Moderator")
      .map((val: any) => val.ref);
    const others = selectedUser
      .filter((val: any) => val.checked === "Others")
      .map((val: any) => val.ref);
    const obj = cloneDeep(eventData);

    set(obj, "tags.presenters", presenters);
    set(obj, "tags.moderators", moderators);
    set(obj, "tags.others", others);
    const rolePresenters = selectedUser
      .filter((val: any) => val.isPresenter)
      .map((val: any) => val.ref);
    const roleModerators = selectedUser
      .filter((val: any) => val.isModerator)
      .map((val: any) => val.ref);
    set(obj, "presenters", rolePresenters);
    set(obj, "moderators", roleModerators);

    if (componentType === "conversation") {
      dispatch(actions.createConversationComponentActions(obj));
    } else {
      dispatch(actions.createEventComponentActions(obj));
    }
    setUserOptions((val: any) => ({ ...val, selectedUser }));
  };

  const setOptionsByRole = (selectedUser: any) => {
    const presenters = selectedUser
      .filter((val: any) => val.isPresenter)
      .map((val: any) => val.ref);
    const moderators = selectedUser
      .filter((val: any) => val.isModerator)
      .map((val: any) => val.ref);
    const obj = cloneDeep(eventData);

    set(obj, "presenters", presenters);
    set(obj, "moderators", moderators);
    if (componentType === "conversation") {
      dispatch(actions.createConversationComponentActions(obj));
    } else {
      dispatch(actions.createEventComponentActions(obj));
    }
    setUserOptions((val: any) => ({ ...val, selectedUser }));
  };

  const setOptionsByTag = (selectedUser: any) => {
    const presenters = selectedUser
      .filter((val: any) => val.checked === "Presenter")
      .map((val: any) => val.ref);
    const moderators = selectedUser
      .filter((val: any) => val.checked === "Moderator")
      .map((val: any) => val.ref);
    const others = selectedUser
      .filter((val: any) => val.checked === "Others")
      .map((val: any) => val.ref);
    const obj = cloneDeep(eventData);

    set(obj, "tags.presenters", presenters);
    set(obj, "tags.moderators", moderators);
    set(obj, "tags.others", others);
    if (componentType === "conversation") {
      console.log("obj111", obj)
      dispatch(actions.createConversationComponentActions(obj));
    } else {
      dispatch(actions.createEventComponentActions(obj));
    }
    // dispatch(actions.createEventComponentActions(obj));
    setUserOptions((val: any) => ({ ...val, selectedUser }));
  };

  const columns = [
    {
      Header: () => "Person Name",
      accessor: "name",
      sortable: true,
      disableSortBy: false,
      width: "20%",
      sortType: (prev: any, curr: any, columnId: string) => {
        return sortItems(prev, curr, columnId);
      },
      toolTip: "Sort by name",
      Cell: ({ row }: any) => {
        return (
          <div className='d-flex align-items-center'>
            {row.original.label ? row.original.label : "--"}
          </div>
        );
      }
    },
    {
      Header: () => (
        <span>
          Tag as <img src={info} alt='info' />
        </span>
      ),
      accessor: "radio",
      sortable: false,
      disableSortBy: true,
      width: "40%",
      Cell: ({ row }: any) => {
        return (
          <React.Fragment>
            <span>
              <UIRadio
                isChecked={row.original.checked === "Presenter"}
                label='Speaker'
                name={`userType${row.id}`}
                onChange={() =>
                  handlePersonsTag("Presenter", row.original.value)
                }
                value='Presenter'
              />
              <UIRadio
                isChecked={row.original.checked === "Moderator"}
                label='Host'
                name={`userType${row.id}`}
                onChange={() =>
                  handlePersonsTag("Moderator", row.original.value)
                }
                value='Moderator'
              />
              <UIRadio
                isChecked={row.original.checked === "Others"}
                label='None'
                name={`userType${row.id}`}
                onChange={() => handlePersonsTag("Others", row.original.value)}
                value=''
              />
            </span>
          </React.Fragment>
        );
      }
    },
    {
      Header: () => (
        <span>
          Role(s) <img src={info} alt='info' />
        </span>
      ),
      accessor: "checkbox",
      sortable: false,
      disableSortBy: true,
      width: "40%",
      Cell: ({ row }: any) => {
        return (
          <React.Fragment>
            <span>
              <UICheckbox
                isChecked={row.original.isPresenter}
                label='Speaker'
                name={`userType${row.id}`}
                onChange={() =>
                  handlePersonsRole("Presenter", row.original.value)
                }
                value='Presenter'
              />
              <UICheckbox
                isChecked={row.original.isModerator}
                label='Host'
                name={`userType${row.id}`}
                onChange={() =>
                  handlePersonsRole("Moderator", row.original.value)
                }
                value='Moderator'
              />
            </span>
          </React.Fragment>
        );
      }
    }
  ];

  return (
    <>
      <Row>
        <Col md={12} xl={12} lg={12} sm={12} xs={12} className='mb-4'>
          <UIReactSelect2
            multiple
            placeholder='Select Roles'
            label={props.title || "Roles"}
            options={useroptions.options}
            menuPortalTarget={modalRef.current}
            onChange={(selectedUser) => addPresenters(selectedUser)}
            value={useroptions.selectedUser}
            errorText={"A tops broadcast room must be moderated"}
            hasError={
              eventData.type === "broadcast" &&
              !useroptions.selectedUser.some((x: any) => x.isModerator)
            }
          />
        </Col>
      </Row>
      {useroptions.selectedUser.length > 0 && (
        <Row>
          <Col
            md={12}
            xl={12}
            lg={12}
            sm={12}
            xs={12}
            className='mb-4 Configuration-table'
          >
            <div className='table-responsive'>
              <Table
                columns={columns}
                initialStateSort={[
                  {
                    id: "USERNAME",
                    asc: true
                  }
                ]}
                data={useroptions.selectedUser}
                getTrProps={() => {
                  return {};
                }}
              />
            </div>
          </Col>
        </Row>
      )}
    </>
  );
};
export default RolesSpecialPerson;
