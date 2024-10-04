import { QRCodeSVG } from "qrcode.react";

export default function QRCodeGenerator() {

    const currentURL = window.location.href

    return (
        <>
            <div>
                {<QRCodeSVG style={{border: '3px solid white', boxShadow:"0px 2px 5px 0px rgba(0,0,0,0.5)" }} size={"10em"} value={currentURL} />}
            </div>
        </>
    );
}