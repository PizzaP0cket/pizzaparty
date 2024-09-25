import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from "react-bootstrap";
import TrackList from '../Track/TrackList';
import Header from '../Header/Header';

function Search(accessToken) {

    const [searchInput, setSearchInput] = useState("");
    const [tracks, setTracks] = useState([]);

    async function searchTracks() {
        // GET request using search to get the Artists ID
        if (searchInput === "") {
            return
        } else {

            var trackParameters = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken.item,
                },
            };

            await fetch(
                "https://api.spotify.com/v1/search?q=" + searchInput + "&type=track",
                trackParameters
            )
                .then((response) => response.json())
                .then((data) => {
                    setTracks(data.tracks.items);
                });
        }
    }

    return (
        <>
            <InputGroup className="mb-3" size="lg">
                <Header />
                <FormControl
                    placeholder="Search for song"
                    type="input"
                    required
                    onKeyPress={(event) => {
                        if (event.key === "Enter") {
                            searchTracks();
                        }
                    }}
                    onChange={(event) => setSearchInput(event.target.value)}
                />
                <Button variant="outline-success" onClick={() => { searchTracks() }}>Search</Button>
            </InputGroup>
            <TrackList tracks={tracks} />
        </>
    )
}

export default Search;