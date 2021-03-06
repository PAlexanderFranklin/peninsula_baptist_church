import React from 'react';
import './Navbar.css';
import Tab from './Tab/Tab'

function Navbar() {
  return (
    <header className="header">
      <nav className="Navbar">
        <ul>
          <Tab link="/" exact="true" className="home_name">Peninsula Baptist Church</Tab>
          {/* <div className="nav_items">
            <Tab link="/gallery">Gallery</Tab>
            <Tab link="/visit">Visit</Tab>
            <Tab link="/events">Events</Tab>
          </div> */}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
