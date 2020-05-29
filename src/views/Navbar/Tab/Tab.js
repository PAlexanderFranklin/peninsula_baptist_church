import React from 'react';
import './Tab.css';
import {Link} from 'react-router-dom'

function Tab(props) {
  return (
    <li className="tab">
      <Link to={props.link}>{props.children}</Link>
    </li>
  );
}

export default Tab;
