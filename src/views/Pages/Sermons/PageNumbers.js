import React from 'react';
import './PageNumbers.css';

function PageNumbers(props) {

  const { rowCount, queryOptions, setQueryOptions } = props;

  let pageCount = Math.ceil(rowCount / queryOptions.rowsPerPage);
  let pageButtons = [];

  for (let i = 1; i <= pageCount; i++) {
    let classNames = "page_button"
    if (i === queryOptions.page) {
      classNames = classNames + " active_page_button"
    }
    pageButtons.push(
    <button
      className={classNames}
      onClick={() => {setQueryOptions({...queryOptions, page: i})}}
    >
      {i}
    </button>)
  }

  return (
    <div className="PageNumbers">
      {pageButtons}
    </div>
  );
}

export default PageNumbers;
