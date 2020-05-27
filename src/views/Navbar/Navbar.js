import React from 'react';
import './Navbar.css';
import Tab from './Tab/Tab'

function Navbar() {
  return (
    <header className="navbar">
      <nav>
        <div>
          <a href="/">Peninsula Baptist Church</a>
        </div>
        <ul>
          <Tab />
          <Tab />
          <Tab />
          <Tab />
          <Tab />
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
