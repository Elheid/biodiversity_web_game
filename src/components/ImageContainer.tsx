// ImageContainer.tsx
import { Skeleton } from "@mui/material";
import { ShowFullScreenProvider } from "../context/ShowFullScreen";
import { GameImage } from "./GameImage/GameImage";
import React, { forwardRef, useState, useEffect } from "react";
import { Game } from "../classes/game";

interface ImageContainerProps {
    game: Game | undefined;
}

export const ImageContainer = forwardRef<HTMLImageElement, ImageContainerProps>(
    ({ game }, ref) => {
        const [isImageLoaded, setIsImageLoaded] = useState(false);

        // Сбрасываем состояние загрузки при смене игры
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
                    {<Skeleton
                        width={"calc(100% - 10%)"} // 100% родителя минус 5% с каждой стороны
                        height={"calc(100% - 10%)"}
                        sx={{
                            display: isImageLoaded ? "none" : "block",
                            transition: "opacity 0.3s ease-out",
                            opacity: isImageLoaded ? 0 : 1,
                            // Фиксируем соотношение сторон как у изображения
                            aspectRatio: "16/9", // Пример для 711.672×407.312 ≈ 16:9
                            position: "absolute", // Чтобы скелетон не влиял на поток
                            top: "5%",
                            left: "5%"
                        }}
                    />}
                </div>
            </div>
        );
    }
);