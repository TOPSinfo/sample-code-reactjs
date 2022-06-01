import React, { useState, useEffect } from "react";
import { UICheckbox, Table } from "@theme";
import * as selectors from "modules/selectors";
import { useSelector, useDispatch, batch } from "react-redux";
import {
  setPeopleModalState,
  setSelectedPeople,
  openDeleteModal,
  deletePeople,
  closeDeleteModal,
  setFetchedProfile,
  setDoubleClickSelectedPeople,
  filterTableData
} from "modules/actions";
import { Img } from "react-image";
import usersvg from "assets/img/icons/usersvg.svg";
import {
  ErrorBoundary,
  AddPeople,
  TooltipV2,
  DeleteConfirmModal,
  Filter
} from "components";
import { Tabs, Tab } from "react-bootstrap";
import {
  CardBox,
  Custometab,
  TabsIcons
} from "pages/Dashboard/Dashboard.style";
import { ImageWrapper, UserlistHead } from "./userlist.Style";
import { withProfiler } from "@sentry/react";
import CommonErrorModal from "components/Modal/CommonErrorModal";
import { cloneDeep, isEqual, isEmpty, startCase, toLower } from "lodash";
import { VerticleLine } from "../../components/CommonEventConversation/CreateEvent.style";
import { getAvatarUrl } from "modules/utils";
import { sortItems } from "modules/utils/commonFn";

interface IState {
  showAddUserModal: boolean;
  editUserObj: object;
  isEdit: boolean;
  allSelectUser: boolean;
  deleteUserId: string;
  users: any[];
  selectedTab: string;
}

