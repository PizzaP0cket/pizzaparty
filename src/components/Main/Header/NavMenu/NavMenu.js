import { Offcanvas } from "react-bootstrap";
import CurrentlyPlaying from "./CurrentlyPlaying";
// import Profile from "./Profile";
import QueuedSongs from "./QueuedSongs";

export default function NavMenu({ song, profileInfo, queuedSongs, color }) {

    return (
        <>
            <div style={{backgroundColor: "purple"}}>
            <CurrentlyPlaying song={song} color={color} />
            <Offcanvas.Body style={{ background:`rgb(${color[0].toString()}`, borderRadius:"50px 50px 0px 0px"}}>
                <QueuedSongs queuedSongs={queuedSongs} color={color}/>
            </Offcanvas.Body>
            </div>
        </>
    )
};