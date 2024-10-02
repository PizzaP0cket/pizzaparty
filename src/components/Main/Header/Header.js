import React, { useEffect, useState } from 'react';
import { Offcanvas, Navbar } from "react-bootstrap";
import NavMenu from './NavMenu/NavMenu'
import './Header.css';
import Profile from './NavMenu/Profile';

export default function Header({ authToken, color }) {

    const [profileInfo, setProfile] = useState([]);
    const [queuedSongs, setQueuedSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [progress, setProgress] = useState(0);


    useEffect(() => {
        if (authToken === '') {
        } else {
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
        }

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

    if (progress > 100) {
        getQueueSongs();
        getCurrentSong();
        setProgress(0);
    }

    async function getQueueSongs() {
        await fetch(
            "https://api.spotify.com/v1/me/player/queue", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            }
        }
        )
            .then((result) => result.json())
            .then((data) => {
                setQueuedSongs(data.queue);
            });
    }

    async function getCurrentSong() {
        await fetch(
            "https://api.spotify.com/v1/me/player/currently-playing/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            }})
            .then((result) => result.json())
            .then((data) => {
                setCurrentSong(data);
            });
    }

    return (
        <>
        <div style={{display:"flex", paddingTop:"5px", paddingRight:"5px"}}>
            <Navbar expand="md-3" style={{flex:"1"}}>
                <Navbar.Toggle onClick={() => { handleShow(); getQueueSongs(); getCurrentSong(); }}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
  <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
</svg></Navbar.Toggle>
            </Navbar>
            <Profile profileInfo={profileInfo} color={color} style={{flex:"1"}} />
            </div>

            <Offcanvas show={show} onHide={handleClose} >
                <NavMenu song={currentSong} profileInfo={profileInfo} queuedSongs={queuedSongs} color={color} />
            </Offcanvas>
        </>
    )
}