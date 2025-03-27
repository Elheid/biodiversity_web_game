import { Skeleton } from "@mui/material";
import { ShowFullScreenProvider } from "../context/ShowFullScreen";
import { GameImage } from "./GameImage/GameImage";
import React, { forwardRef } from "react";
import { Game } from "../classes/game";

interface ImageContainerProps {
    game: Game | undefined;
}

export const ImageContainer = forwardRef<HTMLImageElement, ImageContainerProps>(
    ({ game }, ref) => {
        /*Boolean(
                                (ref as React.RefObject<HTMLImageElement>)?.current?.src?.trim()
                            )*/
        return (
            <div className="image-container">
                <div className="main-image">
                    <ShowFullScreenProvider>
                        <GameImage 
                            isVisible={true} 
                            ref={ref} 
                            game={game} 
                        />
                    </ShowFullScreenProvider>
                    
                    {<Skeleton 
                        width={"40vw"} 
                        height={"30vh"}  
                        sx={{ 
                            display: (ref as React.RefObject<HTMLImageElement>)?.current?.src?.trim() 
                                ? "none" 
                                : "" 
                        }}
                    />}
                </div>
            </div>
        );
    }
);

// Для отображения имени компонента в DevTools
ImageContainer.displayName = "ImageContainer";