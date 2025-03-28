
import styles from "./fullScreenImage.module.css"
import { useShowFullScreen } from "../../context/ShowFullScreen";
import { Box, Button } from "@mui/material";

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { CloseFullscreen } from "@mui/icons-material";

interface ImageBoxProps {
    className?: string;
    typeOfButton:"show"|"close";
    onClick:()=>void;
}

const ImageBox: React.FC<React.PropsWithChildren & ImageBoxProps> = ({ className, typeOfButton, onClick ,children }) => {
    return (
        <Box className={className} sx={{ display: "flex" }}>
            {children}
            <Button className="fullscreen-button"
            onClick={onClick}
            >
                {typeOfButton === "show" ? <FullscreenIcon /> : <CloseFullscreen />}
            </Button>
        </Box>

    )
}

export const FullScreenImage: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { showFullScreen, setShowFullScreen } = useShowFullScreen();

    const handleShowFullScreen = () => {
        setShowFullScreen(true);
    };

    const handleCloseFullScreen = () => {
        setShowFullScreen(false);
    };

    //{`${!showFullScreen && "not-active-full-screen"}`}
    return (
        <div className={styles["container"]}>
            <ImageBox className={`${"not-active-full-screen"}`} typeOfButton={"show"} onClick={handleShowFullScreen}>
                {children}
            </ImageBox>
            {showFullScreen && (
                <div
                    className={`${styles['fullscreen-overlay']} ${styles['active']}`}
                >
                    <div className={`${styles["fullscreen-image"]}`}>
                        <ImageBox onClick={handleCloseFullScreen} typeOfButton={"close"}>
                            {children}
                        </ImageBox>
                    </div>
                </div>
            )}
        </div>
    );
};
