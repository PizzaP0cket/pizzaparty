
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';


export default function Search({ apiToken, onSendData }) {

    const [searchInput, setSearchInput] = useState('');

    async function searchTracks() {
        // GET request using search to get the Artists ID
        if (searchInput === "") { return };
        try {
            await fetch("https://api.spotify.com/v1/search?q=" + searchInput + "&type=track",
                { method: "GET", headers: { "content-Type": "application/json", Authorization: `Bearer ${apiToken.accessToken}` } })
                .then((response) => response.json())
                .then((data) => { onSendData(data.tracks.items); });
        } catch (error) {
            console.error('Error fetching tracks:', error);
        }
    }

    return (
        <>
            <div > 
                <TextField
                    id="searchBar" variant="outlined" placeholder="Search for song..." required style={{width:"100%"}}
                    onKeyDown={(event) => { if (event.key === "Enter") { searchTracks(); event.target.blur() } }}
                    onChange={(event) => setSearchInput(event.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    {!searchInput === false 
                                        ? <IconButton className="search-button" size="small" onClick={() => { document.getElementById('searchBar').value = ""; setSearchInput(''); onSendData([]) }}>
                                            <CancelIcon fontSize='inherit'/>    
                                        </IconButton>
                                        : <></>
                                    }
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </div>
        </>
    )
};