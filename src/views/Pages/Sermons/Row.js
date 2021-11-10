import React from 'react';
import './Row.css';

function Row(props) {
  const {title, series, url, passage, speaker, date} = props;

  let str = date.toString();
  let displayDate = (str[2] + str[3] + '/'
    + str[4] + str[5] + '/'
    + str[0] + str[1]);

  return (
    <div className="Row">
      <div>
        <h4>{title}</h4>
        <p>{series}</p>
        <p className="number">{passage}</p>
      </div>
      <div>
        <audio controls preload="metadata" src={url}>Audio didn't load properly.</audio>
      </div>
      <div>
        {speaker}
        <p className="number">{displayDate}</p>
      </div>
    </div>
  );
}

export default Row;
