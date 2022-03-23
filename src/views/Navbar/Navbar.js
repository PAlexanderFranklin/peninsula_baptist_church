import React, { useState } from 'react';
import './Navbar.css';
import Tab from './Tab/Tab';
// import { GiHamburgerMenu } from 'react-icons/gi';
import { HiHome } from 'react-icons/hi';

function Navbar() {

  const [ menuClass, setMenuClass ] = useState(" hidden");

  return (
    <header className="header">
      <nav className="Navbar">
        <ul>
          <Tab link="/" exact={true} className="home_name">
            <HiHome /> <div className="home_text">Peninsula Baptist Church</div>
          </Tab>
          {/* <button className='hamburger_button' onClick={() => {if (menuClass) {setMenuClass("")} else {setMenuClass(" hidden")}}}>
            <GiHamburgerMenu className='hamburger' />
          </button> */}
          <div className={"nav_items" + menuClass}>
            <Tab link="/about">About</Tab>
            <Tab link="/sermons">Sermons</Tab>
            <li className="Tab">
              <a href="http://www.sbc.net/bfm2000/bfm2000.asp" target="_blank">Statement Of Faith</a>
            </li>
            <Tab link="/statement-on-vaccines">Vaccine Statement</Tab>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
