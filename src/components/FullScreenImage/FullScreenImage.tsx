
import styles from "./fullScreenImage.module.css"
import { useShowFullScreen } from "../../context/ShowFullScreen";
import { Box, Button } from "@mui/material";

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { CloseFullscreen } from "@mui/icons-material";


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
            <Box className={`${"not-active-full-screen"}`} sx={{ display: "flex" }} >
                {children}
                <Button onClick={handleShowFullScreen}>
                    {<FullscreenIcon />}
                </Button>
            </Box>

            {showFullScreen && (
                <div
                    className={`${styles['fullscreen-overlay']} ${styles['active']}`}
                >
                    <div className={`${styles["fullscreen-image"]}`}>
                        <Box sx={{ display: "flex" }}>
                            {children}
                            <Button onClick = { handleCloseFullScreen }>
                                {<CloseFullscreen />}
                            </Button>
                        </Box>
                    </div>
                </div>
            )}
        </div>
    );
};
