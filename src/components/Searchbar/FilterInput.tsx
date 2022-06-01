import React from "react";
import { UIInput } from "@theme";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "modules/actions";
import * as selectors from "modules/selectors";
import { isEmpty } from "lodash";

interface IProps {
  placeholder: string;
}

export const Filter = ({ placeholder }: IProps) => {
  const dispatch = useDispatch();
  const searchedValue = useSelector(selectors.getFilterValue);

  return (
    <UIInput
      label=''
      placeholder={placeholder}
      type='text'
      name='search'
      value={searchedValue}
      inputInfoIcon={
        !isEmpty(searchedValue) ? "icon-ic-close-black" : "icon-ic-search"
      }
      onChange={(e) => dispatch(actions.filterTableData(e.target.value))}
      inputInfoIconClick={() =>
        !isEmpty(searchedValue) ? dispatch(actions.filterTableData("")) : {}
      }
      inputIconClickable={!isEmpty(searchedValue)}
      inputIconColor='#8a9fba'
    />
  );
};

export default Filter;
