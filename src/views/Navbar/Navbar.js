import React from 'react';
import './Navbar.css';
import Tab from './Tab/Tab'

function Navbar() {
  return (
    <header className="header">
      <nav className="Navbar">
        <ul>
          <Tab link="/" exact={true} className="home_name">Peninsula Baptist Church</Tab>
          <div className="nav_items">
            {/* <Tab link="/sermons">Sermons</Tab> */}
            <li className="Tab">
              <a href="http://www.sbc.net/bfm2000/bfm2000.asp" target="_blank">Statement Of Faith</a>
            </li>
            {/* <Tab link="/visit">Visit</Tab>
            <Tab link="/events">Events</Tab> */}
            <Tab link="/statement-on-vaccines">Vaccine Statement</Tab>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
