import React, { useState, useEffect, useRef } from 'react';
import jsQR from 'jsqr';

/**
 * If I need to test camera's again
 * package.json 'start' : "HTTPS=true SSL_CRT_FILE=./localhost.pem SSL_KEY_FILE=./localhost-key.pem react-scripts start"
 * > mkcert localhost
 */
// If I need to test camera's again

const CameraComponent = () => {
    const [hasError, setHasError] = useState(false);
    const videoRef = useRef(null);  // Reference to the video element
    const streamRef = useRef(null);  // Reference to store the media stream
    const canvasRef = useRef(null);


    useEffect(() => {
        // Function to get the video stream
        const getCameraStream = async () => {
            try {
                // Request access to the camera
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: { ideal: 'environment' } }
                });

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
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    useEffect(() => {

        const interval = setInterval(() => {
            if (!videoRef.current || !canvasRef.current) return;

            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            if (video.videoWidth === 0 || video.videoHeight === 0) {
                console.log('Video dimensions are not available yet');
                return;
            }

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
                const text = code.data;
                console.log('QR Code found:', text);

                if (text.startsWith('http')) {
                    window.location.href = text;
                    window.location.reload();
                }

                clearInterval(interval); // Stop scanning after a successful scan
            }
        }, 500);
        return () => clearInterval(interval);
    }, []);

    if (hasError) {
        return <p>There was an error accessing the camera.</p>;
    }

    return (
        <div>
            <video ref={videoRef} autoPlay muted playsInline></video>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default CameraComponent;
