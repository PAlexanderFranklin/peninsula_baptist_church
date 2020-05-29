import React from 'react';
import './Home.css';

function Home() {
  return (
    <div>
      <p>We are a Southern Baptist Church in Portland, Oregon.</p>
      <p>We meet each Sunday and Wednesday. Our services are traditional and family-friendly.</p>
      <p>Our Statement of Faith is
         the <a href="http://www.sbc.net/bfm2000/bfm2000.asp">Baptist Faith and Message.</a>
      </p>
      <p>Feel free to look at our service times and come visit us next Sunday!</p>
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
