import React, { useEffect } from 'react';

function Authentication() {

    useEffect(() => {
        //const LOCALIP = "https://pizzap0cket.github.io/pizzaparty/"; // CHANGE THIS BIT
        const CLIENT_ID = "353497b40ba74572a39741002907e097";
        //const REDIRECT_URI = "https://pizzap0cket.github.io/pizzaparty/";
        const REDIRECT_URI = "https://pizzap0cket.github.io/pizzaparty/"
        const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
        const RESPONSE_TYPE = "token";
        const SCOPE = "user-read-currently-playing,user-read-playback-state,user-modify-playback-state";
        
        window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`
    }, []);

    return (
        <>
            Redirecting...
        </>
    );
};

export default Authentication;