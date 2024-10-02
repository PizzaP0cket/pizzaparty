import { useState } from 'react';
import { Image, Button } from "react-bootstrap";
import Authentication from '../../../../utils/auth';
import QRCode from '../../../../utils/QRCode';

export default function Profile({ profileInfo, color }) {

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
            <div style={{ display: "flex", alignItems: "center" }}>
                <h2 className="profile-name" style={{ color: `rgb(${color[4].toString()}`, backgroundColor: `rgb(${color[1].toString()}` }} >{!profileInfo.display_name ? ('Please Sign in') : (profileInfo.display_name)}</h2>
                <div className="wrapper" >
                    <input type="checkbox" />
                    {profileInfo.images && profileInfo.images.length > 0 ? (<Image key={`Image${0}`} src={profileInfo.images[1].url} alt="Profile" className="profile-avatar" style={{ backgroundColor: `rgb(${color[1].toString()}` }} />) : (<img src="https://via.placeholder.com/150" alt="Profile" className="profile-avatar" style={{ backgroundColor: `rgb(${color[1].toString()}` }} />)}
                    <div className="fac" style={{backgroundColor:`rgb(${color[1].toString()})`}}>
                        {!login ? (<Button style={{ background: "none", border: "none", color: `rgb(${color[0].toString()})` }} onClick={handleLogin}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-door-open" viewBox="0 0 16 16">
                            <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                            <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
                        </svg></Button>) : (<>
                            <Button style={{ background: "none", border: "none", color: `rgb(${color[0].toString()})` }} onClick={handleLogin}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-door-open" viewBox="0 0 16 16">
                                <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1" />
                                <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z" />
                            </svg></Button><Authentication /></>)}
                        {!code ? (<Button style={{ background: "none", border: "none", color: `rgb(${color[0].toString()})` }} onClick={handleQRCode}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-qr-code" viewBox="0 0 16 16">
                            <path d="M2 2h2v2H2z" />
                            <path d="M6 0v6H0V0zM5 1H1v4h4zM4 12H2v2h2z" />
                            <path d="M6 10v6H0v-6zm-5 1v4h4v-4zm11-9h2v2h-2z" />
                            <path d="M10 0v6h6V0zm5 1v4h-4V1zM8 1V0h1v2H8v2H7V1zm0 5V4h1v2zM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8zm0 0v1H2V8H1v1H0V7h3v1zm10 1h-1V7h1zm-1 0h-1v2h2v-1h-1zm-4 0h2v1h-1v1h-1zm2 3v-1h-1v1h-1v1H9v1h3v-2zm0 0h3v1h-2v1h-1zm-4-1v1h1v-2H7v1z" />
                            <path d="M7 12h1v3h4v1H7zm9 2v2h-3v-1h2v-1z" />
                        </svg></Button>) : (
                            <>
                                <Button style={{ background: "none", border: "none", color: `rgb(${color[0].toString()})` }} onClick={handleQRCode}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-qr-code" viewBox="0 0 16 16">
                                    <path d="M2 2h2v2H2z" />
                                    <path d="M6 0v6H0V0zM5 1H1v4h4zM4 12H2v2h2z" />
                                    <path d="M6 10v6H0v-6zm-5 1v4h4v-4zm11-9h2v2h-2z" />
                                    <path d="M10 0v6h6V0zm5 1v4h-4V1zM8 1V0h1v2H8v2H7V1zm0 5V4h1v2zM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8zm0 0v1H2V8H1v1H0V7h3v1zm10 1h-1V7h1zm-1 0h-1v2h2v-1h-1zm-4 0h2v1h-1v1h-1zm2 3v-1h-1v1h-1v1H9v1h3v-2zm0 0h3v1h-2v1h-1zm-4-1v1h1v-2H7v1z" />
                                    <path d="M7 12h1v3h4v1H7zm9 2v2h-3v-1h2v-1z" />
                                </svg></Button>
                            </>
                        )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}


/* <div className="profile-container" style={{ background: `linear-gradient(to bottom right, rgb(${color[2].toString()}), rgb(${color[4].toString()}))`, borderRadius: "0 0 25px 25px" }}>
                <header className="profile-header">
                    <div className="profile-info">
                        <h2 className="profile-name" style={{ color: `rgb(${color[0].toString()}` }} >{!profileInfo.display_name ? ('Please Sign in') : (profileInfo.display_name)}</h2>
                        {!login ? (<Button style={{ background: `rgb(${color[2].toString()})`, border: "0px", marginRight: "6px" }} onClick={handleLogin}>Sign in</Button>) : (<Authentication />)}
                        {!code ? (<Button style={{ background: `rgb(${color[2].toString()})`, border: "0px" }} onClick={handleQRCode}>QRCode</Button>) : (<QRCode />)}
                    </div>
                    <Offcanvas.Header closeButton>
                    </Offcanvas.Header>
                </header>
            </div> */



//     return (
//         <>
//             <div className="profile-container" style={{background: `linear-gradient(to bottom right, rgb(${color[2].toString()}), rgb(${color[4].toString()}))`, borderRadius:"0 0 25px 25px"}}>
//                 <header className="profile-header">
//                     {profileInfo.images && profileInfo.images.length > 0 ? (<Image key={`Image${0}`} src={profileInfo.images[1].url} alt="Profile" className="profile-avatar" />) : (<img src="https://via.placeholder.com/150" alt="Profile" className="profile-avatar" />)}
//                     <div className="profile-info">
//                         <h2 className="profile-name" style={{color:`rgb(${color[0].toString()}`}} >{!profileInfo.display_name ? ('Please Sign in') : (profileInfo.display_name)}</h2>
//                         {!login ? (<Button style={{background: `rgb(${color[2].toString()})`, border:"0px", marginRight:"6px"}} onClick={handleLogin}>Sign in</Button>) : (<Authentication />)}
//                         {!code ? (<Button style={{background: `rgb(${color[2].toString()})`, border:"0px"}} onClick={handleQRCode}>QRCode</Button>) : (<QRCode />)}
//                     </div>
//                     <Offcanvas.Header closeButton>
//                     </Offcanvas.Header>
//                 </header>
//             </div>
//         </>
//     );
// }