import React from 'react';
import './QueryFilterPanel.css';

function QueryFilterPanel(props) {

  const { queryFilter, setQueryFilter, queryOptions, setQueryOptions } = props;

  return (
    <div className="QueryFilterPanel">
      Query Filter Panel
    </div>
  );
}

export default QueryFilterPanel;
