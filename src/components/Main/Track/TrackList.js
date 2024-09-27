import React, { useState } from 'react';
import { Button, Alert, Badge } from 'react-bootstrap';
import "./TrackList.css"

export default function TrackList({ tracks, authToken }) {

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
          console.log(data)
          console.log(data.error.status)
        }
        )
      } catch {
    }

    if (addStatus === 400) {
      setAlertType("danger");
      setAlertMessage(`Song not added - check access token`)
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
      <Alert variant={`${alertType}`} show={alert} style={{ position: "fixed", width: "100%", height: "auto", tom: "10px", zIndex: 9999 }}>{alertMessage}</Alert>

      {tracks.map((track, i) => (
        <div key={`track-item${i}`} className="track-item">
          <img key={`track-image${i}`} className="track-image" alt="track-album" src={track.album.images[0].url} />
          <div key={`track-details${i}`} className="track-details">
            <p key={`track-title${i}`} className="track-title" >{track.name}</p>
            <p key={`track-artist${i}`} className="track-artist">{track.artists.map(artist => <Badge key={`track-badge${artist.name}`} bg="success">{artist.name}</Badge>)}</p>
          </div>
          <Button key={`addButton${i}`} variant="outline-success" onClick={() => addToQueue(track)}>
            +
          </Button>
        </div>
      ))}
    </>
  );
};