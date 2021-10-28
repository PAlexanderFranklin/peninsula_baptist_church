import React from 'react';
import './Sermons.css';
import Row from "./Row";

function Sermons(props) {

  let sermonData = [{
    file_name: "EM100521",
    title: "test title",
    series: "this is a series title",
    url: "https://siasky.net/_A3BzfJhXm2aaPkE9mNQecOPxShKDUdoVHqurZ2ze-kjoA",
    book: "Galatians",
    verses: "5:13-18",
    speaker: "Ethan Hardy",
    date: "211005"
  }];

  return (
    <div className="Sermons bubble">
      <table className="sermon_table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Series</th>
            <th>Audio</th>
            <th>Key Passage</th>
            <th>Speaker</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sermonData.map(element => 
            <Row
              key={element.file_name}
              title={element.title}
              series={element.series}
              url={element.url}
              passage={element.book + " " + element.verses}
              speaker={element.speaker}
              date={element.date}/>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Sermons;
