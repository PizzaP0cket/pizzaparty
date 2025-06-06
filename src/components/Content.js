
import React, { useState } from 'react';
// MATERIAL

// COMPONENT
import Search from "./Search.js";
import Gemini from "./Gemini.js";
import QueuedSongs from "./QueuedSongs.js";
import AuthTimer from "./AuthTimer.js";
import TrackList from './TrackList.js';
import QRCode from '../utils/QRCode.js';

export default function Content( { currentPage, apiToken, queuedSongs }) {

    const [searchedTracks, setSearchedTracks] = useState([]); //
    
    const handleSearchedTracks = (data) => {
        setSearchedTracks(data);
    };

    let content;
    // TODO: Change content on bottom nav change

    switch (currentPage) {
        case 1:
            content = <>
                <QueuedSongs apiToken={apiToken} queuedSongs={queuedSongs}/>
            </>
            break;
        case 2:
            content= <>
                <Search apiToken={apiToken} onSendData={handleSearchedTracks}/>
                <TrackList tracks={searchedTracks} apiToken={apiToken} />
            </>
            break;
        case 3:
            content = <>
                <br />
                <Gemini apiToken={apiToken} />
            </>
            break;
        default:
            content = <>
                <br />
                <AuthTimer />
                <QRCode />
            </>
            break;
    }
    return (<>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{ maxWidth: "1000px", minWidth: "400px"}}>
                {content}
            </div>
        </div>
    </>)
}