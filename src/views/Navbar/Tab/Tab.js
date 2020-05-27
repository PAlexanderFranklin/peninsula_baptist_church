import React from 'react';
import './Tab.css';

function Tab(props) {
  return (
    <li className="tab">
      <a href={props.link}>{props.children}</a>
    </li>
  );
}

export default Tab;
