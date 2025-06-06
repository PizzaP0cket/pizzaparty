
import React, { useState } from 'react';
// MATERIAL
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
// ICON
import SearchIcon from '@mui/icons-material/Search';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ContactlessIcon from '@mui/icons-material/Contactless';
// COMPONENTS

export default function BottomNav({ currentPage, apiToken, queuedSongs }) {
    const [value, setValue] = useState(0);

    const handleClick = (value) => {

        if (value === 1) {
            getQueueSongs();
        }
        setValue(value);
        currentPage(value);
    };

    //
    async function getQueueSongs() {
        try {
            const response = await fetch("https://api.spotify.com/v1/me/player/queue?limit=30", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiToken.authToken}`
                }
            });

            if (response.status === 401) {
                throw new Error(`Invalid access Token: ${response.status}`);
            } else if (!response.ok) {
                throw new Error(`Queued Song error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.queue) {
                queuedSongs(data.queue);
            } else {
                throw new Error("trouble fetching queued tracks");
            }
        } catch (error) {
            console.error("Failed fetching QueuedSongs", error);
        }
    }

    return (<>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    handleClick(newValue);
                }}>
                <BottomNavigationAction label="Share" icon={<ContactlessIcon />} />
                <BottomNavigationAction label="Queued" icon={<QueueMusicIcon />} />
                <BottomNavigationAction label="Search" icon={<SearchIcon />} />
                <BottomNavigationAction label="Gemini" icon={<AutoAwesomeIcon />} />
            </BottomNavigation>
        </Paper>
    </>)
}