import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./components/Main/Header/Search/Search.js";
import React, { useEffect, useState } from 'react';
import Header from "./components/Main/Header/Header.js";
import TrackList from "./components/Main/Track/TrackList.js";
//import Tutorial from "./components/Main/Track/Tutorial.js";

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
    const colourMind = [[255, 255, 255], [99, 160, 200], [230, 61, 55], [199, 113, 137], [30, 34, 57]];

    const [currentTime, setCurrentTime] = useState('');

    // Issue accessing ColorMind API from GitHub

    // const [colourMind, setColour] = useState('');     // Issue accessing API from GitHub
    //
    // const fetchColours = async () => {
    //     var colorParameter = {
    //         method: "POST",
    //         body: JSON.stringify({ model: "ui" })
    //     };
    //     try {
    //         await fetch("http://colormind.io/api/", colorParameter)
    //             .then((result) => result.json())
    //             .then((data) => setColour(data.result))
    //     } catch (error) {
    //         console.error("Trouble loading colours", error);
    //     }
    // };
    //
    // if (colourMind[0] === undefined) {
    //     return (
    //         <>loading...</>
    //     )
    // }

    //
    const fetchAccessToken = async () => {
        const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
        const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_API_KEY;

        try {
            await fetch("https://accounts.spotify.com/api/token", {method: "POST",headers: {"Content-Type": "application/x-www-form-urlencoded"},body:`grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`})
                .then((result) => result.json())
                .then((data) => setAccessToken(data.access_token))
        } catch (error) {
            console.error("Error fetching access token", error)
        }
    };

    //
    const handleSearchedTracks = (data) => {
        setSearchedTracks(data);
    };

    //
    const handleLoading = (data) => {
        setLoading(data);
    };

    const updateURLTime = () => {
        const now = new Date();
        const timeInMS = now.getTime();
        setCurrentTime(timeInMS);
    }

    //
    useEffect(() => {
        var authToken = ''; //
        if (!window.location.href.split('=')[1]) {
        } else {
            authToken = window.location.href.split('=')[1].split('&')[0];
            setAuthToken(authToken);
            if(window.location.href.split('=3600')[1].length === 0){
                updateURLTime();
                window.location.href += currentTime;
            }
        }
        // fetchColours();  //
        fetchAccessToken(); //
    }, [currentTime]);

    return (
        <>
            <div style={{ background: `rgb(${colourMind[0].toString()}`}}>
                <Header authToken={authToken} color={colourMind} />
                <div className="menuStyle">
                <Search accessToken={accessToken} onSendData={handleSearchedTracks} onLoading={handleLoading} color={colourMind} />
                <TrackList tracks={searchedTracks} authToken={authToken} loading={isLoading} color={colourMind} />
                </div>     
                {searchedTracks.length === 0 ? (
                    <></>
                ) : (<>
                </>)}
            </div>
        </>
    );
};