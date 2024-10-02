import React, { useState } from 'react';
import "/Users/pizzapocket/Documents/pizzaparty/src/components/Main/Header/Header.css";

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

        try {
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
        }

    };

    return (
        <>
            <div className="search-bar" >
                <button className="search-button" disabled onClick={() => { searchTracks() }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg></button>
                <input
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
                    className="search-input"
                />
                <button className="search-button" onClick={() => { document.getElementById('searchBar').value = ''; }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg></button>
            </div>
        </>
    )
};

//     return (
//         <>
//             <InputGroup >
//                 <FormControl
//                     id="searchBar"
//                     placeholder="Search for song"
//                     type="input"
//                     required
//                     onKeyPress={(event) => {
//                         if (event.key === "Enter") {
//                             searchTracks();
//                         }
//                     }}
//                     onChange={(event) => setSearchInput(event.target.value)}
//                 />
//                 <Button  style={{background: `linear-gradient(to bottom right, rgb(${color[2].toString()}), rgb(${color[4].toString()}))`, borderColor:`rgb(${color[2].toString()}`}} onClick={() => { searchTracks() }}>Search</Button>
//             </InputGroup>
//             <div className="search-bar">
//       <input
//         type="text"
//         className="search-input"
//       />
//       <button className="search-button">🔍</button>
//       </div>
//         </>
//     )
// };