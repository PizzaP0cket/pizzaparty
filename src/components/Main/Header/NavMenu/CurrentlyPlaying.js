import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar';
import AuthTimer from "./AuthTimer";

//import QueuedSongsTutorial from "./QueuedSongsTutorial";

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

            <div className="currentlyPlaying-Container" style={{ backgroundImage: `linear-gradient(160deg, rgba(${color[1].toString()},1) 0%, rgba(${color[4].toString()},1) 100%)` }}>
                <div className="currentlyPlaying-Details-Container">
                    <Image className="currentlyPlaying-Image" key={`Image${0}`} src={song.item.album.images[0].url} />
                    <div className="currentlyPlaying-Details" >
                        <div className="scrolling-title-container">
                            <span className={"scrolling-title"} style={{ color: `rgb(${color[0].toString()}` }}>{song.item.name}</span>
                        </div>
                        <p className="currentlyPlaying-Artist" style={{ color: `rgb(${color[0].toString()}` }}>{song.item.artists.map((artist, i) => <span key={`playlist-${artist.name}`} >{artist.name}{i < song.item.artists.length - 1 && ', '}</span>)}</p>
                        {song.is_playing ? (<>
                            <ProgressBar className="progressBar" now={progress} variant='success' style={{ color: `rgb(${color[3].toString()}` }} />
                            <div className="songTime" style={{ color: `rgb(${color[0].toString()}` }}>
                                <p className="progressed" >{convertMsToMmSs(song.progress_ms + timeElapsed)}</p>
                                <p className="remaining" >-{convertMsToMmSs(song.item.duration_ms - (song.progress_ms + timeElapsed - 1000))}</p>
                            </div>
                        </>) : (<>
                            <ProgressBar className="progressBar" now={((song.progress_ms - 1000) / song.item.duration_ms )*100} variant='success' style={{ color: `rgb(${color[3].toString()}` }} />
                            <div className="songTime" style={{ color: `rgb(${color[0].toString()}` }}>
                                <p className="progressed" >{convertMsToMmSs(song.progress_ms)}</p>
                                <p className="remaining" >-{convertMsToMmSs(song.item.duration_ms - (song.progress_ms - 1000))}</p>
                            </div>
                        </>)}
                        <div className="timeRemaining" style={{ backgroundImage: `linear-gradient(160deg, rgba(${color[2].toString()},1) 0%, rgba(${color[4].toString()},1) 100%)` }}>
                            <AuthTimer color={color} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}