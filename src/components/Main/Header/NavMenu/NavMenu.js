import { Offcanvas } from "react-bootstrap";
import CurrentlyPlaying from "./CurrentlyPlaying";
import Profile from "./Profile";
import QueuedSongs from "./QueuedSongs";

export default function NavMenu({ song, profileInfo, queuedSongs }) {

    return (
        <>
            <Profile profileInfo={profileInfo} />
            <Offcanvas.Body>
                <CurrentlyPlaying song={song} />
                <QueuedSongs queuedSongs={queuedSongs} />
            </Offcanvas.Body>
        </>
    )
};