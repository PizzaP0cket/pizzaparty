import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./components/Main/Header/Search/Search.js";
import React, { useEffect, useState } from 'react';
import Header from "./components/Main/Header/Header.js";
import TrackList from "./components/Main/Track/TrackList.js";
import Tutorial from "./components/Main/Track/Tutorial.js";

export default function App() {
    const [accessToken, setAccessToken] = useState("");
    const [authToken, setAuthToken] = useState('');
    const [searchedTracks, setSearchedTracks] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [colourMind, setColour] = useState('');

    const fetchColours = async () => {
        var colorParameter = {
            method: "POST",
            body: JSON.stringify({ model: "ui" })
        };
        try {
            await fetch("http://colormind.io/api/", colorParameter)
                .then((result) => result.json())
                .then((data) => setColour(data.result))
        } catch (error) {
            console.error("Trouble loading colours", error);
        }

    };

    const fetchAccessToken = async () => {
        const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
        const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_API_KEY;
        const authParameters = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body:
                `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        };
        try {
            await fetch("https://accounts.spotify.com/api/token", authParameters)
                .then((result) => result.json())
                .then((data) => setAccessToken(data.access_token));
        } catch (error) {
            console.error("Error fetching access token", error);
        }
    };

    const handleSearchedTracks = (data) => {
        setSearchedTracks(data);
    };

    const handleLoading = (data) => {
        setLoading(data);
    };

    useEffect(() => {
        var authToken = '';
        if (!window.location.href.split('=')[1]) {
        } else {
            authToken = window.location.href.split('=')[1].split('&')[0];
            setAuthToken(authToken);
        }

        fetchColours();
        fetchAccessToken();

    }, []);

    if (colourMind[0] === undefined) {
        return (
            <>loading...</>
        )
    }

    return (
        <>
            <div style={{background:`rgba(${colourMind[0].toString()}, 75%`}}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Header authToken={authToken} color={colourMind} />
                    <Search accessToken={accessToken} onSendData={handleSearchedTracks} onLoading={handleLoading} color={colourMind} />
                </div>
                <TrackList tracks={searchedTracks} authToken={authToken} loading={isLoading} color={colourMind} />
                {searchedTracks.length === 0 ? (
                    <Tutorial color={colourMind} />
                ) : (<></>)}
            </div>
        </>
    );
};