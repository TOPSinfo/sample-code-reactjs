import React, { Fragment } from "react";
import Select from "react-select";

interface IProps {
  options?: any[];
  onSearched?: (selected: any) => void;
  value?: any;
}
export const SearchBar = (props: IProps) => {
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      border: "0",
      boxShadow: "none"
    }),
    container: (provided: any) => ({
      ...provided,
      flex: "1"
    })
  };
  return (
    <Fragment>
      <Select
        className='basic-single'
        classNamePrefix='select'
        name='color'
        options={props.options}
        placeholder='Search By Name'
        styles={customStyles}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null
        }}
        onChange={props.onSearched}
        isClearable
        value={props.value}
      />
    </Fragment>
  );
};

export default SearchBar;
