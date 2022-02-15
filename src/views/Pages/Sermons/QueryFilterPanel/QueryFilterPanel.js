import React, { useEffect, useState } from 'react';
import FilterDropdown from './FilterDropdown';
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
  const [ typingTimeout, setTypingTimeout ] = useState(0);


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
    setQueryFilter(
      {
        ...queryFilter,
        $speaker: speaker,
        $book: book,
        $series: series,
        $search: search
      }
    );
  }, [speaker, book, series, search])

  function updateSearch(value) {
    if(typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(setTimeout(() => {setSearch(value)}, 1000))
  }

  return (
    <div className="QueryFilterPanel">
      <FilterDropdown setItem={setSpeaker} itemList={speakers}>
        Speaker
      </FilterDropdown>
      <FilterDropdown setItem={setBook} itemList={books}>
        Book
      </FilterDropdown>
      <FilterDropdown setItem={setSeries} itemList={seriesList}>
        Series
      </FilterDropdown>
      <div className='filter_option'>
        <label>Search</label>
        <input type="text" placeholder={search} onChange={e => updateSearch(e.target.value)}></input>
      </div>
    </div>
  );
}

export default QueryFilterPanel;
