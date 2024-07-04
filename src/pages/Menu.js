import React from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap"
import { useState } from "react";

function Menu() {

  const token = "BQCbC1zx9LJnRjTrnfNqEzTUPOi0S0slL0IuefOXeW7kDJut1tYrOeojLGUwmfnaMuhuJQW3GGhFXZIY-85NmFvFCx3x9F7EUqwUGL5F6NTZZ7EnDb_Lr_qZDHT1Ma6cV9uOeB-KkdvHMV4nSAwSpHh7G8Amqm5HDoYNAFNPxVgwYHB82jrn3hIjPgbDyQzWYJKiRTsj1UFI"
  const [profileInfo, setProfileInfo] = useState([]);

  async function getProfile(token) {
    await fetch(
      "https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }
    )
      .then((result) => result.json())
      .then((data) => {
        console.log(data)
        setProfileInfo(data)
      });
  }

  async function getCurrentSong(token) {
    await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
    )
      .then((result) => result.json())
      .then((data) => {
        console.log(data)
      });
  }

  async function getQueueSongs(token) {
    await fetch(
      "https://api.spotify.com/v1/me/player/queue", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    }
    )
      .then((result) => result.json())
      .then((data) => {
        console.log(data)
      });
  }

  return (
    <div>
      <p>{profileInfo.display_name}</p>
      <Button variant="outline-success" onClick={() => getProfile(token)}>Who am I</Button>
      <Button variant="outline-success" onClick={() => getCurrentSong(token)}>What am I listening to</Button>
      <Button variant="outline-success" onClick={() => getQueueSongs(token)}>Whats next</Button>
    </div>
  )
}

export default Menu

// Current Song
/*<p>{currentSong.item.name}</p> */

// Profile Picture
/* <Image key={`Image${0}`} 
                    className="p-2"
                    src={profileInfo.images[1].url}
                    style={{ width: "300px", height: "auto"}}
                    roundedCircle/> */