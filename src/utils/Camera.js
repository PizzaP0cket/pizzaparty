import React, { useState, useEffect, useRef } from 'react';
import jsQR from 'jsqr';

const CameraComponent = () => {
    const [hasError, setHasError] = useState(false);
    const videoRef = useRef(null);  // Reference to the video element
    const streamRef = useRef(null);  // Reference to store the media stream
    const [hasCamera, setHasCamera] = useState(false); // Flag to check if camera is available
    const [videoLoaded, setVideoLoaded] = useState(false); // To track when video dimensions are ready

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
                setHasCamera(true); // Camera is available
            } catch (err) {
                console.error('Error accessing camera:', err);
                setHasError(true);
            }
        };

        getCameraStream();

        // Cleanup function to stop the stream when the component unmounts
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    const handleVideoLoad = () => {
        // Once the video is loaded, set the videoLoaded flag to true
        setVideoLoaded(true);
    };

    if (hasError) {
        return <p>Could not access the camera.</p>;
    }

    if (!hasCamera) {
        return <p>No camera found or permission denied. Please ensure the device has a camera.</p>;
    }

    return (
        <div>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ width: '100%' }}
                onLoadedMetadata={handleVideoLoad} // Trigger when video metadata is loaded
            />
        </div>
    );
};

export default CameraComponent;
