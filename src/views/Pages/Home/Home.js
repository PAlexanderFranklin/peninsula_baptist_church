import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="Home bubble">
      <h2>Welcome to our church!</h2>
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
      <div>
        <h2>Service Times</h2>
        <p>
          Sunday Morning Service: 11:00 am <br />
          Sunday Bible Study: 9:45 am <br />
          Sunday Evening Service: 6:00 pm <br />
          Wednesday Evening Prayer Meeting: 7:00 pm <br />
        </p>
      </div>
      <div>
        <h2>Location</h2>
        <p>
          2653 N Lombard Street <br />
          Portland, Oregon 97217
        </p>
      </div>
      <div>
        <h2>Contact</h2>
        <p>
          Phone: 503-708-5678
        </p>
      </div>
    </div>
  );
}

export default Home;
