import { useEffect, useState } from "react";
import { Image, Badge, Spinner } from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Soundwave from "./SoundWave.js";

export default function CurrentlyPlaying({ song, color }) {

    const [progress, setProgress] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);

    function convertMsToMmSs(msString) {
        const ms = parseInt(msString, 10); // Convert string to an integer

        const totalSeconds = Math.floor(ms / 1000); // Convert ms to seconds
        const minutes = Math.floor(totalSeconds / 60); // Get minutes
        const seconds = totalSeconds % 60; // Get remaining seconds

        // Format minutes and seconds to always be two digits
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    useEffect(() => {

        if (song.item === undefined) {
        } else {
            if (!song || !song.item || song.item.duration_ms === 0) {
                setProgress(0); // Reset progress if song is invalid
                return;
            }

            // Calculate the percentage of the song that has played
            const totalDuration = Math.floor(parseInt(song.item.duration_ms, 10) / 1000);
            const currentProgress = Math.floor(parseInt(song.progress_ms, 10) / 1000);
            const percentage = (currentProgress / totalDuration) * 100;

            setProgress(percentage);

            // Optional: Update progress every second
            const interval = setInterval(() => {
                setProgress((prevProgress) => {
                    const newProgress = Math.min(prevProgress + (1 / totalDuration) * 100, 100);
                    return newProgress;
                });
                setTimeElapsed((prev) => prev + 1000);
            }, 1000);
            return () => clearInterval(interval); // Cleanup on unmount
        }


    }, [song]);


    if (song.item === undefined) {
        return (<></>)
    }

    return (
        <>
            {song.item !== null ? (<>
                {song.item.album === undefined ? (<><p /><Spinner animation="border" style={{ display: "block", margin: "auto", color: `rgb(${color[2].toString()}` }} /></>) : (
                    <>
                        <div className='currentlyPlaying' >
                            <div className="currentlyPlaying-item">
                                <Image key={`Image${0}`} className="rotate" src={song.item.album.images[0].url} />
                                <div className="currentPlaying-details">
                                    <Soundwave color={color} currentSong={song.item} />
                                    <p className="currentPlaying-title" >{song.item.name}</p>
                                    <p className="currentPlaying-artist">{song.item.artists.map(artist =>
                                        <Badge key={`playlist-${artist.name}`} bg="" style={{ background: `linear-gradient(to bottom right, rgb(${color[2].toString()}), rgb(${color[4].toString()}))` }}  >{artist.name}</Badge>)}</p>
                                </div>
                            </div>
                            <div >
                                <p>{convertMsToMmSs(song.progress_ms + timeElapsed)}</p>
                                <ProgressBar now={progress} />
                                <p>{convertMsToMmSs(song.item.duration_ms - (song.progress_ms + timeElapsed))}</p>
                            </div>
                        </div>
                    </>)}
            </>) : (<>
                <p></p>
                <p style={{ textAlign: "center" }}>Make sure you have a device playing spotify</p>
            </>)}
        </>
    );
}

//     return (
//         <>
//             {song.item !== null ? (<>
//                 {song.item.album === undefined ? (<><p /><Spinner animation="border" style={{ display: "block", margin: "auto", color: `rgb(${color[2].toString()}` }} /></>) : (
//                     <>
//                         <div className='currentlyPlaying' style={{ background: `linear-gradient(to bottom , rgb(${color[1].toString()}), rgb(${color[3].toString()}))` }}>
//                             <div className="currentlyPlaying-item">
//                                 <Image key={`Image${0}`} className="rotate" src={song.item.album.images[0].url} roundedCircle />
//                                 <div className="currentPlaying-details">
//                                     <Soundwave color={color} currentSong={song.item} />
//                                     <p className="currentPlaying-title" >{song.item.name}</p>
//                                     <p className="currentPlaying-artist">{song.item.artists.map(artist =>
//                                         <Badge key={`playlist-${artist.name}`} bg="" style={{ background: `linear-gradient(to bottom right, rgb(${color[2].toString()}), rgb(${color[4].toString()}))` }}  >{artist.name}</Badge>)}</p>
//                                 </div>
//                             </div>
//                             <div >
//                                 <p>{convertMsToMmSs(song.progress_ms + timeElapsed)}</p>
//                                 <ProgressBar now={progress} />
//                                 <p>{convertMsToMmSs(song.item.duration_ms - (song.progress_ms + timeElapsed))}</p>
//                             </div>
//                         </div>
//                     </>)}
//             </>) : (<>
//                 <p></p>
//                 <p style={{ textAlign: "center" }}>Make sure you have a device playing spotify</p>
//             </>)}
//         </>
//     );
// }