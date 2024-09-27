import { QRCodeSVG } from "qrcode.react";

export default function QRCodeGenerator() {

    const currentURL = window.location.href

    return (
        <>
            <div style={{ marginTop: '20px' }}>
                {<QRCodeSVG value={currentURL} />}
            </div>
        </>
    );
}