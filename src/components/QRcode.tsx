import { JSX } from "react"
import containerImg from "../assets/img/qrCodeContainer.svg"
import { QRCodeSVG } from "qrcode.react";

import { Container, Typography } from "@mui/material"
/*
export const QRcode = ( {description, qrCode}:{description:string, qrCode?:JSX.Element})=>{
    const qrImage = qrCode ? qrCode : <img src={testQR}/>
    return (
        <Container className="qr-container" sx={{display:"flex", flexDirection:"column"}}>
        <img src={containerImg}/>
        {qrImage}
        {description}
        </Container>
    )
}*/

export const QRcode = ({
    description,
    qrCode,
}: {
    description: string;
    qrCode?: JSX.Element;
}) => {
    const defaultQR = (
        <QRCodeSVG
            value="Тестовый код"
            size={256} // Размер SVG
            level="Q" // Уровень коррекции ошибок (L, M, Q, H)
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
                alignItems: "center", // Центрирование по горизонтали
                gap: 2, // Отступ между элементами
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
                    minWidth: "80px"
                }}
            >
                {qrImage}
            </div>

            {/* Описание под контейнером */}
            <Typography variant="body1" textAlign="center">
                {description}
            </Typography>
        </Container>
    );
};
