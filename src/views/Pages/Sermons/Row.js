import React, { useContext, useEffect, useState } from 'react';
import './Row.css';
import { SkynetContext } from '../../../state/SkynetContext';

function Row(props) {

  const {title, series, skylink, passage, speaker, date} = props;
  const client = useContext(SkynetContext);
  const [ fetchError, setFetchError ] = useState(null);

  const [ audioURL, setAudioURL ] = useState(null);

  async function getAudio() {
    try {
      setAudioURL(await client.getSkylinkUrl(skylink));
      setFetchError(null);
    } catch (error) {
      console.log(error);
      setFetchError("Failed to load sermon.");
    }
  }

  useEffect(() => {
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
      <div className="audio_container">
        { fetchError ? 
         <div>{fetchError} <button onClick={getAudio} className="retry_button">Retry</button></div> :
          <audio controls preload="metadata" src={audioURL}>Audio didn't load properly.</audio>
        }
      </div>
      <div className="speaker">
        {speaker}
        <p className="number">{displayDate}</p>
      </div>
    </div>
  );
}

export default Row;
