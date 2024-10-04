import { Offcanvas } from "react-bootstrap";
import CurrentlyPlaying from "./CurrentlyPlaying";
import QueuedSongs from "./QueuedSongs";

export default function NavMenu({ song, queuedSongs, color }) {

    return (
        <> 
            <Offcanvas.Header closeButton style={{marginBottom:"-48px", marginRight:"10px", zIndex:"99999"}} />
            <CurrentlyPlaying song={song} color={color} />
            {song.item !== undefined ? ( <div style={{ marginBottom:"-15px", zIndex:1, background: `linear-gradient(2.5deg, rgba(${color[1].toString()},1) 0%, rgba(${color[4].toString()},1) 100%)`, color:`rgba(${color[0].toString()})`, borderRadius:"0 0 15px 15px"}}>
            <span style={{ marginLeft:"15px" }}>Up next (Top 20):</span>
            </div>):(<></>)}
            <Offcanvas.Body style={{ background: `rgba(${color[0].toString()})`}}>
                <QueuedSongs queuedSongs={queuedSongs} color={color} />
            </Offcanvas.Body>
        </>
    )
};