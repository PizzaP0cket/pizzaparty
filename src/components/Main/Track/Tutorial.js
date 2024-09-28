import { Carousel, Button, Spinner, Placeholder } from "react-bootstrap";
import PlaceHolder from 'react-bootstrap/Placeholder';

export default function Tutorial() {

    return (
        <>
            <Carousel data-bs-theme="dark">
                <Carousel.Item style={{ textAlign: "center" }}>
                    <div style={{ height: "95vh" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="10%" height="10%" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
                        </svg>
                        <p></p>
                        <p>Use the searchbar to find songs you want to add</p>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div style={{ height: "95vh" }}>
                    <div className="track-item">
                    <Button className="track-image" alt="track-album" variant="dark" disabled>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    </Button>
                    <div className="track-details">
                        <Placeholder style={{ width: "100%" }} bg='dark'>Loading...</Placeholder>
                        <p className="Placeholder-artist">
                            <PlaceHolder bg="success">........</PlaceHolder>
                        </p>
                    </div>
                    <Button variant="outline-success" disabled>+</Button>
                </div>
                <div style={{textAlign:'right', marginRight:'10px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="10%" height="10%" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
                            </svg>
                </div>
                <p></p>
                <div style={{textAlign:"center"}}>
                <p>Click on the [ + ] button to add songs to the queue</p>
                </div>
                    </div>
                </Carousel.Item>
                
                <Carousel.Item>
                    <div style={{ height: "95vh" }}>
                        <div style={{ marginLeft: "10px" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="10%" height="10%" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
                            </svg>
                            <p></p>
                            <p style={{ textAlign: "center", margin: "0 5px 0 " }}>Use the menu to view currently playing and queued songs</p>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
        </>
    )
};