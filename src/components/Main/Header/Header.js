import React, { useEffect, useState } from 'react';
import { Offcanvas, Navbar } from "react-bootstrap";
import NavMenu from './NavMenu/NavMenu'
import Profile from './NavMenu/Profile';

export default function Header({ authToken, color }) {

    const [profileInfo, setProfile] = useState([]);
    const [queuedSongs, setQueuedSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [progress, setProgress] = useState(0);

    if (progress > 100) {
        getQueueSongs();
        getCurrentSong();
        setProgress(0);
    }

    //
    async function fetchProfile(authToken) {
        try {
            await fetch("https://api.spotify.com/v1/me", { method: "GET", headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}`, } })
                .then((result) => result.json())
                .then((data) => { setProfile(data) })
        } catch (error) {
            console.error("Failed to fetch profile", error)
        }
    }

    //
    async function getQueueSongs() {
        try {
            await fetch("https://api.spotify.com/v1/me/player/queue?limit=30", { method: "GET", headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` } })
                .then((result) => result.json())
                .then((data) => { setQueuedSongs(data.queue) })
        } catch (error) {
            console.error("Trouble getting queuedSongs", error);
        }
    }

    //
    async function getCurrentSong() {
        try {
            await fetch(
                "https://api.spotify.com/v1/me/player/currently-playing/", { method: "GET", headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` } })
                .then((result) => result.json())
                .then((data) => { setCurrentSong(data) })
        } catch (error) {
            console.error("No current song playing", error)
        }
    }

    useEffect(() => {
        if (authToken === '') { } else { fetchProfile(authToken) };

        //
        if (currentSong.item === undefined) {
        } else {
            if (!currentSong || !currentSong.item || currentSong.item.duration_ms === 0) {
                setProgress(0); // Reset progress if song is invalid
                return;
            }

            // Calculate the percentage of the song that has played
            const totalDuration = currentSong.item.duration_ms;
            const currentProgress = currentSong.progress_ms;
            const percentage = (currentProgress / totalDuration) * 100;

            setProgress(percentage);

            // Optional: Update progress every second
            const interval = setInterval(() => {
                setProgress((prevProgress) => {
                    const newProgress = Math.min(prevProgress + (1000 / totalDuration) * 100);
                    return newProgress;
                });
            }, 1000);
            return () => clearInterval(interval); // Cleanup on unmount
        }

    }, [authToken, currentSong]);

    return (
        <>
            <div className='main'>
                <Navbar expand="md-3" className='navBar'>
                    <Navbar.Toggle className="navBarToggle" onClick={() => { handleShow(); getQueueSongs(); getCurrentSong(); }} style={{ color: `rgb(${color[4].toString()})`}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" /></svg>
                    </Navbar.Toggle>
                    <p className="title" style={{ color: `rgb(${color[1].toString()})` }}>PizzaParty</p>
                </Navbar>
                <Profile profileInfo={profileInfo} color={color} />
            </div>
            <Offcanvas show={show} onHide={handleClose} style={{ background: "none", border: "none" }} >
                <NavMenu song={currentSong} profileInfo={profileInfo} queuedSongs={queuedSongs} color={color} />
            </Offcanvas>
        </>
    )
}