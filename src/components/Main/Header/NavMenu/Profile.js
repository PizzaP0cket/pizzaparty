import { useState } from 'react';
import { Image, Offcanvas, Button } from "react-bootstrap";
import Authentication from '../../../../utils/auth';
import QRCode from '../../../../utils/QRCode';

export default function Profile({ profileInfo }) {

    const [login, setLoggedIn] = useState(false);
    const [code, setQRCode] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true); // This will trigger Authentication redirection
    };

    const handleQRCode = () => {
        setQRCode(true); // This will trigger Authentication redirection
    };

    return (
        <>
            <div className="profile-container">
                <header className="profile-header">
                    {profileInfo.images && profileInfo.images.length > 0 ? (<Image key={`Image${0}`} src={profileInfo.images[1].url} alt="Profile" className="profile-avatar" />) : (<img src="https://via.placeholder.com/150" alt="Profile" className="profile-avatar" />)}
                    <div className="profile-info">
                        <h2 className="profile-name">{!profileInfo.display_name ? ('Please Sign in') : (profileInfo.display_name)}</h2>
                        {!login ? (<Button variant='success' size='sm' onClick={handleLogin}>Sign in</Button>) : (<Authentication />)}
                        {!code ? (<Button variant='success' size='sm' onClick={handleQRCode}>QRCode</Button>) : (<QRCode />)}
                    </div>
                    <Offcanvas.Header closeButton>
                    </Offcanvas.Header>
                </header>
            </div>
        </>
    );
}