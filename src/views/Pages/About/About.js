import React from 'react';
import './About.css';

function About(props) {
  return (
    <div className="About bubble">
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

export default About;
