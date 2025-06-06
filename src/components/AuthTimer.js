import { useState, useEffect } from 'react';

export default function AuthTimer() {
    // Get the current time and the time from URL
    const now = new Date();
    const timeFromUrl = window.location.href.split('=3600')[1];

    // Initial time calculation
    const initialTime = 3600 - Math.floor((parseInt(now.getTime() - timeFromUrl, 10)) / 1000);

    // State to store the remaining time
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        // Set up an interval to update the countdown every second
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer); // Stop the timer when the countdown reaches 0
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        // Cleanup the interval when the component is unmounted
        return () => clearInterval(timer);
    }, []);

    // Function to format the time (minutes:seconds)
    function convertTime() {
        const minutes = Math.floor(timeLeft / 60) % 60;
        const seconds = timeLeft % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        // If time is up, return '00:00'
        if (timeLeft <= 0) {
            window.local.href = window.location.href.split("#")[0]
            return '00:00';
        } else {
            return `${formattedMinutes}:${formattedSeconds}`;
        }
    }

    return (
        <>
            <span>{convertTime()}</span>
        </>
    );
}
