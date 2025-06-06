import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import TrackList from './TrackList.js';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';


const { GoogleGenerativeAI } = require("@google/generative-ai");

// API Keys
const geminiAPIKey = process.env.REACT_APP_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(geminiAPIKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const musicGenre = ['Rock', 'Pop', 'Electronic', 'Hip hop', 'Jazz', 'Blues', 'Heavy Metal', 'Classical', 'Country', 'Dance', 'World', 'Punk', 'Funk', 'Indie', 'Alternative', 'Progressive', 'Disco', 'Experimental', 'Grunge'];
const musicMood = ['Happy', 'Dreamy', 'Epic', 'Laid Back', 'Euphoric', 'Quirky', 'Suspense', 'Running', 'Relaxing', 'Mysterious', 'Sentimental', 'Sad'];
const musicTempo = ['Slow', 'Medium', 'Fast'];

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
    responseSchema: {
        type: "object",
        properties: {
            response: {
                type: "array",
                items: {
                    type: "string"
                }
            }
        }
    },
};

export default function Gemini({ apiToken }) {

    const [selectedItems, setSelectedItems] = useState({ genre: [], mood: [], tempo: "", });
    const [suggestedSongsSpotify, setSuggestedSongsSpotify] = useState([]);

    const handleButtonClick = (item, category) => {
        setSelectedItems(prevState => {
            if (category === 'tempo') {
                // If 'tempo' is clicked, toggle the tempo value (it can only be one item)
                return {
                    ...prevState,
                    tempo: prevState.tempo === item ? "" : item
                };
            } else if (category === 'genre' || category === 'mood') {
                // For 'genre' and 'mood', toggle the item in the array if not already included
                const updatedCategory = prevState[category].includes(item)
                    ? prevState[category].filter(i => i !== item) // Remove item if already selected
                    : [...prevState[category], item]; // Add item if not selected

                // If the array is too long (genre/mood), cap it at 3 items
                if (updatedCategory.length > 3) updatedCategory.pop(); // Limit array to 3 items

                return {
                    ...prevState,
                    [category]: updatedCategory
                };
            }
            return prevState;
        });
    };

    async function searchTracks(songs) {
        try {
            if (songs.includes('{')) {
                //throw new Error(`Gemini has prompted the wrong information, try again`);
                console.log("Google Gemini ran into an issue, try again!")
                return null
            }
            const response = await fetch("https://api.spotify.com/v1/search?q=" + songs + "&type=track&limit=1",
                { method: "GET", headers: { "content-Type": "application/json", Authorization: `Bearer ${apiToken.accessToken}` } })
            if (response.status === 401) {
                throw new Error(`Invalid access token: ${response.status}`)
            } else if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            } else {
                const data = await response.json();
                return data.tracks.items[0];
            }
        } catch (error) {
            console.error('Error fetching track', error);
        }
    }

    async function gemini() {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });
        const result = await chatSession.sendMessage(`Get 10 ${selectedItems.genre} tracks with ${selectedItems.mood} mood & ${selectedItems.tempo} tempo. Exclude "song" in title, no repeated artists, return only name`);

        const songsList = JSON.parse(result.response.text()).response;
        const formattedSongs = songsList.map(song => song.replaceAll(' ', '%20'));

        // Use Promise.all to fetch all tracks concurrently
        try {
            const songSuggestions = await Promise.all(
                formattedSongs.map(song => searchTracks(song))
            );

            // Filter out any null results (in case there are errors fetching some tracks)
            const validSongs = songSuggestions.filter(song => song !== null);
            setSuggestedSongsSpotify(validSongs);
        } catch (error) {
            console.error("Error fetching tracks concurrently", error);
        }
    }

    return (
        <Box>
            <Accordion defaultExpanded={false} slotProps={{ heading: { component: 'h4' } }}>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component="span"> <AutoAwesomeIcon /> Google Gemini</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <Divider>Genra {selectedItems.genre.length}/3</Divider>
                        <div>
                            {musicGenre.map((musicGenre, i) => {
                                return (
                                    <Chip
                                        key={`${musicGenre}-Genre`}
                                        label={musicGenre}
                                        onClick={() => handleButtonClick(musicGenre, "genre")}
                                        color='primary'
                                        variant={!selectedItems.genre.includes(musicGenre) ? 'outlined' : 'contained'}
                                        disabled={selectedItems.genre.length >= 3 && !selectedItems.genre.includes(musicGenre)}
                                    />
                                )
                            })}
                        </div>
                        <Divider>Mood {selectedItems.mood.length}/3</Divider>
                        <div>
                            {musicMood.map((musicMood, i) => {
                                return (
                                    <Chip
                                        key={`${musicMood}-Mood`}
                                        label={musicMood}
                                        onClick={() => handleButtonClick(musicMood, "mood")}
                                        color='primary'
                                        variant={!selectedItems.mood.includes(musicMood) ? 'outlined' : 'contained'}
                                        disabled={selectedItems.mood.length >= 3 && !selectedItems.mood.includes(musicMood)}
                                    />
                                )
                            })}
                        </div>
                        <Divider variant='middle'>Tempo {selectedItems.tempo}/3</Divider>
                        <div>
                            {musicTempo.map((musicTempo, i) => {
                                return (
                                    <Chip
                                        key={`${musicTempo}-Tempo`}
                                        label={musicTempo}
                                        onClick={() => handleButtonClick(musicTempo, "tempo")}
                                        color='primary'
                                        variant={!selectedItems.tempo.includes(musicTempo) ? 'outlined' : 'contained'}
                                        disabled={selectedItems.tempo.length >= 3 && !selectedItems.tempo.includes(musicTempo)}
                                    />
                                )
                            })}
                        </div>
                        <Divider>Result</Divider>
                    </div>
                </AccordionDetails>
            </Accordion>
            <div>
                <Button variant='contained' onClick={() => { gemini() }}>GENERATE</Button>
            </div>
            {suggestedSongsSpotify === undefined ? <></> : <TrackList tracks={suggestedSongsSpotify} apiToken={apiToken} />}
        </Box>
    )
}
