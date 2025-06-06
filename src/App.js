
import React, { useEffect, useState } from 'react';
// MATERIAL
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
// COMPONENT
import TopNav from './components/TopNav.js';
import BottomNav from './components/BottomNav.js';
import Content from './components/Content.js';
import Login from './components/Login.jsx';

// API Keys
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_API_KEY;
const LOCALIP = "https://pizzap0cket.github.io/pizzaparty/"; // CHANGE THIS BIT


export default function App() {
    const [accessToken, setAccessToken] = useState(""); // SPOTIFY APP
    const [authToken, setAuthToken] = useState(null); // SPOTIFY ACCOUNT
    //const [login, setLoggedIn] = useState(false); //
    const [profileInfo, setProfile] = useState([]); //
    const [currentTime, setCurrentTime] = useState('') //
    const [currentPage, setCurrentPage] = useState(0) //
    const [queuedData, setQueuedData] = useState('') //


    // Fetch Spotify App API token
    const fetchAccessToken = async () => {
        try {
            const response = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    grant_type: "client_credentials",
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.access_token) {
                setAccessToken(data.access_token);
            } else {
                throw new Error("Access token not found in response");
            }
        } catch (error) {
            console.error("Error fetching access token:", error);
        }
    }

    async function fetchProfile(authToken) {
        try {
            const response = await fetch("https://api.spotify.com/v1/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                }
            });

            if (response.status === 401) {
                window.location.href = LOCALIP
                throw new Error(`Invalid access token: ${response.status}`);
            } else if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setProfile(data);

        } catch (error) {
            console.error("Error fetching profile", error);
        }
    }

    const updateURLTime = () => {
        const now = new Date();
        const timeInMS = now.getTime();
        setCurrentTime(timeInMS);
    }

    // This function will be called from BottomNav
    const handleCurrentPage = (currentPage) => {
        setCurrentPage(currentPage);
    };

    // This function will be called from BottomNav
    const handleQueuedSongs = (queuedData) => {
        setQueuedData(queuedData);
    };

    useEffect(() => {
        var authToken = ''; //
        if (!window.location.href.split('=')[1]) {
        } else {
            authToken = window.location.href.split('=')[1].split('&')[0];
            setAuthToken(authToken); //
            fetchProfile(authToken); //
            if (window.location.href.split('=3600')[1].length === 0) {
                updateURLTime();
                window.location.href += currentTime;
            }
        }
        fetchAccessToken(); //
    }, [currentTime]);

    // TODO: Condition, when timer runs out
    // TODO: Condition, when session token has changed
    if (window.location.href === LOCALIP || window.location.href === 'http://localhost:3000/pizzaparty' || window.location.href === 'http://192.168.86.27:3000/pizzaparty') {
        return (<>
            <Login />
        </>);
    } else {
        return (<>
            {currentPage !== 5 ? <TopNav apiToken={authToken} profile={profileInfo} hidden={false} /> : <></>}
            <Box sx={{ pb: 7 }} >
                <CssBaseline />
                <Content currentPage={currentPage} apiToken={{ accessToken, authToken }} queuedSongs={queuedData} />
                <BottomNav currentPage={handleCurrentPage} apiToken={{ accessToken, authToken }} queuedSongs={handleQueuedSongs} />
            </Box>
        </>
        );
    }
}