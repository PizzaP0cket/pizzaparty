import { useEffect, useState } from "react";
import { Image, Spinner } from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar';
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

    //<QueuedSongsTutorial /><

     if (song.item === undefined) {
         return (<></>)
     }

    return (
        <>
            {song.item !== null ? (<>
                {song.item.album === undefined ? (<><p /><Spinner animation="border" style={{ display: "block", margin: "auto", color: `rgb(${color[2].toString()}` }} /></>) : (
                    <>
                        <div style={{ 
                       backgroundImage: `linear-gradient(160deg, rgba(${color[1].toString()},1) 0%, rgba(${color[4].toString()},1) 100%)`, boxShadow: "0px 2px 20px 0px rgba(0,0,0,0.5)" 
                        , width: "auto", height: "150px", borderRadius: "0 50px 0 0" }}>
                            <p style={{marginLeft:"10px", marginTop:"10px", marginBottom:"0px", color: `rgb(${color[0].toString()}`}}><b>Now Playing:</b></p>
                        <div style={{ marginLeft: "20px", marginTop: "5px", display: "flex" }}>
                            <Image key={`Image${0}`} src={song.item.album.images[0].url}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "0px",
                                    boxShadow: "0px 2px 20px 0px rgba(0,0,0,0.5)",
                                    transition: "0.5s"
                                }} />
                            <div style={{ flexGrow: "1", marginLeft: "10px", maxWidth:"68%"  }}>
                                <div className="scrolling-title-container">
                                <span className={"scrolling-title"} style={{ marginTop: "25px", marginBottom:"5px" , color: `rgb(${color[0].toString()}`}}><b>{song.item.name}</b></span>
                                </div>
                                <p style={{ marginTop: "-7px", color: `rgb(${color[0].toString()}`, fontSize: "0.8em", whiteSpace: "nowrap",overflow: "hidden",textOverflow: "ellipsis"
                                 }}>{song.item.artists.map((artist, i) => <span key={`playlist-${artist.name}`} >{artist.name}{i < song.item.artists.length - 1 && ', '}</span>)}</p>
                                <ProgressBar now={progress} variant='success' style={{ color:`rgb(${color[3].toString()}`, boxShadow: "0px 2px 20px 0px rgba(0,0,0,0.5)", height: "5px", marginRight: "10px", marginTop: "-10px"}} />
                                <div style={{ display: "flex", marginTop:"5px", fontSize: "0.8em", color: `rgb(${color[0].toString()}` }}>
                                    <p style={{ flex: 1, }}>{convertMsToMmSs(song.progress_ms + timeElapsed)}</p>
                                    <p style={{ marginRight: "10px" }}>-{convertMsToMmSs(song.item.duration_ms - (song.progress_ms + timeElapsed - 1000))}</p>
                                </div>
                                
                            </div>
                            
                        </div>
                        </div>
                        
                    </>)}
            </>) : (<>
                <p></p>
                <p style={{ textAlign: "center" }}>Make sure you have a device playing spotify</p>
            </>)
            }
        </>
    );
}


