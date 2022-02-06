import React, { useEffect, useState } from 'react';
import './QueryFilterPanel.css';

function QueryFilterPanel(props) {

  const { db, queryFilter, setQueryFilter, queryOptions, setQueryOptions } = props;
  const [ speakers, setSpeakers ] = useState([]);
  const [ books, setBooks ] = useState([]);
  const [ seriesList, setSeriesList ] = useState([]);
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
      <select>
        {speakers.map((element) => {
          <option value={element}>element</option>
        })}
      </select>
      <label>Book</label>
      <select>
        {books.map((element) => {
          <option value={element}>element</option>
        })}
      </select>
      <label>Series</label>
      <select>
        {seriesList.map((element) => {
          <option value={element}>element</option>
        })}
      </select>
    </div>
  );
}

export default QueryFilterPanel;
