import React, { useContext, useEffect, useState } from 'react';
import initSqlJs from 'sql.js';

// Required to let webpack 4 know it needs to copy the wasm file to our assets
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";

import './Sermons.css';
import PageNumbers from "./Table/PageNumbers";
import QueryFilterPanel from './QueryFilterPanel/QueryFilterPanel';
import Row from "./Table/Row";

function Sermons() {

  const [ dataBaseFile, setDataBaseFile ] = useState(null);
  const [ db, setDb ] = useState(null);
  const [ sermonData, setSermonData ] = useState(null);
  const [ errorState, setErrorState ] = useState(null);
  const [ rowCount, setRowCount ] = useState(0);
  const [ queryFilter, setQueryFilter ] = useState(
    {
      $book: '%',
      $series: '%',
      $speaker: '%',
      $search: ""
    }
  );
  const [ queryOptions, setQueryOptions ] = useState(
    {
      sort: `date DESC`,
      page: 1,
      rowsPerPage: 10,
    }
  );
  
  async function getDatabase() {
    try {
      setErrorState(null);
      const response = await fetch("https://peninsula-baptist-sermon-audio.s3.us-west-2.amazonaws.com/MetaData.db");
      const reader = response.body.getReader();
      const {done, value} = await reader.read();
      setDataBaseFile(value);
    } catch (error) {
      console.log(error);
      setErrorState("Failed to load Database.");
    }
  }

  useEffect(() => {
    getDatabase();
  }, []);
  
  async function initDB() {
    // sql.js needs to fetch its wasm file, so we cannot immediately instantiate the database
    // without any configuration, initSqlJs will fetch the wasm files directly from the same path as the js
    // see ../craco.config.js
    try {
      if (dataBaseFile) {
        const SQL = await initSqlJs({ locateFile: () => sqlWasm });
        setDb(new SQL.Database(dataBaseFile));
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
              notes
            FROM
              audio
              LEFT JOIN books ON books.id = audio.book_id
              LEFT JOIN series ON series.id = audio.series_id
              LEFT JOIN speakers ON speakers.id = audio.speaker_id
            WHERE
              book LIKE $book
              AND series LIKE $series
              AND speaker LIKE $speaker
              AND (series LIKE '%' || $search || '%'
              OR book || ' ' || verse LIKE '%' || $search || '%'
              OR speaker LIKE '%' || $search || '%'
              OR title LIKE '%' || $search || '%')
            ORDER BY ${queryOptions.sort}
            LIMIT ${queryOptions.rowsPerPage} OFFSET ${(queryOptions.page - 1) * queryOptions.rowsPerPage};
          `, queryFilter);
          if (response[0]) {
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
          else {
            setSermonData([]);
          }
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
              COUNT(file_name) AS row_count
            FROM
              audio
              LEFT JOIN books ON books.id = audio.book_id
              LEFT JOIN series ON series.id = audio.series_id
              LEFT JOIN speakers ON speakers.id = audio.speaker_id
            WHERE
              books.name LIKE $book
              AND series.name LIKE $series
              AND speakers.name LIKE $speaker
              AND (series.name LIKE '%' || $search || '%'
              OR books.name || ' ' || verse LIKE '%' || $search || '%'
              OR speakers.name LIKE '%' || $search || '%'
              OR title LIKE '%' || $search || '%');
          `, queryFilter);
          if (response[0].values) {
            setRowCount(response[0].values[0][0]);
          }
          else {
            setRowCount(0);
          }
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
          sermonData[0] ?
          sermonData.map(element => 
            <Row
              key={element.file_name}
              fileName={element.file_name}
              title={element.title}
              series={element.series}
              passage={element.book + " " + element.verse}
              speaker={element.speaker}
              date={element.date}/>
          )
          : "No results match that search.",
          <PageNumbers
          key="PageNumbers2"
            rowCount={rowCount}
            queryOptions={queryOptions}
            setQueryOptions={setQueryOptions}
          />
        ]
        : <div>
            {errorState ?
              <div className="status_container">
                {errorState}
                <button
                  onClick={getDatabase}
                  className="retry_button"
                >
                  Retry
                </button>
              </div>
            :
              <div className="status_container">
                Loading...
              </div>
            }
          </div>
      }
    </div>
  );
}

export default Sermons;
