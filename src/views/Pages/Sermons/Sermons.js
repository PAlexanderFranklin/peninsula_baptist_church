import React from 'react';
import './Sermons.css';
import Row from "./Row";

function Sermons(props) {

  let sermonData = [];
  for(let i = 0; i < 50; i++) {
    sermonData.push({
      file_name: "EM100521",
      title: "test title",
      series: "this is a series title",
      url: "https://siasky.net/_A3BzfJhXm2aaPkE9mNQecOPxShKDUdoVHqurZ2ze-kjoA",
      book: "Galatians",
      verses: "5:13-18",
      speaker: "Ethan Hardy",
      date: (211005 + i) + ''
    })
  }

  return (
    <div className="Sermons bubble">
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
    </div>
  );
}

export default Sermons;
