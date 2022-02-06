import React, { useEffect, useState } from 'react';
import './QueryFilterPanel.css';

function QueryFilterPanel(props) {

  const { db, queryFilter, setQueryFilter, queryOptions, setQueryOptions } = props;
  const [ speakers, setSpeakers ] = useState(null);
  const [ books, setBooks ] = useState(null);
  const [ seriesList, setSeriesList ] = useState(null);
  const [ speaker, setSpeaker ] = useState(null);
  const [ book, setBook ] = useState(null);
  const [ series, setSeries ] = useState(null);

  useEffect(() => {
    async function runQuery() {
      try {
        if (db) {
          const response = db.exec(`
            SELECT
              name
            FROM
              speakers
            ORDER BY name ASC;
          `);
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
  }, [db]);

  useEffect(() => {
    async function runQuery() {
      try {
        if (db) {
          const response = db.exec(`
            SELECT
              name
            FROM
              books
            ORDER BY name ASC;
          `);
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
  }, [db]);

  useEffect(() => {
    async function runQuery() {
      try {
        if (db) {
          const response = db.exec(`
            SELECT
              name
            FROM
              series
            ORDER BY name ASC;
          `);
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
  }, [db]);

  useEffect(() => {
    let tempFilter = "";
    if (speaker) {
      tempFilter = tempFilter + " AND speakers.name = '" + speaker + "'";
    }
    if (book) {
      tempFilter = tempFilter + " AND books.name = '" + book + "'";
    }
    if (series) {
      tempFilter = tempFilter + " AND series.name = '" + series + "'";
    }
    setQueryFilter(tempFilter);
  }, [speaker, book, series])

  return (
    <div className="QueryFilterPanel">
      <label>Speaker</label>
      <select onChange={e => setSpeaker(e.target.value)}>
        <option value="">Any</option>
        {speakers ? speakers.map(element => 
          <option key={element} value={element}>{element}</option>
        ) : ""}
      </select>
      <label>Book</label>
      <select onChange={e => setBook(e.target.value)}>
        <option value="">Any</option>
        {books ? books.map(element => 
          <option value={element}>{element}</option>
        ) : ""}
      </select>
      <label>Series</label>
      <select onChange={e => setSeries(e.target.value)}>
        <option value="">Any</option>
        {seriesList ? seriesList.map(element => 
          <option value={element}>{element}</option>
        ): ""}
      </select>
    </div>
  );
}

export default QueryFilterPanel;
