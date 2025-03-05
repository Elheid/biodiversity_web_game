import { useState } from "react";

export const useImageDimensions = () => {
    const [dimensions, setDimensions] = useState<{
        displayWidth: number;
        displayHeight: number;
        naturalWidth: number;
        naturalHeight: number;
    } | null>(null);

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        const img = event.currentTarget;
        setDimensions({
            displayWidth: img.width,
            displayHeight: img.height,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
        });
    };

    return {
        dimensions,
        handleImageLoad,
        scaleX: dimensions ? dimensions.naturalWidth / dimensions.displayWidth : 1,
        scaleY: dimensions ? dimensions.naturalHeight / dimensions.displayHeight : 1,
    };
};
