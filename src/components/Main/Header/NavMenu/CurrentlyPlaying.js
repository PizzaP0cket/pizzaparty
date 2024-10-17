import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar';
import AuthTimer from "./AuthTimer";

// import QueuedSongsTutorial from "./QueuedSongsTutorial";

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
            return;
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
        return (
            <>
                <div style={{ background: `rgba(${color[0].toString()})` }}>
                    <div style={{ background: `rgba(${color[0].toString()})`, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '150px 0' }}>
                        <span style={{ color: `rgba(${color[3].toString()})` }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-music-note-beamed" viewBox="0 0 16 16">
                                <path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13s1.12-2 2.5-2 2.5.896 2.5 2m9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2" />
                                <path fillRule="evenodd" d="M14 11V2h1v9zM6 3v10H5V3z" />
                                <path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4z" />
                            </svg>
                        </span>
                        <span style={{ color: `rgba(${color[4].toString()})` }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="bi bi-speaker" viewBox="0 0 16 16">
                                <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                <path d="M8 4.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5M8 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-3.5 1.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                            </svg>
                        </span>
                        <span style={{ color: `rgba(${color[1].toString()})` }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-music-note" viewBox="0 0 16 16">
                                <path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2" />
                                <path fillRule="evenodd" d="M9 3v10H8V3z" />
                                <path d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5z" />
                            </svg>
                        </span>
                    </div>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "-110px" }}>
                        Make sure you're playing spotify on a device!
                    </span>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="currentlyPlaying-Container" style={{ backgroundImage: `linear-gradient(160deg, rgba(${color[1].toString()},1) 0%, rgba(${color[4].toString()},1) 100%)` }}>
                <div className="currentlyPlaying-Details-Container">
                    <Image className="currentlyPlaying-Image" key={`Image${0}`} src={song.item.album.images[0].url} />
                    <div className="currentlyPlaying-Details">
                        <div className="scrolling-title-container">
                            <span className={"scrolling-title"} style={{ color: `rgb(${color[0].toString()}` }}>{song.item.name}</span>
                        </div>
                        <p className="currentlyPlaying-Artist" style={{ color: `rgb(${color[0].toString()}` }}>
                            {song.item.artists.map((artist, i) => (
                                <span key={`playlist-${artist.name}`}>
                                    {artist.name}{i < song.item.artists.length - 1 && ', '}
                                </span>
                            ))}
                        </p>
                        {song.is_playing ? (
                            <>
                                <ProgressBar className="progressBar" now={progress} variant='success' style={{ color: `rgb(${color[3].toString()}` }} />
                                <div className="songTime" style={{ color: `rgb(${color[0].toString()}` }}>
                                    <p className="progressed">{convertMsToMmSs(song.progress_ms + timeElapsed)}</p>
                                    <p className="remaining">-{convertMsToMmSs(song.item.duration_ms - (song.progress_ms + timeElapsed - 1000))}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <ProgressBar className="progressBar" now={((song.progress_ms - 1000) / song.item.duration_ms) * 100} variant='success' style={{ color: `rgb(${color[3].toString()}` }} />
                                <div className="songTime" style={{ color: `rgb(${color[0].toString()}` }}>
                                    <p className="progressed">{convertMsToMmSs(song.progress_ms)}</p>
                                    <p className="remaining">-{convertMsToMmSs(song.item.duration_ms - (song.progress_ms - 1000))}</p>
                                </div>
                            </>
                        )}
                        <div className="timeRemaining" style={{ backgroundImage: `linear-gradient(160deg, rgba(${color[2].toString()},1) 0%, rgba(${color[4].toString()},1) 100%)` }}>
                            <AuthTimer color={color} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
