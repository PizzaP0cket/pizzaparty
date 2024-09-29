import { Carousel } from "react-bootstrap";

export default function QueuedSongsTutorial() {

    return (
        <>
            <Carousel data-bs-theme="dark" style={{height:"95vh"}} >
                <Carousel.Item>
                        <div style={{ marginLeft: "70px" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
                            </svg>
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
                <Carousel.Item style={{ textAlign: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
                        </svg>
                        <p></p>
                        <p>Generate a QRCode and share it with your friends to join the party!</p>
                        <p>They will also be able to generate a QRCode to pass around</p>
                </Carousel.Item>
            </Carousel>
        </>
    )
};