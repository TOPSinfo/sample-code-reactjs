import React from "react";
import ReactPaginate from "react-paginate";
import "./pagination.scss";

export const Pagination = ({
  pageCount,
  pageChange,
  totalCount,
  pageIndex,
  pageSize
}: any) => {
  return (
    <div className='page-bottom'>
      <ul className='showing'>
        <li>Showing</li>
        <li>
          <label>{pageSize * pageIndex + 1}</label>
        </li>
        <li>to</li>
        <li>
          <label>
            {pageSize * pageIndex + pageSize < totalCount
              ? pageSize * pageIndex + pageSize
              : totalCount}
          </label>
        </li>
        <li>of</li>
        <li>
          <label>{totalCount}</label>
        </li>
        <li>entries</li>
      </ul>
      <ReactPaginate
        previousLabel='Previous'
        nextLabel='Next'
        breakLabel='...'
        breakClassName='break-me'
        pageCount={pageCount}
        marginPagesDisplayed={5}
        pageRangeDisplayed={5}
        containerClassName='pagination'
        activeClassName='active'
        disabledClassName='disabled'
        forcePage={pageIndex}
        onPageChange={pageChange}
      />
    </div>
  );
};
export default Pagination;
