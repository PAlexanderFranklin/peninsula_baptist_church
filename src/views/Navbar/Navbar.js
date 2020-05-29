import React from 'react';
import './Navbar.css';
import Tab from './Tab/Tab'

function Navbar() {
  return (
    <header>
      <nav className="navbar">
        <ul>
          <Tab link="/">Peninsula Baptist Church</Tab>
          <Tab link="/gallery">Gallery</Tab>
          <Tab link="/visit">Visit</Tab>
          <Tab link="/events">Events</Tab>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
