//import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Image,
  Stack,
  Offcanvas,
  Navbar,
  Alert,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";

//const LOCALIP = "https://pizzap0cket.github.io/pizzaparty/"; // CHANGE THIS BIT
const CLIENT_ID = "353497b40ba74572a39741002907e097";
const REDIRECT_URI = "https://pizzap0cket.github.io/pizzaparty/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPE = "user-read-currently-playing,user-read-playback-state,user-modify-playback-state";

function App() {

  const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_API_KEY;
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [queuedSongs, setQueuedSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState([]);
  const [token, setToken] = useState("");

  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const tokens = "BQCbC1zx9LJnRjTrnfNqEzTUPOi0S0slL0IuefOXeW7kDJut1tYrOeojLGUwmfnaMuhuJQW3GGhFXZIY-85NmFvFCx3x9F7EUqwUGL5F6NTZZ7EnDb_Lr_qZDHT1Ma6cV9uOeB-KkdvHMV4nSAwSpHh7G8Amqm5HDoYNAFNPxVgwYHB82jrn3hIjPgbDyQzWYJKiRTsj1UFI"

  useEffect(() => {

    const hash = window.location.hash;
    var urlToken = window.localStorage.getItem("token");

    //if (!urlToken && hash) {
    //  urlToken = window.location.hash
    //    .substring(1)
    //    .split("&")
    //    .find((elem) => elem.startsWith("access_token"))
    //    .split("=")[1];

      window.localStorage.setItem("token", urlToken);
    //}
    setToken(urlToken);
    //setHash(hash);

    // API Access Token
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
    // eslint-disable-next-line
  }, []);

  // Search
  async function addToQueue(trackID) {

    var queueParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    let addStatus;

    try {
      await fetch(
        `https://api.spotify.com/v1/me/player/queue?uri=` + trackID.uri,
        queueParameters
      ).then((result) => result.json())
        .then((data) => {
          addStatus = data.error.status
          console.log(data)
          console.log(data.error.status)
        }
        )
    } catch {
    }

    if (addStatus === 401) {
      setAlertType("danger");
      setAlertMessage(`Song not added - check access token`)
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1500);
    } else {
      setAlertType("success");
      setAlertMessage(`${trackID.name} has been added`);
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 1500);
    }
  }

  async function search() {

    // GET request using search to get the Artists ID
    if (searchInput === "") {
      return
    } else {

      var trackParameters = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
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

  const loginToSpotify = () => {
    // Navigate to Spotify for Authentication
    window.localStorage.removeItem("token");
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`

  }

  async function getQueueSongs() {
    await fetch(
      "https://api.spotify.com/v1/me/player/queue", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      }
    }
    )
      .then((result) => result.json())
      .then((data) => {
        //console.log(data)
        setQueuedSongs(data.queue);
        setCurrentSong(data.currently_playing);
      });
  }

  return (
    <div className="App">
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title><Button variant="success" onClick={loginToSpotify}>Menu</Button></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ textAlign: "center" }}>


          {currentSong && typeof currentSong === 'object' ? (
            <Stack key={`CurrentSongInfo`} direction="horizontal">
              <p>{currentSong.name}</p></Stack>

          ) : (
            <p>No Song Data</p>
          )}

          {Array.isArray(queuedSongs) ? (
            queuedSongs.map((songs, i) => {
              //console.log(songs);
              return (
                <Stack key={`QueueSongInfo${i}`} direction="horizontal">
                  <p>{i + 1}.</p>
                  <Image key={`Image${i}`}
                    className="p-2"
                    src={songs.album.images[0].url}
                    style={{ width: "60px", height: "auto" }}
                    rounded
                  />
                  <Stack key={`QueueSongLayout${i}`} style={{ textAlign: "left" }}>
                    <p key={`SongInfo${i}`} style={{ paddingTop: 2, fontSize: 13 }}><b>{songs.name}</b>
                      <br />
                      {songs.artists[0].name}</p>
                  </Stack>
                </Stack>
              )
            })
          ) : (
            <p>No songs queued</p>
          )}

        </Offcanvas.Body>
      </Offcanvas>

      <Container>
        <Navbar expand="md-3">
          <Navbar.Toggle onClick={() => { handleShow(); getQueueSongs() }} />
          <Navbar.Text>Time Remaining 00:00</Navbar.Text>
          <Navbar.Brand>Spotify - Pizza Party</Navbar.Brand>
        </Navbar>
      </Container>

      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Search for song"
            type="input"
            required
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Button variant="outline-success" onClick={search}>Search</Button>
        </InputGroup>
      </Container>


      <Container>
        <Alert variant={`${alertType}`} show={alert} style={{ position: "fixed", top: "20px", left: "50%", transform: `translateX(-50%)`, zIndex: '9999' }}>{alertMessage}</Alert>

        {tracks.map((track, i) => {
          console.log(track);
          return (
            <Stack key={`LayoutSongInfo${i}`} direction="horizontal">
              <Image key={`Image${i}`}
                className="p-2"
                src={track.album.images[0].url}
                style={{ width: "80px", height: "auto" }}
                rounded
              />
              <Stack key={`SongInfoLayout${i}`} style={{ textAlign: "left" }}>
                <p key={`SongInfo${i}`} style={{ paddingTop: 10 }}><b>{track.name}</b>
                  <br />
                  {track.artists[0].name}</p>
              </Stack>
              <Button key={`addButton${i}`} variant="outline-success" onClick={() => addToQueue(track)}>
                +
              </Button>
            </Stack>
          );
        })}
      </Container>
    </div>
  );
}

export default App;
