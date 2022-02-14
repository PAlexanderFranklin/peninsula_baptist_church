import React, { useEffect, useState } from 'react';
import './QueryFilterPanel.css';

function QueryFilterPanel(props) {

  const { db, queryFilter, setQueryFilter, queryOptions, setQueryOptions } = props;
  const [ speakers, setSpeakers ] = useState(null);
  const [ books, setBooks ] = useState(null);
  const [ seriesList, setSeriesList ] = useState(null);
  const [ speaker, setSpeaker ] = useState('%');
  const [ book, setBook ] = useState('%');
  const [ series, setSeries ] = useState('%');
  const [ search, setSearch ] = useState("");


  useEffect(() => {
    async function runQuery() {
      try {
        if (db) {
          const response = db.exec(`
            SELECT
              name
            FROM
              speakers
            WHERE id IN (
              SELECT DISTINCT speaker_id
              FROM
                audio
                LEFT JOIN books ON books.id = audio.book_id
                LEFT JOIN series ON series.id = audio.series_id
              WHERE
                skylink IS NOT NULL
                AND books.name LIKE ?
                AND series.name LIKE ?
            )
            ORDER BY name ASC;
          `, [book, series]);
          const values = response[0].values;
          let names = [];
          values.forEach(element => {
            names.push(element[0]);
          });
          setSpeakers(names);
        }
      } catch (err) {
        console.log(err);
      }
    }
    runQuery();
  }, [db, book, series]);

  useEffect(() => {
    async function runQuery() {
      try {
        if (db) {
          const response = db.exec(`
            SELECT
              name
            FROM
              books
            WHERE id IN (
              SELECT DISTINCT book_id
              FROM
                audio
                LEFT JOIN series ON series.id = audio.series_id
                LEFT JOIN speakers ON speakers.id = audio.speaker_id
              WHERE
                skylink IS NOT NULL
                AND series.name LIKE ?
                AND speakers.name LIKE ?
            )
            ORDER BY name ASC;
          `, [series, speaker]);
          const values = response[0].values;
          let names = [];
          values.forEach(element => {
            names.push(element[0]);
          });
          setBooks(names);
        }
      } catch (err) {
        console.log(err);
      }
    }
    runQuery();
  }, [db, series, speaker]);

  useEffect(() => {
    async function runQuery() {
      try {
        if (db) {
          const response = db.exec(`
            SELECT
              name
            FROM
              series
            WHERE id IN (
              SELECT DISTINCT series_id
              FROM
                audio
                LEFT JOIN books ON books.id = audio.book_id
                LEFT JOIN speakers ON speakers.id = audio.speaker_id
              WHERE
                skylink IS NOT NULL
                AND books.name LIKE ?
                AND speakers.name LIKE ?
            )
            ORDER BY name ASC;
          `, [book, speaker]);
          const values = response[0].values;
          let names = [];
          values.forEach(element => {
            names.push(element[0]);
          });
          setSeriesList(names);
        }
      } catch (err) {
        console.log(err);
      }
    }
    runQuery();
  }, [db, book, speaker]);

  useEffect(() => {
    setQueryFilter({...queryFilter, speaker: speaker, book: book, series: series});
  }, [speaker, book, series])

  return (
    <div className="QueryFilterPanel">
      <div className='filter_dropdown'>
        <label>Speaker</label>
        <select onChange={e => setSpeaker(e.target.value)}>
          <option value="%">Any</option>
          {speakers ? speakers.map(element => 
            <option key={element} value={element}>{element}</option>
          ) : ""}
        </select>
      </div>
      <div className='filter_dropdown'>
        <label>Book</label>
        <select onChange={e => setBook(e.target.value)}>
          <option value="%">Any</option>
          {books ? books.map(element => 
            <option key={element} value={element}>{element}</option>
          ) : ""}
        </select>
      </div>
      <div className='filter_dropdown'>
        <label>Series</label>
        <select onChange={e => setSeries(e.target.value)}>
          <option value="%">Any</option>
          {seriesList ? seriesList.map(element => 
            <option key={element} value={element}>{element}</option>
          ): ""}
        </select>
      </div>
      <div>
        <label>Search: </label>
        <input type="text" placeholder={search} onChange={e => setSearch(e.target.value)}></input>
        <button onClick={() => setQueryFilter({...queryFilter, search: search})}>search</button>
      </div>
    </div>
  );
}

export default QueryFilterPanel;
