
export default function Soundwave({ color, currentSong }) {

    const specialSongs = ['Axel F', 'All Star', 'Gimme! Gimme! Gimme! (A Man After Midnight)']
    const numBars = 16; //Total number of bars


    if (specialSongs.includes(currentSong.name)) {
        return (
            <div className="soundwave" >
                {Array.from({ length: numBars }).map((_, index) => {
                    // Calculate a color for each bar based on its index
                    const hue = (index / numBars) * 360; // Scale index to a hue value
                    return (
                        <div
                            key={index}
                            className="bar"
                            style={{ background: `hsl(${hue}, 100%, 50%)` }}
                        ></div>
                    );
                })}
            </div>
        );
    } else {
        return (
            <div className="soundwave" >
                {Array.from({ length: numBars }).map((_, index) => {
                    return (
                        <div
                            key={index}
                            className="bar"
                            style={{ background: `rgb(${color[2].toString()}` }}
                        ></div>
                    );
                })}
            </div>
        );
    }
}
