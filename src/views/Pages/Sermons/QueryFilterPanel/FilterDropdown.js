import React from 'react';
import './FilterDropdown.css';

function FilterDropdown(props) {

  const { children, itemList, setItem } = props;

  return (
    <div className='FilterDropdown filter_option'>
      <label>{children}</label>
      <select onChange={e => setItem(e.target.value)}>
        <option value="%">Any</option>
        {itemList ? itemList.map(element => 
          <option key={element} value={element}>{element}</option>
        ) : ""}
      </select>
    </div>
  );
}

export default FilterDropdown;
