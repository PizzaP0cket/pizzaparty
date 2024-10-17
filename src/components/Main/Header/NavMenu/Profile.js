import { useState } from 'react';
import { Image, Button } from "react-bootstrap";
import Authentication from '../../../../utils/auth';
import QRCode from '../../../../utils/QRCode';

export default function Profile({ profileInfo, color }) {
    const [login, setLoggedIn] = useState(false);
    const [code, setQRCode] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true); // This will trigger Authentication redirection
    };

    const handleQRCode = () => {
        setQRCode(!code); // This will trigger Authentication redirection
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    return (
        <>
            <div className='profileMenu'>
                <h2 className="profile-name" style={{ color: `rgb(${color[0].toString()}`, backgroundColor: `rgb(${color[2].toString()}` }}>
                    {!profileInfo.display_name ? ('Please Sign in') : (<b>{profileInfo.display_name}</b>)}
                </h2>
                <div className="wrapper">
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className='checkBox' />
                    {profileInfo.images && profileInfo.images.length > 0 ? (
                        <Image key={`Image${0}`} src={profileInfo.images[1].url} alt="Profile" className="profile-avatar" style={{ backgroundColor: `rgb(${color[2].toString()}` }} />
                    ) : (
                        <button disabled alt="Profile" className="profile-avatar" style={{ backgroundColor: `rgb(${color[2].toString()}` }}></button>
                    )}
                    <div className={isChecked ? 'fac' : 'disavled-fac'}>
                        {!login ? (
                            <Button
                                className='profileUI'
                                style={{
                                    backgroundImage: `linear-gradient(180deg, rgba(${color[2].toString()},1) 0%, rgba(${color[3].toString()},1) 100%)`,
                                    color: `rgb(${color[0].toString()})`
                                }}
                                disabled={!isChecked}
                                hidden={!isChecked}
                                onClick={handleLogin}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-fill-check" viewBox="0 0 16 16">
                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                    <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                </svg>
                            </Button>
                        ) : (
                            <>
                                <Button
                                    className='profileUI'
                                    style={{
                                        backgroundImage: `linear-gradient(180deg, rgba(${color[2].toString()},1) 0%, rgba(${color[3].toString()},1) 100%)`,
                                        color: `rgb(${color[0].toString()})`
                                    }}
                                    onClick={handleLogin}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-fill-check" viewBox="0 0 16 16">
                                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                        <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                                    </svg>
                                </Button>
                                <Authentication />
                            </>
                        )}
                        <Button
                            className='profileUI'
                            style={{
                                backgroundImage: `linear-gradient(180deg, rgba(${color[2].toString()},1) 0%, rgba(${color[3].toString()},1) 100%)`,
                                color: `rgb(${color[0].toString()})`
                            }}
                            disabled={!isChecked}
                            hidden={!isChecked}
                            onClick={() => { handleQRCode(); setIsChecked(false); }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-qr-code" viewBox="0 0 16 16">
                                <path d="M2 2h2v2H2z" />
                                <path d="M6 0v6H0V0zM5 1H1v4h4zM4 12H2v2h2z" />
                                <path d="M6 10v6H0v-6zm-5 1v4h4v-4zm11-9h2v2h-2z" />
                                <path d="M10 0v6h6V0zm5 1v4h-4V1zM8 1V0h1v2H8v2H7V1zm0 5V4h1v2zM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8zm0 0v1H2V8H1v1H0V7h3v1zm10 1h-1V7h1zm-1 0h-1v2h2v-1h-1zm-4 0h2v1h-1v1h-1zm2 3v-1h-1v1h-1v1H9v1h3v-2zm0 0h3v1h-2v1h-1zm-4-1v1h1v-2H7v1z" />
                                <path d="M7 12h1v3h4v1H7zm9 2v2h-3v-1h2v-1z" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
            {code && (
                <>
                    <div className="overlay">
                        <div className="QRcode">
                            <QRCode className="centered-image" color={color} />
                            <Button className="qrcodeExit" style={{ backgroundColor: `rgb(${color[2].toString()}`, }} onClick={() => { handleQRCode(); }}>X</Button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