export const PeopleList = () => {
  const [state, setState] = useState<IState>({
    showAddUserModal: false,
    editUserObj: {},
    isEdit: false,
    allSelectUser: false,
    deleteUserId: "",
    users: [],
    selectedTab: "all"
  });
  const [showDeleteErrorModal, setShowDeleteErrorModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");
  const dataFetchState = useSelector(selectors.getPeopleFetchListStatus);
  const organizationId = useSelector(selectors.getOrganizationID);
  const dispatch = useDispatch();
  const user = useSelector(selectors.getUserProfile);

  const userList = useSelector(
    selectors.getSelectedTabPeopleListArray(selectedTab)
  );
  const selectedPeople = useSelector(selectors.getSelectedPeople);
  const doubleClick = useSelector(selectors.getDoubledClickSelectedPeople);
  const searchedValue = useSelector(selectors.getFilterValue);
  const [stateEventlist, setFilterState] = useState(state.users || []);

  useEffect(() => {
    if (Array.isArray(userList)) {
      const updatedUserList = cloneDeep(userList);
      updatedUserList.map((user) => (user.status = getPeopleStatus(user)));
      if (!isEqual(updatedUserList, state.users)) {
        // deep compare user list
        setState({
          ...state,
          users: updatedUserList
        });
      }
    }
  }, [userList, selectedTab]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => {
      dispatch(
        setDoubleClickSelectedPeople({ state: selectedPeople, status: false })
      );
      dispatch(filterTableData(""));
    };
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (doubleClick)
      batch(() => {
        dispatch(setFetchedProfile(null));
        dispatch(setPeopleModalState(true));
      });
  }, [doubleClick, dispatch]);

  const columns = [
    {
      Header: () => "",
      accessor: "",
      id: "CHECKBOX",
      sortable: false,
      disableSortBy: true,
      width: "2%",
      className: "custom-spacing",
      headerClassName: "sticky",
      Cell: ({ row }: any) => {
        return (
          <ImageWrapper className='d-flex align-items-center'>
            <UICheckbox
              label={"\u00a0\u00a0"}
              onChange={() => {
                console.log(row.original);
              }}
              isChecked={
                selectedPeople && selectedPeople.email === row.original.email
              }
            />
          </ImageWrapper>
        );
      }
    },
    {
      Header: () => "Name",
      accessor: "firstName",
      id: "firstName",
      sortable: true,
      disableSortBy: false,
      width: "24.5%",
      className: "custom-spacing",
      headerClassName: "sticky",
      sortType: (prev: any, curr: any, columnId: string) => {
        return sortItems(prev, curr, columnId);
      },
      toolTip: "Sort by name",
      Cell: ({ row }: any) => {
        return (
          <ImageWrapper className='d-flex align-items-center'>
            <Img
              className='user'
              src={[
                getAvatarUrl(row.original.imageSrc, organizationId),
                getAvatarUrl(row.original.avatar, organizationId),
                row.original.imageSrc,
                row.original.avatar,

                usersvg
              ]}
              alt='user'
            />
            {row.original.firstName} {row.original.lastName}
          </ImageWrapper>
        );
      }
    },
    {
      Header: () => "Email Address",
      accessor: "email",
      sortable: true,
      disableSortBy: false,
      width: "24.5%",
      toolTip: "Sort by email address",
      sortType: (prev: any, curr: any, columnId: string) => {
        return sortItems(prev, curr, columnId);
      },
      Cell: ({ row }: any) => {
        return <>{row.original.email}</>;
      }
    },
    {
      Header: () => "Organization",
      accessor: "companyName",
      sortable: true,
      disableSortBy: false,
      width: "24.5%",
      toolTip: "Sort by organization",
      sortType: (prev: any, curr: any, columnId: string) => {
        return sortItems(prev, curr, columnId);
      },
      Cell: ({ row }: any) => {
        return <>{row.original.companyName}</>;
      }
    },
    {
      Header: () => "Status",
      accessor: "status",
      width: "24.5%",
      toolTip: "Sort by status",
      sortable: true,
      disableSortBy: false,
      sortType: (prev: any, curr: any, columnId: string) => {
        return sortItems(prev, curr, columnId);
      },
      Cell: ({ row }: any) => {
        return <>{startCase(toLower(row.original.status))}</>;
      }
    }
  ];

  const openAddPeopleModal = (e: any) => {
    e.preventDefault();
    dispatch(setSelectedPeople(null));
    dispatch(setFetchedProfile(null));
    dispatch(setPeopleModalState(true));
  };
  const openEditAdminUserModal = (e: any) => {
    e.preventDefault();
    if (selectedPeople) {
      dispatch(setFetchedProfile(null));
      dispatch(setPeopleModalState(true));
    }
  };

  let timer: any;

  const openDelModal = (e: any) => {
    e.preventDefault();
    if (selectedPeople && user.email !== selectedPeople.email)
      dispatch(openDeleteModal());
    else {
      setShowDeleteErrorModal(true);
    }
  };
  const onDelete = () => {
    if (selectedPeople && user.email !== selectedPeople.email)
      dispatch(deletePeople(selectedPeople));
    else {
      dispatch(closeDeleteModal());
      setShowDeleteErrorModal(true);
    }
  };

  const onRowClick = (state: any, e?: any) => {
    clearTimeout(timer);
    if (e.detail === 1) {
      timer = setTimeout(() => {
        if (selectedPeople && selectedPeople.email === state.email)
          dispatch(setSelectedPeople(null));
        else dispatch(setSelectedPeople(state));
      }, 200);
    } else if (e.detail === 2) {
      const obj = {
        data: null,
        status: true
      };
      if (selectedPeople && selectedPeople.email === state.email) {
        obj.data = null;
        obj.status = false;
        dispatch(setDoubleClickSelectedPeople(obj));
      } else {
        obj.data = state;
        obj.status = true;
        dispatch(setDoubleClickSelectedPeople(obj));
      }
      dispatch(setPeopleModalState(true));
      dispatch(setSelectedPeople(state));
    }
  };

 

  useEffect(() => {
    if (searchedValue && searchedValue?.length && state.users.length > 0) {
      const filteredArray = state.users.filter(
        (event: any) =>
          (event.firstName &&
            event.firstName
              .toLocaleLowerCase()
              .includes(searchedValue.toLocaleLowerCase())) ||
          (event.lastName &&
            event.lastName
              .toLocaleLowerCase()
              .includes(searchedValue.toLocaleLowerCase())) ||
          (event.email &&
            event.email
              .toLocaleLowerCase()
              .includes(searchedValue.toLocaleLowerCase())) ||
          (event.companyName &&
            event.companyName
              .toLocaleLowerCase()
              .includes(searchedValue.toLocaleLowerCase())) ||
          (event.status &&
            event.status
              .toLocaleLowerCase()
              .includes(searchedValue.toLocaleLowerCase()))
        // getStatusFiltered(event, searchedValue)
      );
      setFilterState(filteredArray);
    } else {
      setFilterState(state.users);
    }
  }, [state.users, searchedValue]); // eslint-disable-line react-hooks/exhaustive-deps



  const getPeopleStatus = (row: any) => {
    let isAssigned = false;
    if (row.roles) {
      const allEvents = Object.keys(row.roles);
      allEvents.forEach((eventId) => {
        if (Object.keys(row.roles[eventId]).length > 0) {
          isAssigned = true;
        }
      });
    }
    if (isEmpty(row.roles) || !isAssigned) {
      return "Not Assigned";
    } else if (!isEmpty(row.roles) && row.status.toLowerCase() === "pending") {
      return "Invited";
    } else if (!isEmpty(row.roles) && row.status.toLowerCase() === "active") {
      return row.status;
    }
  };

  return (
    <>
      <CardBox withoutPadding>
        <UserlistHead className='user-list-head'>
          <h2>People</h2>
        </UserlistHead>
        <Custometab>
          <TabsIcons>
            {selectedPeople && (
              <TooltipV2 infoText={"Delete"}>
                <a href='' onClick={(e) => openDelModal(e)}>
                  <i className='icon-ic-delete-grey-1' />
                </a>
              </TooltipV2>
            )}
            {selectedPeople && (
              <>
                <TooltipV2 infoText={"Edit"}>
                  <a href='' onClick={(e) => openEditAdminUserModal(e)}>
                    <i className='icon-ic-edit-grey' />
                  </a>
                </TooltipV2>
                <VerticleLine />
              </>
            )}
            <TooltipV2 infoText={"Add People"}>
              <a href='' onClick={(e) => openAddPeopleModal(e)}>
                <i className='icon-ic-addmember-black' />
              </a>
            </TooltipV2>
            <div
              className='searched-input'
              style={{ paddingRight: "31px", margin: "-19px" }}
            >
              <Filter placeholder='Search by Name, Email,Organizatoin,Status' />
            </div>
          </TabsIcons>
          <ErrorBoundary>
            <Tabs
              defaultActiveKey={selectedTab}
              id='uncontrolled-tab-example'
              onSelect={(key: any) => setSelectedTab(key)}
            >
              <Tab eventKey='all' title='All'>
                {stateEventlist.length === 0 && searchedValue ? (
                  <h1
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "25px"
                    }}
                  >
                    Data not found
                  </h1>
                ) : (
                  <Table
                    columns={columns}
                    loading={dataFetchState}
                    initialStateSort={[
                      {
                        id: "firstName",
                        asc: true
                      }
                    ]}
                    data={stateEventlist}
                    getTrProps={() => {
                      return {};
                    }}
                    onClick={(state: any, e: any) => onRowClick(state, e)}
                    isSelected={selectedPeople && selectedPeople.email}
                    checkSelectedKey='email'
                  />
                )}
              </Tab>
              <Tab eventKey='recent' title='Recent'>
                {stateEventlist.length === 0 && searchedValue ? (
                  <h1
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "25px"
                    }}
                  >
                    Data not found
                  </h1>
                ) : (
                  <Table
                    columns={columns}
                    loading={dataFetchState}
                    initialStateSort={[
                      {
                        id: "firstName",
                        asc: true
                      }
                    ]}
                    data={stateEventlist}
                    getTrProps={() => {
                      return {};
                    }}
                    onClick={(state: any, e: any) => onRowClick(state, e)}
                    isSelected={selectedPeople && selectedPeople.email}
                    checkSelectedKey='email'
                  />
                )}
              </Tab>
            </Tabs>
          </ErrorBoundary>
        </Custometab>
      </CardBox>
      <AddPeople />
      <DeleteConfirmModal
        title={
          selectedPeople &&
          `user ${selectedPeople.firstName} ${selectedPeople.lastName}`
        }
        onDelete={onDelete}
        onClose={() => {
          console.log("Modal closed");
        }}
        info=''
      />
      <CommonErrorModal
        show={showDeleteErrorModal}
        onHide={() => {
          setShowDeleteErrorModal(false);
        }}
        hasFooterBorder={true}
        customBodyPadding='10px 20px 25px 10px'
        closeButtonName={"Close"}
        message={"You cannot delete your own profile"}
      />
    </>
  );
};
export default withProfiler(PeopleList);
