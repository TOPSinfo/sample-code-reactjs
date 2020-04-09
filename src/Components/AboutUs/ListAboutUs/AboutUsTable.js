import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Loader } from '../../../utils/Loader/Loader';
import ConfirmationPopUp from '../../../utils/Confirmation.component/ConfirmationPopUp';
import { deleteAboutUs } from '../store/aboutUs.actions';
const AboutUsTable = ({
  data,
  totalRows,
  loading,
  fetchAboutUsApi,
  pageSize,
  pageIndex,
  history,
  deleteAboutUs,
}) => {
  const [tableData, setTableData] = useState({
    pageSize: 10,
    showModal: false,
    rowData: '',
    ConfirmationMsg: '',
  });
  const onChangePage = async page => {
    let params = {
      pageIndex: page,
      pageSize,
    };
    await fetchAboutUsApi(params);
  };
  const onChangeRowsPerPage = async currentRowsPerPage => {
    let data = {
      pageIndex: 1,
      pageSize: currentRowsPerPage,
    };
    await fetchAboutUsApi(data);
  };

  const handleDeleteModal = row => {
    let msg = 'Are you sure you want to delete about us?';
    setTableData({
      ...tableData,
      showModal: true,
      ConfirmationMsg: msg,
      rowData: row,
    });
  };

  const deleteAboutUsById = async () => {
    const res = await deleteAboutUs(tableData.rowData._id);
    if (res) {
      let params = {
        pageIndex: 1,
        pageSize,
      };
      if (data.length - 1 > 0) {
        params.pageIndex = pageIndex;
      } else if (data.length - 1 <= 0) {
        params.pageIndex = 1;
      }
      await fetchAboutUsApi(params);
    }
    setTableData({ ...tableData, showModal: false });
  };

  const editAboutUs = async id => {
    history.push(`/aboutus/edit/${id}`);
  };
  const columns = [
    {
      name: 'Title',
      selector: 'title',
      sortable: true,
      ignoreRowClick: true,
    },
    {
      name: 'Position',
      selector: 'position',
      sortable: true,
      ignoreRowClick: true,
    },
    {
      name: 'Actions',
      grow: 0.5,
      cell: row => (
        <div className="action-column">
          <>
            <i
              title="Remove"
              onClick={() => handleDeleteModal(row)}
              className="cui-trash icons font-20 ml-1"
            />
            <i
              title="Edit"
              onClick={() => editAboutUs(row._id)}
              className="cui-pencil icons font-20 ml-1"
            />
          </>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        pagination={true}
        paginationServer={true}
        progressPending={loading}
        progressComponent={<Loader />}
        paginationTotalRows={totalRows}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
      <ConfirmationPopUp
        onOpen={tableData.showModal}
        onConfirm={deleteAboutUsById}
        message={tableData.ConfirmationMsg}
        toggle={() =>
          setTableData({ ...tableData, showModal: !tableData.showModal })
        }
      />
    </>
  );
};

const mapStateToProps = ({ alert }) => ({
  loading: alert.listLoading,
});

const mapDispatchToProps = { deleteAboutUs };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AboutUsTable));
