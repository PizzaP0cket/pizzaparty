import { Carousel, Button, Spinner, Placeholder } from "react-bootstrap";
import PlaceHolder from 'react-bootstrap/Placeholder';

export default function Tutorial({ color }) {

    return (
        <>
            <Carousel data-bs-theme="dark" style={{ height: "95vh" }}>
                <Carousel.Item style={{ textAlign: "center" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
                    </svg>
                    <p></p>
                    <p>Use the searchbar to find songs you want to add</p>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="track-item">
                        <Button className="track-image" alt="track-album" variant="dark" disabled>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        </Button>
                        <div className="track-details">
                            <Placeholder style={{ width: "100%" }} bg='dark'>Loading...</Placeholder>
                            <p className="Placeholder-artist">
                                <PlaceHolder bg="" style={{ background: `rgb(${color[2].toString()}` }}>........</PlaceHolder>
                            </p>
                        </div>
                        <Button style={{ background: `rgb(${color[2].toString()}`, borderColor: `rgb(${color[2].toString()}` }} disabled>+</Button>
                    </div>
                    <div style={{ textAlign: 'right', marginRight: '10px' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
                        </svg>
                    </div>
                    <p></p>
                    <div style={{ textAlign: "center" }}>
                        <p>Click on the [ + ] button to add songs to the queue</p>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div style={{ marginLeft: "10px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
                        </svg>
                        <p></p>
                        <p style={{ textAlign: "center", margin: "0 5px 0 " }}>Use the menu to view currently playing and queued songs</p>


                        <p></p>

                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div style={{ alignItems: "center", justifyContent: 'center', textAlign: "center", display: "flex", flexDirection: "column", marginLeft:"10px", marginRight:"10px" }}>
                        <p>🔓</p>
                        <p>Log in to Spotify to start the party!</p>
                        <p>✅</p>
                        <p><b>The logged-in user needs Spotify Premium; others can join without an account.</b></p>
                        <p>After signing in, copy your URL to share with friends or create a QRCode for them</p>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                            <p style={{ backgroundImage: `linear-gradient(160deg, rgba(${color[2].toString()},1) 0%, rgba(${color[4].toString()},1) 100%)`, color: `rgb(${color[0].toString()})`, zIndex: "2", height: "auto", width: "62px", borderRadius: "15%", paddingLeft: "10px", paddingRight: "10px", paddingTop: "2px", paddingBottom: "2px", boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.5)", textAlign: "center" }}>60:00</p>
                        </div>
                        <p>In the menu you will see a countdown, this is how much time is remaining before the shared link expires</p>
                        <p>🎶</p>
                        <p>Ensure you're playing Spotify on your device to see songs in your queue</p>
                        <p>🎉</p>
                        <p>Enjoy!</p>
                    </div>


                </Carousel.Item>
                {/*  Issue with ColorMind API connecting to GitHub
                <Carousel.Item>
                        <div style={{ textAlign: "center", margin: "100px 5px 0 " }}>
                            <p >Not a fan of the colour scheme?</p>
                            <p>Refresh the page and get a new one!</p>
                            {Array.from({ length: 5 }).map((_, index) => {
                                return (
                                    <p key={index} style={{ backgroundColor:`rgb(${color[index].toString()}`, color:`rgb(${color[index].toString()}`, margin:"0 35%"}}>.</p>
                                );
                            })}
                        </div>
                </Carousel.Item> */}
            </Carousel>
        </>
    )
};