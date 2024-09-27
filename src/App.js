import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./components/Main/Header/Search/Search.js";
import React, { useEffect, useState } from 'react';
import Header from "./components/Main/Header/Header.js";
import TrackList from "./components/Main/Track/TrackList.js";

export default function App() {

    const [accessToken, setAccessToken] = useState("");
    const [authToken, setAuthToken] = useState('');
    const [searchedTracks, setSearchedTracks] = useState([]);
    const [state, setLoading] = useState(false);

    const handleSearchedTracks = (data) => {
        setSearchedTracks(data);
    };

    const handleLoading = (data) => {
        setLoading(data);
    };

    useEffect(() => {
        const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
        const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_API_KEY;

            var authToken = '';
        if (!window.location.href.split('=')[1]) {
        } else {
            authToken = window.location.href.split('=')[1].split('&')[0];
            setAuthToken(authToken);
        }
    
        var authParameters = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body:
                "grant_type=client_credentials&client_id=" +
                CLIENT_ID +
                "&client_secret=" +
                CLIENT_SECRET,
        };
        fetch("https://accounts.spotify.com/api/token", authParameters)
            .then((result) => result.json())
            .then((data) => setAccessToken(data.access_token));
    }, []);

    return (
        <>
            <Header authToken={authToken} />
            <Search accessToken={accessToken} onSendData={handleSearchedTracks} onLoading={handleLoading} />
            <TrackList tracks={searchedTracks} authToken={authToken} loading={state} />
        </>
    );
};