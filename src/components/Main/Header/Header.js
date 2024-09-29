import React, { useEffect, useState } from 'react';
import { Offcanvas, Navbar } from "react-bootstrap";
import NavMenu from './NavMenu/NavMenu'
import './Header.css';

export default function Header({ authToken, color }) {

    const [profileInfo, setProfile] = useState([]);
    const [queuedSongs, setQueuedSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(color)

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
    }, [authToken]);

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
                    setCurrentSong(data.currently_playing);
                });
    }

    return (
        <>
            <Navbar expand="md-3">
                <Navbar.Toggle onClick={() => { handleShow(); getQueueSongs() }} />
            </Navbar>

            <Offcanvas show={show} onHide={handleClose} >
                <NavMenu song={currentSong} profileInfo={profileInfo} queuedSongs={queuedSongs} color={color}/>
            </Offcanvas>
        </>
    )
}