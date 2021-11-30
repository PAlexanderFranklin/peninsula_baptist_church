import React, { useContext, useEffect, useState } from 'react';
import './Row.css';
import { SkynetContext } from '../../../state/SkynetContext';

function Row(props) {

  const {title, series, skylink, passage, speaker, date} = props;
  const client = useContext(SkynetContext);

  const [ audioURL, setAudioURL ] = useState(null);

  useEffect(() => {
    async function getAudio() {
      try {
        setAudioURL(await client.getSkylinkUrl(skylink));
      } catch (error) {
        console.log(error);
      }
    }
    getAudio();
  }, [skylink])

  let str = date.toString();
  let displayDate = (str[4] + str[5] + '/'
    + str[6] + str[7] + '/'
    + str[2] + str[3]);

  return (
    <div className="Row">
      <div className="id_data">
        <h4>{title}</h4>
        <p>{series}</p>
        <p className="number">{passage}</p>
      </div>
      <div>
        <audio controls preload="metadata" src={audioURL}>Audio didn't load properly.</audio>
      </div>
      <div className="speaker">
        {speaker}
        <p className="number">{displayDate}</p>
      </div>
    </div>
  );
}

export default Row;
