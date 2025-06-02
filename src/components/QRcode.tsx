import { JSX } from "react";
import containerImg from "../assets/img/qrCodeContainer.svg";
import { QRCodeSVG } from "qrcode.react";

import { Container, Typography } from "@mui/material";

/**
 * Props for the QRcode component.
 */
interface QRcodeProps {
    description: string;
    qrContent: string;
    qrCode?: JSX.Element;
}

/**
 * QRcode component renders a QR code inside a styled container with a description.
 * It uses QRCodeSVG from 'qrcode.react' and supports custom QR code elements.
 */
export const QRcode = ({ description, qrContent, qrCode }: QRcodeProps) => {
    const defaultQR = (
        <QRCodeSVG
            value={qrContent}
            size={256} // SVG size
            level="Q" // Error correction level (L, M, Q, H)
            bgColor="#ffffff"
            fgColor="#000000"
        />
    );
    const qrImage = qrCode || defaultQR;

    return (
        <Container
            className="qr-container"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Center horizontally
                gap: 2, // Gap between elements
                width: "100%",
                maxWidth: "25vw !important",
            }}
        >
            <div
                style={{
                    backgroundImage: `url(${containerImg})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                    minWidth: "80px",
                }}
            >
                {qrImage}
            </div>

            {/* Description below the container */}
            <Typography variant="body1" textAlign="center">
                {description}
            </Typography>
        </Container>
    );
};
