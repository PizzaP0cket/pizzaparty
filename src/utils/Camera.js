import React, { useState, useEffect, useRef } from 'react';
import jsQR from 'jsqr';

const CameraComponent = () => {
    const [hasError, setHasError] = useState(false);
    const videoRef = useRef(null);  // Reference to the video element
    const streamRef = useRef(null);  // Reference to store the media stream

    useEffect(() => {
        // Function to get the video stream
        const getCameraStream = async () => {
            try {
                // Request access to the camera
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });

                // Attach the stream to the video element
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }

                // Save the stream reference for cleanup later
                streamRef.current = stream;
            } catch (err) {
                console.error('Error accessing camera: ', err);
                setHasError(true);
            }
        };

        getCameraStream();

        // Cleanup function to stop the stream when the component unmounts
        return () => {
            if (streamRef.current) {
                const tracks = streamRef.current.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    if (hasError) {
        return <p>There was an error accessing the camera.</p>;
    }

    return (
        <div>
            <video ref={videoRef} autoPlay muted></video>
        </div>
    );
};

export default CameraComponent;
