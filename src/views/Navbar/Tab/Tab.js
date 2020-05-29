import React from 'react';
import './Tab.css';
import {NavLink} from 'react-router-dom'

function Tab(props) {
  return (
    <li className="tab">
      <NavLink to={props.link} exact>{props.children}</NavLink>
    </li>
  );
}

export default Tab;
