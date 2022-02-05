import React, { useEffect, useState } from 'react';
import './PageNumbers.css';

function PageNumbers(props) {

  const { rowCount, queryOptions, setQueryOptions } = props;
  const [ pageButtons, setPageButtons ] = useState([]);

  useEffect(() => {
    let pageCount = Math.ceil(rowCount / queryOptions.rowsPerPage);
    let buttonArray = [];

    for (let i = 1; i <= pageCount; i++) {
      let classNames = "page_button"
      if (i === queryOptions.page) {
        classNames = classNames + " active_page_button"
      }
      buttonArray.push(
      <button
        key={"button" + i}
        className={classNames}
        onClick={() => {setQueryOptions({...queryOptions, page: i})}}
      >
        {i}
      </button>)
    }
    setPageButtons(buttonArray);
  }, [rowCount, queryOptions])

  return (
    <div className="PageNumbers">
      {pageButtons}
    </div>
  );
}

export default PageNumbers;
