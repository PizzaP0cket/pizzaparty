import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./components/Main/Header/Search/Search.js";
import React, { useEffect, useState } from 'react';
import { Spinner, Dropdown, Button, Alert } from 'react-bootstrap';
import Header from "./components/Main/Header/Header.js";
import TrackList from "./components/Main/Track/TrackList.js";
// import Tutorial from "./components/Main/Track/Tutorial.js";

// CSS
import "./utils/css/App.css";
import "./utils/css/TrackList.css";
import "./utils/css/QRCODE.css";
import "./utils/css/Profile.css";
import "./utils/css/Header.css";
import "./utils/css/Search.css";
import "./utils/css/QueuedSongs.css";
import "./utils/css/CurrentlyPlaying.css";

export default function App() {
    const [accessToken, setAccessToken] = useState(""); //
    const [authToken, setAuthToken] = useState(''); //
    const [searchedTracks, setSearchedTracks] = useState([]); //
    const [isLoading, setLoading] = useState(false); //

    const [newRelease, setNewReleases] = useState([]);
    const [newReleasesLoading, setNewReleasesLoading] = useState(false);
    const [tracksInAlbum, setTracksInAlbum] = useState([]);
    const [top50, setTop50] = useState([]);

    const colourMind = [[255, 255, 255], [99, 160, 200], [230, 61, 55], [199, 113, 137], [30, 34, 57]];
    const [currentTime, setCurrentTime] = useState('');
    const [selectedValue, setSelectedValue] = useState('New Releases');

    const [alert, setAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");



    const fetchAccessToken = async () => {
        const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
        const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_API_KEY;

        try {
            await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
            })
                .then((result) => result.json())
                .then((data) => setAccessToken(data.access_token));
        } catch (error) {
            console.error("Error fetching access token", error);
        }
    };

    async function getNewReleases() {
        setNewReleasesLoading(true);

        try {
            const token = window.location.href.split('=')[1].split('&')[0];

            await fetch("https://api.spotify.com/v1/browse/new-releases", {
                method: "GET",
                headers: { "content-Type": "application/json", Authorization: `Bearer ${token}` }
            })
                .then((result) => result.json())
                .then((data) => setNewReleases(data.albums.items));
        } catch (error) {
            console.error("Error getting New Releases", error);
        } finally {
            setNewReleasesLoading(false);
        }
    };

    async function searchTracksInAlbum(albumID) {

        try {
            await fetch(`https://api.spotify.com/v1/albums/${albumID}/tracks`, {
                method: "GET",
                headers: { "content-Type": "application/json", Authorization: `Bearer ${accessToken}` }
            })
                .then((response) => response.json())
                .then((data) => { setTracksInAlbum(data.items); });
        } catch (error) {
            console.error('Error fetching tracks:', error);
        } finally {
            console.log(tracksInAlbum)
        }
    }

    async function searchTop50() {
        let playlist_id = `37i9dQZEVXbMDoHDwVN2tF`;

        try {
            await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
                method: "GET",
                headers: { "content-Type": "application/json", Authorization: `Bearer ${accessToken}` }
            })
                .then((response) => response.json())
                .then((data) => { setTop50(data.items); });
        } catch (error) {
            console.error('Error fetching tracks:', error);
        } finally {
            console.log(top50)
        }
    }


    async function addToQueue(trackID) {

        handleLoading(true);
        let status = null;
        let time = 2500;
    
          const response = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=` + trackID.uri, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` } })
          status = response.status;
          if (status === 200) {
            setAlertType('success')
            setAlertMessage(`${trackID.name} added to queue!`)
            time = 1500;
          } else if (status === 400) {
            setAlertType("danger");
            setAlertMessage(`Song not added - need to sign in`)
          } else if (status === 404) {
            setAlertType("warning")
            setAlertMessage(`Song not added - make sure device is playing music`)
          } else {
            setAlertType("danger")
            setAlertMessage(`Song not added`)
          }
    
          setAlert(true);
          setTimeout(() => {setAlert(false);}, time);
          setLoading(false);
    
      }



    const handleSearchedTracks = (data) => {
        setSearchedTracks(data);
    };

    const handleLoading = (data) => {
        setLoading(data);
    };

    const updateURLTime = () => {
        const now = new Date();
        const timeInMS = now.getTime();
        setCurrentTime(timeInMS);
    }

    function convertMsToMmSs(msString) {
        const ms = parseInt(msString, 10); // Convert string to an integer
        const totalSeconds = Math.floor(ms / 1000); // Convert ms to seconds
        const minutes = Math.floor(totalSeconds / 60); // Get minutes
        const seconds = totalSeconds % 60; // Get remaining seconds

        // Format minutes and seconds to always be two digits
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    useEffect(() => {
        var authToken = ''; //
        if (!window.location.href.split('=')[1]) {
        } else {
            authToken = window.location.href.split('=')[1].split('&')[0];
            setAuthToken(authToken);
            if (window.location.href.split('=3600')[1].length === 0) {
                updateURLTime();
                window.location.href += currentTime;
            }
        }
        fetchAccessToken(); //
        getNewReleases();
    }, [currentTime]);

    const handleSelect = (eventKey) => {
        setSelectedValue(eventKey);
    };


    if (newReleasesLoading) {
        return <Spinner className='loadingTrack' style={{ color: `rgb(${colourMind[2].toString()}` }} animation="border" />
    }

    return (
        <>

<Spinner className='queueLoading' hidden={!isLoading} style={{ color: `rgb(${colourMind[2].toString()}` }} animation="grow" />
<Alert className='alert' variant={alertType} show={alert} >{alertMessage}</Alert>

            <div style={{ background: `rgb(${colourMind[0].toString()}` }}>
                <Header authToken={authToken} color={colourMind} />
                <div className="menuStyle">
                    <Search accessToken={accessToken} onSendData={handleSearchedTracks} onLoading={handleLoading} color={colourMind} />
                    <TrackList tracks={searchedTracks} authToken={authToken} loading={isLoading} color={colourMind} />
                    {searchedTracks.length === 0 ? (
                        <>
                            <Dropdown onSelect={handleSelect}>
                                <Dropdown.Toggle style={{ background: "none", color: `rgb(${colourMind[4].toString()}`, border: "none", fontSize: "1.2em", marginBottom: "5px", marginLeft: "10px" }}>
                                    <b>{selectedValue}</b></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="New Releases">New Release</Dropdown.Item>
                                    <Dropdown.Item eventKey="Top 50" onClick={() => searchTop50()}>Top 50</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {selectedValue === "New Releases" ? (<>
                                {newRelease === undefined && newReleasesLoading ? (
                                    <Spinner className='loadingTrack' style={{ color: `rgb(${colourMind[2].toString()}` }} animation="border" />
                                ) : (
                                    <>
                                        <div className="scroll-container-right" >
                                            {newRelease.map((newRelease, i) => {
                                                const placeholderKeyPrefix = `Placeholder-${i}`;
                                                return newReleasesLoading ? null : (
                                                    <div key={placeholderKeyPrefix} className="scroll-item">
                                                        <button className="album-button" onClick={() => searchTracksInAlbum(newRelease.id)}>
                                                            <img alt={i} src={newRelease.images[0].url} className="album-artist" />
                                                            <p>
                                                                {newRelease.artists.map((artist, i) => (
                                                                    <span style={{ color: `rgb(${colourMind[4].toString()}` }} key={`track-badge-${artist.name}`} className="album-artist">
                                                                        {artist.name}{i < newRelease.artists.length - 1 && ', '}
                                                                    </span>))}
                                                            </p></button></div>)
                                            })}
                                        </div></>
                                )}
                                <div className="scroll-container">
                                    {tracksInAlbum.map((tracksInAlbum, i) => {
                                        const placeholderKeyPrefix = `Placeholder-${i}`;
                                        return newReleasesLoading ? null : (

                                            
                                            


                                            <div className="track-item">
                                            <div className="track-details">
                                                <p className="track-title">{tracksInAlbum.name}</p>
                                                <p className="track-artist">
                                                    <span>{convertMsToMmSs(tracksInAlbum.duration_ms)}</span>
                                                </p>
                                            </div>
                                            <Button onClick={() => addToQueue(tracksInAlbum)}>+</Button>
                                        </div>
                                        )
                                    })}
                                </div>
                            </>) : (<>
                                {top50.map((top50Tracks, i) => {
                                    return (<>

                                        <div className="track-item">
                                            <img className="track-image" alt="track-album" src={top50Tracks.track.album.images[0].url} />
                                            <div className="track-details">
                                                <p className="track-title">{top50Tracks.track.name}</p>
                                                <p className="track-artist">
                                                    {top50Tracks.track.artists.map((artist, i) =>
                                                        <span key={`track-badge-${artist.name}`}>{artist.name}{i < top50Tracks.track.artists.length - 1 && ', '}</span>
                                                    )}
                                                </p>
                                            </div>
                                            <Button onClick={() => addToQueue(top50Tracks.track)}>+</Button>
                                        </div>
                                    </>)
                                })}






                            </>)}

                        </>) : (<></>)}
                </div>

            </div>
        </>
    );
}

// <Tutorial color={colourMind} />
