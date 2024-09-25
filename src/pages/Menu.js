import "bootstrap/dist/css/bootstrap.min.css";
import "./Menu.css";
import { Button } from "react-bootstrap";
import CryptoJS from "crypto-js";
import { useState } from "react";

function Menu() {

  const CLIENT_ID = "353497b40ba74572a39741002907e097";
  const REDIRECT_URI = "http://10.0.0.21:3000/pizzaparty/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "user-read-currently-playing,user-read-playback-state,user-modify-playback-state";

  const loginToSpotify = () => {
    // Navigate to Spotify for Authentication
    window.localStorage.removeItem("token");
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`
    //   navigate("./App")
  }

  const [originalUrl, setOriginalUrl] = useState('');
  const [codedUrl, setCodedUrl] = useState('');

  const handleChange = (event) => {
    setOriginalUrl(event.target.value);
  }

  const handleClick = () => {
    const hash = CryptoJS.SHA256(originalUrl).toString(CryptoJS.enc.Hex);

    const shortHash = hash.substring(0,5);

    setCodedUrl(shortHash);
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Pizza Party!</h2>
        <form>
          <div className="input-field">
            <Button variant="success" onClick={loginToSpotify} style={{ cursor: "pointer", fontSize: "16px", border: "none", padding: "10px", width: "100%", borderRadius: "5px" }}>Lead the charge!</Button>
          </div>
          <div className="input-field">
            <input type="text" placeholder="Enter Code" />
          </div>
          <Button type="submit" className="login-button">Join the party!</Button>

          <input type="text" value={originalUrl} onChange={handleChange} placeholder="Enter a string" />
          <Button onClick={handleClick}>Encode</Button>
          <div>
            <h2>Origional</h2>
            <p>{originalUrl}</p>
            <h2>Shortened String</h2>
            <p>{codedUrl}</p>
          </div>
        </form>
      </div>
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


//                    <Container>
//      <Button>Host</Button>
//      <FormControl></FormControl>
//      <Button>Join the party!</Button>
//    </Container>