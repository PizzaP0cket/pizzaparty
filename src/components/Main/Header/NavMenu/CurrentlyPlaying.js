import { Image, Badge, Spinner } from "react-bootstrap";
import Soundwave from "./SoundWave.js";

export default function CurrentlyPlaying({song, color}) {

    if (song === undefined) {
        return(<></>);
    }
    
    return (
        <>
            {song !== null ? (<>
                { song.album === undefined ? (<><p /><Spinner animation="border" style={{ display: "block", margin: "auto", color:`rgb(${color[2].toString()}`}} /></>) : (
                    <>
                        <div className='currentlyPlaying' style={{background:`rgba(${color[3].toString()}, 20%)`}}>
                            <div className="currentlyPlaying-item">
                                <Image key={`Image${0}`} className="rotate" src={song.album.images[0].url} roundedCircle />
                                <div className="currentPlaying-details">
                                    <Soundwave color={color} currentSong={song} />
                                    <p className="currentPlaying-title" >{song.name}</p>
                                    <p className="currentPlaying-artist">{song.artists.map(artist =>
                                        <Badge key={`playlist-${artist.name}`} bg="" style={{background:`rgb(${color[2].toString()})`}}  >{artist.name}</Badge>)}</p>
                                </div>
                            </div>
                        </div>
                    </>)}
            </>) : (<>
                <p></p>
                <p style={{textAlign:"center"}}>Make sure you have a device playing spotify</p>
            </>)}
        </>
    );
}