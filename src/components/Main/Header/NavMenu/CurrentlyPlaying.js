import { Image, Badge, Spinner } from "react-bootstrap";
import Soundwave from "./SoundWave.js";

export default function CurrentlyPlaying({ song }) {

    return (
        <>
            {typeof song === 'object' ? (<>
                {song.album === undefined ? (<><p /><Spinner animation="border" style={{ display: "block", margin: "auto" }} /></>) : (
                    <>
                        <div className='currentlyPlaying'>
                            <div className="currentlyPlaying-item">
                                <Image key={`Image${0}`} className="rotate" src={song.album.images[0].url} roundedCircle />
                                <div className="currentPlaying-details">
                                    <Soundwave />
                                    <p className="currentPlaying-title" >{song.name}</p>
                                    <p className="currentPlaying-artist">{song.artists.map(artist =>
                                        <Badge key={`playlist-${artist.name}`} bg='success'>{artist.name}</Badge>)}</p>
                                </div>
                            </div>
                        </div>
                    </>)}
            </>) : (<></>)}
        </>
    );
}