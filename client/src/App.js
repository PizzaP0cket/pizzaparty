//import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  ListGroup,
  Stack,
  Offcanvas,
  Navbar,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";


const LOCALIP = "https://pizzap0cket.github.io/pizzaparty/"; // CHANGE THIS BIT

const CLIENT_ID = "353497b40ba74572a39741002907e097";
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_API_KEY;
const REDIRECT_URI = "https://pizzap0cket.github.io/pizzaparty/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPE = "user-modify-playback-state";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState("");
  const [QRCodeHash, setHash] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const hash = window.location.hash;
    var urlToken = window.localStorage.getItem("token");

    if (!urlToken && hash) {
      urlToken = window.location.hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.localStorage.setItem("token", urlToken);
    }
    setToken(urlToken);
    setHash(hash);

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
    console.log(token);
    var addTrack = await fetch(
      `https://api.spotify.com/v1/me/player/queue?uri=` + trackID,
      queueParameters
    );
  }

  async function search() {
    console.log("Search for " + searchInput);

    // GET request using search to get the Artists ID

    var trackParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    var returnedTracks = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=track",
      trackParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTracks(data.tracks.items);
      });
  }

  return (
    <div className="App">
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ textAlign: "center" }}>
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            login to spotify
          </a>
          <br />
          <br />
          <p>Bring others to the party!</p>
          <QRCodeSVG value={`${LOCALIP}${QRCodeHash}`} size="200px" />
        </Offcanvas.Body>
      </Offcanvas>

      <Container>
        <Navbar>
          <Button onClick={handleShow}>#</Button>
          <Navbar.Brand>Spotify - Add to queue</Navbar.Brand>
        </Navbar>
      </Container>

      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="Search for song"
            type="input"
            onKeyPress={(event) => {
              if (event.key == "Enter") {
                search();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>Search</Button>
        </InputGroup>
      </Container>
      <Container>
        {tracks.map((track, i) => {
          console.log(track);
          return (
            <ListGroup>
              <ListGroup.Item action variant="dark">
                <Stack direction="horizontal" gap={2}>
                  <img
                    className="p-2"
                    src={track.album.images[0].url}
                    style={{ width: "80px", height: "auto" }}
                  />
                  <div className="p-2">{track.name}</div>
                  <div className="vr  ms-auto" />
                  <Button className="p-2" onClick={() => addToQueue(track.uri)}>
                    Add
                  </Button>
                </Stack>
              </ListGroup.Item>
            </ListGroup>
          );
        })}
      </Container>
    </div>
  );
}

export default App;