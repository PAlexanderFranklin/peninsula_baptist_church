import React from 'react';
import './Sermons.css';

function Sermons(props) {
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
          {/* {sermonData.map(element => 
            <Row
              key={element.file_name}
              title={element.title}
              series={element.series}
              url={element.url}
              book={element.book}
              verses={element.verses}
              speaker={element.speaker}
              date={element.date}/>
          )} */}
        </tbody>
      </table>
    </div>
  );
}

export default Sermons;
