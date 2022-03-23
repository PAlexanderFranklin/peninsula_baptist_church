import React from 'react';
import './Home.css';
import {NavLink} from 'react-router-dom'

function Home() {
  return (
    <div className="Home bubble">
      <h2>Welcome to our church!</h2>
      <p>We are a Southern Baptist Church in Portland, Oregon.</p>
      <p>We meet each Sunday and Wednesday. Our services are traditional and family-friendly.</p>
      <p>
        Feel free to look at our <NavLink to="/about">service times</NavLink> and
        come visit us next Sunday!
      </p>
      <p>
        Find us on:
        <br/>
        <a title="Peninsula Baptist Facebook Page"
        href="https://www.facebook.com/pages/Peninsula-Baptist-Church/144712978884612">
          Facebook
        </a>
        <br/>
        <a title="Peninsula Baptist Blog" href="http://peninsulabaptist.blogspot.com/">Blogger</a>
      </p>
    </div>
  );
}

export default Home;
