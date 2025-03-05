// hooks/useClickDetection.ts

import { Game } from "../classes/game";
import { Coordinates } from "../components/GameImage";
import { useImageDimensions } from "./useImageDimensions";


export const useClickDetection = (
    game: Game | undefined,
    dimensions: ReturnType<typeof useImageDimensions>['dimensions'],
    coordinates: Coordinates,
    setButtonsDisabled: (disabled: boolean) => void
) => {
    const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
        if (!game || !dimensions || game.isThisSecondType()) return;

        const img = event.currentTarget;
        const rect = img.getBoundingClientRect();

        const scaleX = dimensions.naturalWidth / rect.width;
        const scaleY = dimensions.naturalHeight / rect.height;

        const clickX = (event.clientX - rect.left) * scaleX;
        const clickY = (event.clientY - rect.top) * scaleY;

        if (
            clickX >= coordinates.x &&
            clickX <= coordinates.x + coordinates.width &&
            clickY >= coordinates.y &&
            clickY <= coordinates.y + coordinates.height
        ) {
            setButtonsDisabled(false);
            game.changePictureToResult();
        }
    };

    return { handleImageClick };
};