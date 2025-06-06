import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function QueuedSongs({ queuedSongs }) {

    // TODO: Add Layout
    // TODO: Add images
    // TODO: Add artists

    return (
        <>
            <List>
                {Array.isArray(queuedSongs) ? (
                    queuedSongs.filter((song, i, arr) => i === 0 || song.name !== arr[i - 1].name).map((songs, i) => {
                        return (
                            <div key={`${i}-${songs}`}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={`songs-art-${songs.name}`} src={songs.album.images[0].url} variant="rounded" />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={songs.name}
                                        secondary={
                                            <React.Fragment>
                                                {songs.artists.map((artist, i) =>
                                                    `${artist.name}${i < songs.artists.length - 1 && ', '}`
                                                )}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                {i !== queuedSongs.length - 1 ? <Divider /> : <></>}
                            </div>
                        )
                    }
                    )
                ) : (<></>)}
            </List>
        </>
    )
}
