import React, { useState } from 'react';
import { Button, Alert, Placeholder, Spinner } from 'react-bootstrap';
import PlaceHolder from 'react-bootstrap/Placeholder';
import "./TrackList.css"

export default function TrackList({ tracks, authToken, loading, color }) {

  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  async function addToQueue(trackID) {

    var queueParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authToken,
      },
    };

    let addStatus;
    try {
      await fetch(
        `https://api.spotify.com/v1/me/player/queue?uri=` + trackID.uri,
        queueParameters
      ).then((result) => result.json())
        .then((data) => {
          addStatus = data.error.status
        })
    } catch {
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
      <Alert variant={alertType} show={alert} style={{ position: "fixed", width: "100%", height: "auto", top: "10px", zIndex: 9999 }}>{alertMessage}</Alert>
      {loading && tracks.length === 0 ? (<Spinner style={{ display: "block", margin: "auto", color: `rgb(${color[2].toString()}` }} animation="border" />) : null}

      {tracks.map((track, i) => {
        const placeholderKeyPrefix = `Placeholder-${i}`;
        const trackKeyPrefix = `track-${i}`;

        return loading ? (
          <div key={placeholderKeyPrefix} className="track-item">
            <Button className="track-image" alt="track-album" variant="dark" disabled>
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
              <Button style={{ background: `linear-gradient(to bottom right, rgb(${color[2].toString()}), rgb(${color[4].toString()}))`, borderColor: `rgb(${color[2].toString()})` }} onClick={() => addToQueue(track)}>+</Button>
            </div>
        );
      })}
    </>
  );
}


// style={{marginRight:"3%"}}