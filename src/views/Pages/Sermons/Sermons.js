import React, { useContext, useEffect, useState } from 'react';
import initSqlJs from 'sql.js';

// Required to let webpack 4 know it needs to copy the wasm file to our assets
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";

import './Sermons.css';
import Row from "./Row";
import { SkynetContext } from '../../../state/SkynetContext';

function Sermons() {

  const client = useContext(SkynetContext);
  const [ dataBaseFile, setDataBaseFile ] = useState(null);
  const [ db, setDb ] = useState(null);
  const [ sermonData, setSermonData ] = useState(null);
  const [ errorState, setErrorState ] = useState(null);
  
  async function getDatabase() {
    try {
      const response = await client.getFileContent(
        "DABItAEH24V4F9d2NCFveNP800LEub-2N691gkymJm_fnw",
        { responseType: "arraybuffer" }
      );
      setDataBaseFile(response.data);
    } catch (error) {
      console.log(error);
      setErrorState("Failed to load Database.");
    }
  }

  useEffect(() => {
    getDatabase();
  }, [client]);
  
  async function initDB() {
    // sql.js needs to fetch its wasm file, so we cannot immediately instantiate the database
    // without any configuration, initSqlJs will fetch the wasm files directly from the same path as the js
    // see ../craco.config.js
    try {
      if (dataBaseFile) {
        const SQL = await initSqlJs({ locateFile: () => sqlWasm });
        setDb(new SQL.Database(new Uint8Array(dataBaseFile)));
      }
    } catch (err) {
      console.log(err);
      setErrorState("Failed to load Database.");
    }
  }

  useEffect(() => {
      initDB();
  }, [dataBaseFile]);

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
              WHERE
                skylink IS NOT NULL
              ORDER BY date DESC;
            `);
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
          setErrorState("Failed to load sermons.");
        }
      }
      runQuery();
  }, [db]);

  return (
    <div className="Sermons bubble">
      { sermonData ?
        sermonData.map(element => 
          <Row
            key={element.file_name}
            title={element.title}
            series={element.series}
            skylink={element.skylink}
            passage={element.book + " " + element.verse}
            speaker={element.speaker}
            date={element.date}/>
        )
        : <div>{errorState ?
          <div className="error_container">
            {errorState}
            <button onClick={getDatabase} className="retry_button">Retry</button>
          </div> :
            "Loading..."}
          </div>
      }
    </div>
  );
}

export default Sermons;
