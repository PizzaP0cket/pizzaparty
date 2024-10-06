import React, { useState } from 'react';
import { Button, Alert, Placeholder, Spinner } from 'react-bootstrap';
import PlaceHolder from 'react-bootstrap/Placeholder';

export default function TrackList({ tracks, authToken, loading, color }) {

  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  //
  const handleLoading = (data) => {
    setLoading(data);
  };

  //
  async function addToQueue(trackID) {

    handleLoading(true);
    let addStatus;

    try {
      await fetch(`https://api.spotify.com/v1/me/player/queue?uri=` + trackID.uri, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` } })
        .then((result) => result.json())
        .then((data) => { addStatus = data.error.status })
    } catch {
    } finally {
      setLoading(false);
    }

    if (addStatus === 400) {
      setAlertType("danger");
      setAlertMessage(`Song not added - need to sign in`)
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1500);
    } else {
      setAlertType("success");
      setAlertMessage(`${trackID.name} has been added`);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1500);
    }
  }

  return (
    <>
      <Spinner className='queueLoading' hidden={!isLoading} style={{ color: `rgb(${color[2].toString()}` }} animation="grow" />
      <Alert className='alert' variant={alertType} show={alert} >{alertMessage}</Alert>
      {loading && tracks.length === 0 ? (<Spinner className='loadingTrack' style={{ color: `rgb(${color[2].toString()}` }} animation="border" />) : null}
      {tracks.map((track, i) => {
        const placeholderKeyPrefix = `Placeholder-${i}`;
        const trackKeyPrefix = `track-${i}`;
        return loading ? (
          <div key={placeholderKeyPrefix} className="track-item">
            <Button className="track-image" variant="dark" disabled>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            </Button>
            <div className="track-details">
              <Placeholder style={{ width: "100%" }} bg='dark'>Loading...</Placeholder>
              <p className="Placeholder-artist">
                <PlaceHolder bg="" style={{ background: `linear-gradient(to bottom right, rgb(${color[2].toString()}), rgb(${color[4].toString()}))` }}>Loading...</PlaceHolder>
              </p>
            </div>
          </div>
        ) : (
          <div key={trackKeyPrefix} className="track-item">
            <img className="track-image" alt="track-album" src={track.album.images[0].url} />
            <div className="track-details">
              <p className="track-title">{track.name}</p>
              <p className="track-artist">
                {track.artists.map((artist, i) =>
                  <span key={`track-badge-${artist.name}`}>{artist.name}{i < track.artists.length - 1 && ', '}</span>
                )}
              </p>
            </div>
            <Button className='addButton' style={{ backgroundColor: `rgb(${color[2].toString()})` }} onClick={() => addToQueue(track)}>+</Button>
          </div>
        );
      })}
    </>
  );
}