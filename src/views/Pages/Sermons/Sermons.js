import React, { useContext, useEffect, useState } from 'react';
import initSqlJs from 'sql.js';

// Required to let webpack 4 know it needs to copy the wasm file to our assets
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";

import './Sermons.css';
import PageNumbers from "./PageNumbers";
import QueryFilterPanel from './QueryFilterPanel';
import Row from "./Row";
import { SkynetContext } from '../../../state/SkynetContext';

function Sermons() {

  const client = useContext(SkynetContext);
  const [ dataBaseFile, setDataBaseFile ] = useState(null);
  const [ db, setDb ] = useState(null);
  const [ sermonData, setSermonData ] = useState(null);
  const [ errorState, setErrorState ] = useState(null);
  const [ rowCount, setRowCount ] = useState(0);
  const [ queryFilter, setQueryFilter ] = useState('');
  const [ queryOptions, setQueryOptions ] = useState(
    {
      sort: `date DESC`,
      page: 1,
      rowsPerPage: 5,
    }
  );
  
  async function getDatabase() {
    try {
      const response = await client.getFileContent(
        "VABoLrf4IJzE1x3RDQ6gc2czpSpJ3t3ssKMabsI0w45Efg", // Database skylink
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
              ${queryFilter}
            ORDER BY ${queryOptions.sort}
            LIMIT ${queryOptions.rowsPerPage} OFFSET ${(queryOptions.page - 1) * queryOptions.rowsPerPage};
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
  }, [db, queryFilter, queryOptions]);

  useEffect(() => {
    async function getRowCount() {
      try {
        if (db) {
          const response = db.exec(`
            SELECT
              COUNT(skylink) AS row_count
            FROM
              audio
              LEFT JOIN books ON books.id = audio.book_id
              LEFT JOIN series ON series.id = audio.series_id
              LEFT JOIN speakers ON speakers.id = audio.speaker_id
            WHERE
              skylink IS NOT NULL
              ${queryFilter};
          `);
          setRowCount(response[0].values[0][0]);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getRowCount();
  }, [db, queryFilter]);

  return (
    <div className="Sermons bubble">
      { sermonData ?
        [
          <QueryFilterPanel
            key="FilterPanel"
            db={db}
            queryFilter={queryFilter}
            setQueryFilter={setQueryFilter}
            queryOptions={queryOptions}
            setQueryOptions={setQueryOptions}
          />,
          <PageNumbers
            key="PageNumbers1"
            rowCount={rowCount}
            queryOptions={queryOptions}
            setQueryOptions={setQueryOptions}
          />,
          sermonData.map(element => 
            <Row
              key={element.file_name}
              title={element.title}
              series={element.series}
              skylink={element.skylink}
              passage={element.book + " " + element.verse}
              speaker={element.speaker}
              date={element.date}/>
          ),
          <PageNumbers
          key="PageNumbers2"
            rowCount={rowCount}
            queryOptions={queryOptions}
            setQueryOptions={setQueryOptions}
          />
        ]
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
