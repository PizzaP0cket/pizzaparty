import React, { useEffect, useState } from 'react';
import {
    Offcanvas,
    Image,
    Navbar,
    Badge
} from "react-bootstrap";
import Authentication from "/Users/pizzapocket/Documents/pizzaparty/src/utils/auth.js"
import './Header.css';

function Header() {


    const [login, setLoggedIn] = useState(false);
    const [profileInfo, setProfile] = useState([]);
    const [authToken, setAuthToken] = useState('');

    const [queuedSongs, setQueuedSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

        var authToken = '';
        if (!window.location.href.split('=')[1]) {
            console.error("Access token not found in URL");
        } else {
            authToken = window.location.href.split('=')[1].split('&')[0];
            setAuthToken(authToken);
        }

        const fetchProfile = async () => {
            const profileParameters = {
                method: "GET",
                headers: {
                    "Content-Type": "applicaiton/json",
                    Authorization: `Bearer ${authToken}`,
                },
            };

            try {
                const response = await fetch(
                    `https://api.spotify.com/v1/me`, profileParameters
                );

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setProfile(data);
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };

        fetchProfile();
    }, []);

    async function getQueueSongs() {
        await fetch(
            "https://api.spotify.com/v1/me/player/queue", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ` + authToken,
            }
        }
        )
            .then((result) => result.json())
            .then((data) => {
                setQueuedSongs(data.queue);
                setCurrentSong(data.currently_playing);
            });
    }

    const handleLogin = () => {
        setLoggedIn(true); // This will trigger Authentication redirection
    };

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

   
return (
    <>
        <Navbar expand="md-3">
            <Navbar.Toggle onClick={() => { handleShow(); getQueueSongs() }} />
        </Navbar>

        <Offcanvas show={show} onHide={handleClose}>

            <div className="profile-container">
                <header className="profile-header">
                    {profileInfo.images && profileInfo.images.length > 0 ? (<Image key={`Image${0}`} src={profileInfo.images[1].url} alt="Profile" className="profile-avatar" />) : (<img src="https://via.placeholder.com/150" alt="Profile" className="profile-avatar" />)}
                    <div className="profile-info">
                        <h2 className="profile-name">{!profileInfo.display_name ? ('Please Sign in') : (profileInfo.display_name)}</h2>
                        {!login ? (<button onClick={handleLogin}>Sign in</button>) : (<Authentication />)}
                    </div>
                    <Offcanvas.Header closeButton>
                    </Offcanvas.Header>
                </header>
            </div>


            <Offcanvas.Body>

                <div className='currentlyPlaying'>

                    {currentSong && typeof currentSong === 'object' ? (

                        <div className="currentlyPlaying-item">

                            {currentSong.album === undefined ? (<p>No profile images found.</p>) : (<Image key={`Image${0}`} className="rotate" src={currentSong.album.images[0].url} roundedCircle />)}

                            <div className="currentPlaying-details">
                                <div className="soundwave">
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>

                                </div>
                                <p className="currentPlaying-title" >{currentSong.name}</p>
                                {currentSong.artists === undefined ? (<p></p>) : (<p className="currentPlaying-artist">{currentSong.artists.map(artist => <Badge key={`playlist-${artist.name}`} bg='success'>{artist.name}</Badge>)}</p>)}
                            </div>

                        </div>


                    ) : (
                        <p>No Song Data</p>
                    )}

                </div>


                {Array.isArray(queuedSongs) ? (
                    queuedSongs.filter((song, i, arr) => i === 0 || song.name !== arr[i - 1].name).map((songs, i) => {
                        return (
                            <section className="playlist-section" key={`QueueSongInfo${i}`}>

                                <div className="playlist-item">
                                    <img src={songs.album.images[0].url} alt="Playlist" className="playlist-image" />
                                    <div className="playlist-details">
                                        <p className="playlist-title">{songs.name}</p>
                                        <p className="playlist-artist">{songs.artists.map(artist => <Badge key={`playlist-${artist.name}`} bg="success">{artist.name}</Badge>)}</p>
                                    </div>
                                    <p className="playlist-duration">{convertMsToMmSs(songs.duration_ms)}</p>
                                </div>
                            </section>

                        );
                    })

                ) : (
                    <p>No songs queued</p>
                )}

            </Offcanvas.Body>
        </Offcanvas>
    </>
)
}

export default Header
