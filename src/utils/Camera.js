import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';

const QRScanner = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const [hasError, setHasError] = useState(false);
    const [hasCamera, setHasCamera] = useState(false); // Flag to check if camera is available
    const [videoLoaded, setVideoLoaded] = useState(false); // To track when video dimensions are ready

    useEffect(() => {
        const getCameraStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: { ideal: 'environment' } }
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                streamRef.current = stream;
                setHasCamera(true); // Camera is available
            } catch (err) {
                console.error('Error accessing camera:', err);
                setHasError(true);
            }
        };

        getCameraStream();

        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    useEffect(() => {
        if (!hasCamera || !videoLoaded) return;

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
                }

                clearInterval(interval); // Stop scanning after a successful scan
            }
        }, 500);

        return () => clearInterval(interval);
    }, [hasCamera, videoLoaded]);

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
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default QRScanner;
