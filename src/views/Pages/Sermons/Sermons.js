import React, { useContext, useEffect, useState } from 'react';
import initSqlJs from 'sql.js';

// Required to let webpack 4 know it needs to copy the wasm file to our assets
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";

import './Sermons.css';
import Row from "./Row";
// import { SkynetContext } from '../../../state/SkynetContext';

// metadatadb: https://siasky.net/DABchy1Q3tBUggIP9IF_7ha9vAfBZ1d2aYRxUnHSQg9QNA

function Sermons() {

  // const client = useContext(SkynetContext);
  const [ dataBaseFile, setDataBaseFile ] = useState(null);
  const [ db, setDb ] = useState(null);
  const [ sermonData, setSermonData ] = useState([]);

  // useEffect(() => {
  //   async function getDatabase() {
  //     try {
  //       const response = await client.getFileContent("DABchy1Q3tBUggIP9IF_7ha9vAfBZ1d2aYRxUnHSQg9QNA");
  //       console.log(response.data);
  //       setDataBaseFile(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getDatabase();
  // }, [client]);

  useEffect(() => {
    async function getDatabase() {
      try {
        const SQL = await initSqlJs({ locateFile: () => sqlWasm });
        const dataPromise = fetch("https://siasky.net/DABchy1Q3tBUggIP9IF_7ha9vAfBZ1d2aYRxUnHSQg9QNA").then(res => res.arrayBuffer());
        const buf = await Promise.resolve(dataPromise)
        setDb(new SQL.Database(new Uint8Array(buf)));
      } catch (error) {
        console.log(error);
      }
    }
    getDatabase();
  }, []);

  // useEffect(() => {
  //     async function initDB() {
  //       // sql.js needs to fetch its wasm file, so we cannot immediately instantiate the database
  //       // without any configuration, initSqlJs will fetch the wasm files directly from the same path as the js
  //       // see ../craco.config.js
  //       try {
  //         if (dataBaseFile) {
  //           const SQL = await initSqlJs({ locateFile: () => sqlWasm });
  //           setDb(new SQL.Database(dataBaseFile));
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //     initDB();
  // }, [dataBaseFile]);

  useEffect(() => {
      async function runQuery() {
        try {
          if (db) {
            const response = db.exec(`
              SELECT
                file_name,
                title,
                books.name AS book,
                verse,
                series.name AS series,
                speakers.name AS speaker,
                date,
                skylink,
                notes
              FROM
                audio
                LEFT JOIN books ON books.id = audio.book_id
                LEFT JOIN series ON series.id = audio.series_id
                LEFT JOIN speakers ON speakers.id = audio.speaker_id
            `);
            console.log(response);
            const columns = response[0].columns;
            const values = response[0].values;
            let rows = [];
            values.forEach(element => {
              let row = {};
              for (let i = 0; i < columns.length; i++) {
                row[columns[i]] = element[i];
              }
              rows.push(row);
            });
            setSermonData(rows);
          }
        } catch (err) {
          console.log(err);
        }
      }
      runQuery();
  }, [db]);

  // Example Data
  // useEffect(() => {
  //   let sampleSermonData = [];
  //   for (let i = 0; i < 50; i++) {
  //     sampleSermonData.push({
  //       file_name: "EM1005" + i,
  //       title: "test title",
  //       series: "this is a series title",
  //       url: "https://siasky.net/_A3BzfJhXm2aaPkE9mNQecOPxShKDUdoVHqurZ2ze-kjoA",
  //       book: "Galatians",
  //       verses: "5:13-18",
  //       speaker: "Ethan Hardy",
  //       date: (211005 + i) + ''
  //     })
  //     setSermonData(sampleSermonData);
  //   }
  // }, [setSermonData]);

  return (
    <div className="Sermons bubble">
      {sermonData.map(element => 
        <Row
          key={element.file_name}
          title={element.title}
          series={element.series}
          skylink={element.skylink}
          passage={element.book + " " + element.verse}
          speaker={element.speaker}
          date={element.date}/>
      )}
    </div>
  );
}

export default Sermons;
