import { Offcanvas } from "react-bootstrap";
import CurrentlyPlaying from "./CurrentlyPlaying";
import Profile from "./Profile";
import QueuedSongs from "./QueuedSongs";

export default function NavMenu({ song, profileInfo, queuedSongs, color }) {

    return (
        <>
            <Profile profileInfo={profileInfo} color={color} />
            <Offcanvas.Body style={{background:`rgb(${color[0].toString()}`}}>
                <CurrentlyPlaying song={song} color={color} />
                <QueuedSongs queuedSongs={queuedSongs} color={color}/>
            </Offcanvas.Body>
        </>
    )
};