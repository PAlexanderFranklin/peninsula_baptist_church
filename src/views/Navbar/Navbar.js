import React from 'react';
import './Navbar.css';
import Tab from './Tab/Tab'

function Navbar() {
  return (
    <header className="navbar">
      <nav>
        <ul>
          <Tab link="/">Peninsula Baptist Church</Tab>
          <Tab link="/gallery">Gallery</Tab>
          <Tab link="/service-times">Service Times</Tab>
          <Tab link="/location">Location</Tab>
          <Tab link="/events">Events</Tab>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
