import React from 'react';
import './Tab.css';
import {NavLink} from 'react-router-dom'

function Tab(props) {
  return (
    <li className={"Tab " + props.className}>
      <NavLink to={props.link} exact={props.exact}>{props.children}</NavLink>
    </li>
  );
}

export default Tab;
