import { Offcanvas } from "react-bootstrap";
import CurrentlyPlaying from "./CurrentlyPlaying";

import QueuedSongs from "./QueuedSongs";

export default function NavMenu({ song, queuedSongs, color }) {

    return (
        <>
            <Offcanvas.Header closeButton style={{ marginBottom: "-48px", marginRight: "10px", zIndex: "99999" }} />
            <CurrentlyPlaying song={song} color={color} />
            <Offcanvas.Body style={{ background: `rgba(${color[0].toString()})` }}>
                {song.item !== undefined ? (<div style={{ color: `rgba(${color[4].toString()})` }}>
                    <span>Up next (Top 20):</span>
                </div>) : (<></>)}
                <QueuedSongs queuedSongs={queuedSongs} color={color} />
            </Offcanvas.Body>
        </>
    )
};


