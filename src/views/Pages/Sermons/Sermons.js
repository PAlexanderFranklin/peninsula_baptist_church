import React, { useEffect, useState } from 'react';
// useContext,
import './Sermons.css';
import Row from "./Row";
// import { SkynetContext } from '../../../state/SkynetContext';

// metadatadb: https://siasky.net/DABchy1Q3tBUggIP9IF_7ha9vAfBZ1d2aYRxUnHSQg9QNA

function Sermons() {

  // const client = useContext(SkynetContext);
  // const [ dataBase, setDataBase ] = useState();
  const [ sermonData, setSermonData ] = useState([]);

  // useEffect(() => {
  //   async function getDatabase() {
  //     try {
  //       const response = await client.getFileContent("DABchy1Q3tBUggIP9IF_7ha9vAfBZ1d2aYRxUnHSQg9QNA");
  //       console.log(response)
  //       setDataBase(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getDatabase();
  // }, [client]);

  // Example Data
  useEffect(() => {
    for (let i = 0; i < 50; i++) {
      let sampleSermonData = [];
      sampleSermonData.push({
        file_name: "EM100521",
        title: "test title",
        series: "this is a series title",
        url: "https://siasky.net/_A3BzfJhXm2aaPkE9mNQecOPxShKDUdoVHqurZ2ze-kjoA",
        book: "Galatians",
        verses: "5:13-18",
        speaker: "Ethan Hardy",
        date: (211005 + i) + ''
      })
      setSermonData(sampleSermonData);
    }
  }, [setSermonData]);

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
