import QueuedSongsTutorial from "./QueuedSongsTutorial";

export default function QueuedSongs({ queuedSongs, color }) {

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

    return (
        <>
            {Array.isArray(queuedSongs) ? (
                queuedSongs.filter((song, i, arr) => i === 0 || song.name !== arr[i - 1].name).map((songs, i) => {
                    return (
                        <section className="playlist-section" key={`QueueSongInfo${i}`}>
                            <div className="playlist-item">
                                <img src={songs.album.images[0].url} alt="Playlist" className="playlist-image" />
                                <div className="playlist-details">
                                    <p className="playlist-title">{songs.name}</p>
                                    <p className="playlist-artist">{songs.artists.map((artist, i) => <span key={`playlist-${artist.name}`} >{artist.name}{i < songs.artists.length - 1 && ', '}</span>)}</p>
                                </div>
                                <p className="playlist-duration">{convertMsToMmSs(songs.duration_ms)}</p>
                            </div>
                        </section>
                    );
                })
            ) : (
                <QueuedSongsTutorial />
            )}
        </>
    )
}