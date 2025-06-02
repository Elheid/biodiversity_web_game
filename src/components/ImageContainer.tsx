import { Skeleton } from "@mui/material";
import { ShowFullScreenProvider } from "../context/ShowFullScreen";
import { GameImage } from "./GameImage/GameImage";
import { forwardRef, useState, useEffect } from "react";
import { Game } from "../classes/game";

/**
 * Props for the ImageContainer component.
 */
interface ImageContainerProps {
    game: Game | undefined;
}

/**
 * ImageContainer component renders the main game image with a loading skeleton.
 * It uses ShowFullScreenProvider to manage fullscreen state and forwards ref to GameImage.
 */
export const ImageContainer = forwardRef<HTMLImageElement, ImageContainerProps>(
    ({ game }, ref) => {
        const [isImageLoaded, setIsImageLoaded] = useState(false);

        // Reset image loaded state when game changes
        useEffect(() => {
            setIsImageLoaded(false);
        }, [game]);

        return (
            <div className="image-container">
                <div className="main-image">
                    <ShowFullScreenProvider>
                        <GameImage
                            isVisible={isImageLoaded}
                            ref={ref}
                            game={game}
                            onImageLoad={() => setIsImageLoaded(true)}
                        />
                    </ShowFullScreenProvider>
                    <Skeleton
                        width={"calc(100% - 10%)"} // 100% of parent minus 5% padding each side
                        height={"calc(100% - 10%)"}
                        sx={{
                            display: isImageLoaded ? "none" : "block",
                            transition: "opacity 0.3s ease-out",
                            opacity: isImageLoaded ? 0 : 1,
                            // Maintain aspect ratio similar to image
                            aspectRatio: "16/9", // Example for 711.672×407.312 ≈ 16:9
                            position: "absolute", // Prevent skeleton from affecting layout flow
                            top: "5%",
                            left: "5%",
                        }}
                    />
                </div>
            </div>
        );
    }
);
