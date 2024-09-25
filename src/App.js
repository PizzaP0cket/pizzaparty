import "bootstrap/dist/css/bootstrap.min.css";
import Search from "./components/Main/Search/Search.js";
//import Header from "./components/Main/Header/Header.js";
import React, { useEffect, useState } from 'react';

function App() {

    const CLIENT_ID = "353497b40ba74572a39741002907e097";
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_API_KEY;

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
            <Search item={accessToken} />
        </>
    );
};

export default App;