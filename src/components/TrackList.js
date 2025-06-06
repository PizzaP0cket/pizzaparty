import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function TrackList({ tracks, apiToken }) {
  //
  async function addToQueue(trackID) {
    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=` + trackID.uri, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiToken.authToken}` } })
      if (response.status === 401) {
        throw new Error(`Invalid access token: ${response.status}`)
      } else if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
    } catch (error) {
      alert("You need to login or join a party before adding a track")
    }
  }

  // TO DO: Add text overflow to ...
  return (
    <>
      <List>
        {tracks === undefined ? <></> : tracks.map((track, i) =>
          <div key={`${i}-${track}`}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={`track-art-${track.name}`} src={track.album.images[0].url} variant="rounded"
                  sx={{ width: 50, height: 50 }} />
              </ListItemAvatar>
              <ListItemText
                primary={track.name}
                primaryTypographyProps={{
                  style: {
                    whiteSpace: 'nowrap', // Prevent text from wrapping
                    overflow: 'hidden',   // Hide overflow text
                    textOverflow: 'ellipsis', // Show ellipsis for overflow text
                  },
                }}
                secondary={
                  <React.Fragment>
                    {track.artists.map((artist, i) =>
                      `${artist.name}${i < track.artists.length - 1 && ', '}`
                    )}
                  </React.Fragment>
                }
                secondaryTypographyProps={{
                  style: {
                    whiteSpace: 'nowrap', // Prevent text from wrapping
                    overflow: 'hidden',   // Hide overflow text
                    textOverflow: 'ellipsis', // Show ellipsis for overflow text
                  },
                }}
              />
              <IconButton className='addButton' variant='outlined' onClick={() => addToQueue(track)}>
                <AddCircleIcon fontSize="large" color="primary" />
              </IconButton>
            </ListItem>
            {i !== tracks.length - 1 ? <Divider /> : <></>}
          </div>
        )}
      </List>
    </>
  );
}