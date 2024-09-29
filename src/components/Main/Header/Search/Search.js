import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from "react-bootstrap";

export default function Search({ accessToken, onSendData, onLoading, color }) {

    const [searchInput, setSearchInput] = useState("");

    async function searchTracks() {
        // GET request using search to get the Artists ID
        if (searchInput === "") {
            return;
        }

        onLoading(true);

        var trackParameters = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        };

        try{
        await fetch(
            "https://api.spotify.com/v1/search?q=" + searchInput + "&type=track",
            trackParameters
        )
            .then((response) => response.json())
            .then((data) => {
                //setTracks(data.tracks.items);
                onSendData(data.tracks.items);
            });
        } catch (error) {
            console.error('Error fetching tracks:', error);
        } finally {
            onLoading(false);
            document.getElementById('searchBar').value = '';
        }

    };

    return (
        <>
            <InputGroup >
                <FormControl
                    id="searchBar"
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
                <Button  style={{background: `linear-gradient(to bottom right, rgb(${color[2].toString()}), rgb(${color[4].toString()}))`, borderColor:`rgb(${color[2].toString()}`}} onClick={() => { searchTracks() }}>Search</Button>
            </InputGroup>
        </>
    )
};