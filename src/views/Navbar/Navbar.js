import React from 'react';
import './Navbar.css';
import Tab from './Tab/Tab'

function Navbar() {
  return (
    <header className="header">
      <nav className="Navbar">
        <ul>
          <Tab link="/" exact="true">Peninsula Baptist Church</Tab>
          <Tab link="/gallery">Gallery</Tab>
          <Tab link="/contact">Visit/Contact</Tab>
          <Tab link="/events">Events</Tab>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
