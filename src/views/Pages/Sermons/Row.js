import React from 'react';
import './Row.css';

function Row(props) {
  const {title, series, url, passage, speaker, date} = props;

  let str = date.toString();
  let displayDate = (str[2] + str[3] + '/'
    + str[4] + str[5] + '/'
    + str[0] + str[1]);

  return (
    <tr className="Row">
      <td>{title}</td>
      <td>{series}</td>
      <td>
        <audio controls preload="metadata" src={url}>Audio didn't load properly.</audio>
      </td>
      <td className="number">{passage}</td>
      <td>{speaker}</td>
      <td className="number">{displayDate}</td>
    </tr>
  );
}

export default Row;
