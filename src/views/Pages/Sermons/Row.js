import React from 'react';
import './Row.css';

function Row(props) {
  const {title, series, url, passage, speaker, date} = props;
  return (
    <tr className="Row">
      <td>{title}</td>
      <td>{series}</td>
      <td>
        <audio controls preload="metadata" src={url}>Audio didn't load properly.</audio>
      </td>
      <td>{passage}</td>
      <td>{speaker}</td>
      <td>{date}</td>
    </tr>
  );
}

export default Row;
