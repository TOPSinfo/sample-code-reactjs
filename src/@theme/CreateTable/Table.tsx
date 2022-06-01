import { useTable, useExpanded, useSortBy, usePagination } from "react-table";
import React, { useEffect } from "react";
import styled from "styled-components";
import { LoadingSpinner, Pagination } from "@theme";
import upSortingArrow from "assets/img/icons/up-sorting-grey.svg";
import downSortingArrow from "assets/img/icons/sorting-down.svg";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { chunkArrayInGroups } from "modules/utils/commonFn";
import * as selectors from "modules/selectors";
import { useSelector } from "react-redux";

const CustomTable = styled.table`
  border: solid 1px #e9ecef;
    & .text-center{
      text-align: center;
    }
    & thead{
      background-color: #f6f9fc;
      & th{
        padding: 15px;        
        font-size: 14px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #8a9fba;
        border-bottom: solid 1px #e9ecef;
        &:first-child{
          padding-left: 70px;
        }
        &:last-child{
          padding-right: 70px;
        }
      }
    }
    & tbody{
      .clicked-tr {
        background: rgba(0,87,228,0.1);
      }
      tr{
        td{
          cursor: pointer;
          padding: 15px;
          border-bottom: solid 1px #e9ecef;
          font-size: 14px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: normal;
          color: #283747;
          vertical-align: middle;
          user-select:none;
          &:first-child{
            padding-left: 70px;
          }
          &:last-child{
            padding-right: 70px;
          }
          .yellow{
            color: #f7b924;
          }
          .green{
            color: #2acaa1;
          }
          .red{
            color: #eb4b4b;
          }
          .blue{
            color: #0057e4;
          }
        }
        &:last-child{
          td{
            border-bottom: none;
          }
        }
      }
    }
  }
`;
interface IReactTable {
  columns: any;
  data: any[];
  onSort?: (sortBy: any) => void;
  renderRowSubComponent?: (row: any) => void;
  loading?: boolean;
  initialStateSort: any;
  getTrProps: (state: any) => void;
  isSelected?: any;
  onClick?: (originalData: any, e?: any) => void;
  checkSelectedKey?: string;
  onDoubleClick?: (originalData: any, e?: any) => void;
  gotoPage?: (originalData: any) => void;
  nextPage?: (originalData: any) => void;
  setPageSize?: any;
  state?: any;
  tablePageSize?: number;
  canPreviousPage?: any;
  canNextPage?: any;
  previousPage?: any;
  pageOptions?: any;
  pageCount?: any;
}
export const Table = ({
  columns: userColumns,
  data,
  renderRowSubComponent,
  loading,
  initialStateSort,
  getTrProps,
  isSelected,
  tablePageSize = 10,
  onClick,
  onSort,
  checkSelectedKey,
  onDoubleClick
}: // onDoubleClick
IReactTable) => {
  // eslint-disable-next-line
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy, pageIndex, pageSize },
    gotoPage,
    pageCount,
    page
  } = useTable(
    {
      columns: userColumns,
      data,
      loading,
      disableSortRemove: true,
      initialState: {
        sortBy: initialStateSort,
        pageIndex: 0,
        pageSize: tablePageSize
      },
      manualSorting: true,
      isSelected,
      checkSelectedKey,
      autoResetPage: false,
      autoResetSortBy: false
    },
    useSortBy,
    useExpanded,
    getTrProps,
    usePagination
  );
  const searchedValue = useSelector(selectors.getFilterValue);

  useEffect(() => {
    if (onSort) {
      onSort(sortBy);
    }
  }, [onSort, sortBy]);
  const onPagechange = (currentPage: any) => {
    gotoPage(currentPage.selected);
  };

  useEffect(() => {
    if (isSelected && checkSelectedKey) {
      const array = chunkArrayInGroups(rows, 10);
      array.map((arr, index) => {
        const find = arr.find(
          (val: any) => val.original[checkSelectedKey] === isSelected
        );
        if (find) gotoPage(index);
        return arr;
      });
    }
  }, [isSelected, checkSelectedKey, rows, pageCount]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (searchedValue && searchedValue.length > 0) {
      gotoPage(0);
    }
  }, [searchedValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className='table-responsive'>
        <ScrollBar className='table-scrollbar'>
          <CustomTable
            {...getTableProps()}
            width='100%'
            cellSpacing='0'
            cellPadding='0'
          >
            <thead>
              {headerGroups.map((headerGroup: any, index: number) => (
                <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any, i: number) => (
                    <th
                      key={i}
                      width={column.width}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      title={column?.toolTip || ""}
                    >
                      {column.render("Header")}
                      <span className='sort-icon ml-1'>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <img
                              src={upSortingArrow}
                              alt={upSortingArrow}
                              width='18'
                            />
                          ) : (
                            <img
                              src={downSortingArrow}
                              alt={downSortingArrow}
                              width='18'
                            />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row: any, i: number) => {
                prepareRow(row);
                return (
                  <React.Fragment key={i}>
                    <tr
                      {...getTrProps(row.getRowProps(row))}
                      {...row.getRowProps()}
                      onDoubleClick={(e) =>
                        onDoubleClick && onDoubleClick(row.original, e)
                      }
                      onClick={(e: any) => onClick && onClick(row.original, e)}
                      className={classnames({
                        "clicked-tr":
                          checkSelectedKey &&
                          row.original[`${checkSelectedKey}`] === isSelected
                      })}
                    >
                      {row.cells.map((cell: any, i: number) => {
                        return (
                          <td
                            key={i}
                            {...cell.getCellProps({
                              className: cell.column.className
                            })}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                    {row.isExpanded
                      ? renderRowSubComponent && renderRowSubComponent({ row })
                      : null}
                  </React.Fragment>
                );
              })}
            </tbody>
          </CustomTable>
        </ScrollBar>
        {loading && <LoadingSpinner withCoverBg position='center' />}
        {pageCount > 1 && (
          <Pagination
            totalCount={data.length}
            pageIndex={pageIndex}
            pageSize={pageSize}
            pageChange={onPagechange}
            pageCount={pageCount}
          />
        )}
      </div>
    </>
  );
};

export default Table;
const ScrollBar = styled(PerfectScrollbar)`
  height: calc(100vh - 405px) !important;
  padding-left: 15px;
  padding-right: 15px;
  &.table-scrollbar {
    table {
      thead {
        tr {
          th {
            position: sticky;
            top: -1px;
            z-index: 1;
            background: #f6f9fc;
          }
        }
      }
    }
  }
`;
