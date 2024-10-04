import { Carousel } from "react-bootstrap";

export default function QueuedSongsTutorial() {

    return (
        <>
            <Carousel data-bs-theme="dark" style={{height:"100vh"}} >
                <Carousel.Item>
                        <div style={{ marginTop: "30px" }}>
                        </div>
                        <p style={{ textAlign: "center" }}>🔓</p>
                        <p style={{ textAlign: "center" }}>Log in to Spotify to start the party!</p>
                        <p style={{textAlign:"center"}}>✅</p>
                        <p style={{ textAlign: "center" }}><b>The logged-in user needs Spotify Premium; others can join without an account.</b></p>
                        <p style={{ textAlign: "center" }}>After signing in, copy your URL to share with friends or create a QRCode for them</p>
                        <p style={{ textAlign: "center" }}>🎶</p>
                        <p style={{ textAlign: "center" }}>Ensure you're playing Spotify on your device to see songs in your queue</p>
                        <p style={{textAlign:"center"}}>🎉</p>
                        <p style={{textAlign:"center"}}>Enjoy!</p>

                </Carousel.Item>
                <Carousel.Item style={{ textAlign: "center", marginTop:"30px" }}>
                        <p></p>
                        <p>Generate a QRCode and share it with your friends to join the party!</p>
                        <p>They will also be able to generate a QRCode to pass around</p>
                </Carousel.Item>
            </Carousel>
        </>
    )
};