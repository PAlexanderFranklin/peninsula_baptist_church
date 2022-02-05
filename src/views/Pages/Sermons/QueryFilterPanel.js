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

  // useEffect(() => {
  //   let tempFilter = "";
  //   if (speaker) {

  //   }
  // }, [speaker, book, series])

  return (
    <div className="QueryFilterPanel">
      Query Filter Panel
    </div>
  );
}

export default QueryFilterPanel;
