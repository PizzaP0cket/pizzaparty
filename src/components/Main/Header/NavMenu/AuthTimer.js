
export default function AuthTimer({ color }) {

    const now = new Date();
    const timeFromUrl = window.location.href.split('=3600')[1];

    function convertTime() {

        const time = 3600 - Math.floor((parseInt((now.getTime() - timeFromUrl), 10)) / 1000)
        const minutes = Math.floor(time / 60) % 60
        const seconds = Math.floor(time) % 60

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        if (time <= 0) {
            return '00:00'
        } else {
            return `${formattedMinutes}:${formattedSeconds}`;
        }
    }

    return (<>
        <span style={{ color: `rgb(${color[0].toString()}` }}>{convertTime()}</span>
    </>)
}
