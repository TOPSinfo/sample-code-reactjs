import React, { useRef, useState, Fragment, useMemo } from "react";
import { Table, UICheckbox, UIInput, UIModal, UIButton } from "@theme";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from "modules/selectors";
import {
  deleteRowSelected,
  editRowSelected,
  setEventRegistreesRowSelected,
  toggleEditDatabaseModal
} from "modules/actions";
import { sortItems } from "modules/utils";
import "./editDatabaseModal.scss";
import { get } from "lodash";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";

const EditDatabaseModal: React.FC = () => {
  const dispatch = useDispatch();
  const timer: any = useRef(null);
  const tempValues = useRef("");
  const [actionSelected, setActionSelected] = useState({
    type: "",
    index: ""
  });
  const [searchText, setSearchText] = useState("");
  const organizationName = useSelector(selectors.getOrganizationName);

  const showEditDatabaseModal = useSelector(selectors.getEditDatabaseModal);
  const allEventRegistees = useSelector(selectors.getEventRegistees);
  const selectedRow = useSelector(selectors.getEventRegisteesSelectedRow);

  const CancelGroup = () => {
    dispatch(toggleEditDatabaseModal(false));
  };

  const saveData = (data: any) => {
    dispatch(editRowSelected({ selectedRow: data, email: tempValues.current }));
    setActionSelected({
      type: "",
      index: ""
    });
  };

  const deleteData = (data: any) => {
    dispatch(setEventRegistreesRowSelected(data));
    setTimeout(() => {
      const response = window.confirm("Are you sure you want to delete this?");
      if (response) {
        dispatch(deleteRowSelected({ selectedRow: data }));
        setActionSelected({
          type: "",
          index: ""
        });
      }
    }, 250);
  };

  const onRowClick = (state: any, e?: any) => {
    clearTimeout(timer.current);
    if (e.detail === 1) {
      timer.current = setTimeout(() => {
        if (selectedRow && selectedRow.obj_id === state.obj_id)
          dispatch(setEventRegistreesRowSelected(null));
        else dispatch(setEventRegistreesRowSelected(state));
      }, 200);
    } else if (e.detail === 2) {
      const obj = {
        data: null,
        status: true
      };
      if (selectedRow && selectedRow.obj_id === state.obj_id) {
        obj.data = null;
        obj.status = false;
        dispatch(setEventRegistreesRowSelected(obj));
      } else {
        obj.data = state;
        obj.status = true;
        dispatch(setEventRegistreesRowSelected(obj));
      }
    }
  };

  const tableData = useMemo(() => {
    return searchText
      ? allEventRegistees.filter((x) => {
        return (
          x?.name?.toLowerCase()?.indexOf(searchText.toLowerCase()) !== -1 ||
          x?.jobTitle?.toLowerCase()?.indexOf(searchText.toLowerCase()) !==
          -1 ||
          x?.email?.toLowerCase()?.indexOf(searchText.toLowerCase()) !== -1 ||
          false
        );
      })
      : allEventRegistees;
  }, [allEventRegistees, searchText]);

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
          <ImageWrapper className='d-flex align-items-center justify-content-center'>
            <UICheckbox
              label={"\u00a0\u00a0"}
              onChange={() => onRowClick(row.original, { detail: 1 })}
              isChecked={
                selectedRow ? selectedRow.obj_id === row.original.obj_id : false
              }
            />
          </ImageWrapper>
        );
      }
    },
    {
      Header: () => "Name",
      accessor: "name",
      sortable: true,
      disableSortBy: false,
      width: "18.8%",
      sortType: (prev: any, curr: any, columnId: string) => {
        return sortItems(prev, curr, columnId);
      },
      toolTip: "Sort by name",
      Cell: ({ row }: any) => {
        return (
          <div className='d-flex align-items-center'>
            {get(row.original, "name", "--")}
          </div>
        );
      }
    },
    {
      Header: () => "Position",
      accessor: "jobTitle",
      sortable: true,
      disableSortBy: false,
      width: "12%",
      sortType: (prev: any, curr: any, columnId: string) => {
        return sortItems(prev, curr, columnId);
      },
      toolTip: "Sort by position",
      Cell: ({ row }: any) => {
        return <>{row.original.jobTitle || "--"}</>;
      }
    },
    {
      Header: () => "Organization",
      accessor: "organizationName",
      sortable: false,
      disableSortBy: true,
      width: "25.6%",
      Cell: () => {
        return <>{organizationName || "--"}</>;
      },
      toolTip: ""
    },
    {
      Header: () => "Email Address",
      accessor: "email",
      sortable: true,
      disableSortBy: false,
      width: "18.8%",
      id: "email",
      sortType: (prev: any, curr: any, columnId: string) => {
        return sortItems(prev, curr, columnId);
      },
      toolTip: "Sort by email address",
      Cell: ({ row }: any) => {
        return (
          <>
            {actionSelected.index !== row.original.obj_id ? (
              <Fragment>{row.original.email || "--"}</Fragment>
            ) : (
              <Fragment>
                <CustomInput
                  defaultValue={row.original.email}
                  onChange={(value: string) => {
                    tempValues.current = value;
                  }}
                />
              </Fragment>
            )}
          </>
        );
      }
    },
    {
      Header: () => "User Id",
      accessor: "id",
      sortable: true,
      disableSortBy: false,
      width: "18.8%",
      id: "uid",
      sortType: (prev: any, curr: any, columnId: string) => {
        return sortItems(prev, curr, columnId);
      },
      Cell: ({ row }: any) => {
        return <>{row.original.uid || "--"}</>;
      }
    },
    {
      Header: () => "",
      accessor: "",
      sortable: true,
      disableSortBy: false,
      width: "4%",
      id: "action",
      sortType: (prev: any, curr: any, columnId: string) => {
        return sortItems(prev, curr, columnId);
      },
      Cell: ({ row }: any) => {
        return (
          <Fragment>
            {actionSelected.index !== row.original.obj_id ? (
              <div className={"d-flex"}>
                <UIButton
                  label={""}
                  iconPoisition={"after"}
                  icon={"icon-ic-edit-grey"}
                  backgroundColor={"transparent"}
                  onClick={() =>
                    setActionSelected({
                      type: "edit",
                      index: row.original.obj_id
                    })
                  }
                />
                <UIButton
                  label={""}
                  iconPoisition={"after"}
                  icon={"icon-ic-delete-grey-1"}
                  backgroundColor={"transparent"}
                  onClick={() => deleteData(row.original)}
                />
              </div>
            ) : (
              <div className={"d-flex"}>
                <UIButton
                  label={""}
                  iconPoisition={"after"}
                  icon={"icon-ic-content-black"}
                  backgroundColor={"transparent"}
                  onClick={() => saveData(row.original)}
                />
                <UIButton
                  label={""}
                  iconPoisition={"after"}
                  icon={"icon-ic-close-black"}
                  backgroundColor={"transparent"}
                  onClick={() =>
                    setActionSelected({
                      type: "",
                      index: ""
                    })
                  }
                />
              </div>
            )}
          </Fragment>
        );
      }
    }
  ];

  return (
    <UIModal
      show={showEditDatabaseModal}
      onHide={CancelGroup}
      title={`Registered Attendees (${allEventRegistees.length})`}
      closeButton
      size={"lg"}
      className={"custom-tabular-modal"}
      maxHeight={"calc(100vh - 210px)"}
    >
      <Fragment>
        <WrapperRow>
          <Col md={6} xl={6} lg={6} sm={12} xs={12}>
            <UIInput
              type={"text"}
              inputIcon={"icon-ic-search"}
              position={"before"}
              placeholder={"Search by name, organization, position"}
              value={searchText}
              defaultValue={""}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
        </WrapperRow>
        <Table
          columns={columns}
          initialStateSort={[
            {
              id: "name",
              asc: true
            }
          ]}
          data={tableData}
          tablePageSize={10}
          isSelected={selectedRow && selectedRow.obj_id}
          checkSelectedKey='obj_id'
          getTrProps={() => {
            return {};
          }}
          loading={false}
        />
        {tableData.length === 0 && (
          <div className={"d-flex justify-content-center mt-4 mb-4"}>
            {tableData.length <= 0
              ? "No Records available"
              : tableData.length > 0
                ? ""
                : "Loading..."}
          </div>
        )}
      </Fragment>
    </UIModal>
  );
};
export default EditDatabaseModal;
const CustomInput = (props: any) => {
  const [value, setValue] = useState(props.defaultValue);
  const SaveValue = (event: any) => {
    setValue(event.target.value);
    if (props.onChange) {
      props.onChange(event.target.value);
    }
  };
  return (
    <UIInput
      type={"text"}
      defaultValue={props.defaultValue}
      value={value}
      onChange={SaveValue}
    />
  );
};
const WrapperRow = styled(Row)`
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
`;

export const ImageWrapper = styled.div`
  .user {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 5px;
  }
`;

