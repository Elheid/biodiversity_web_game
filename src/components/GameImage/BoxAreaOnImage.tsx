import { useCallback } from "react";
import { ImageDimensions } from "./GameImage";
import { Coordinates } from "../../interfaces/coordinates";

interface BoxAreaOnImageProps {
    imageDimensions: ImageDimensions,
    coordinates: Coordinates;
    drawAreaCondition: boolean;
    boxColor?:string;
}

const getAreaStyle = ({ coordinates, imageDimensions, drawAreaCondition }: BoxAreaOnImageProps) => {
    if (!drawAreaCondition) return;

    const scaleX = imageDimensions.naturalWidth / imageDimensions.displayWidth;
    const scaleY = imageDimensions.naturalHeight / imageDimensions.displayHeight;

    return {
        left: coordinates.x / scaleX,
        top: coordinates.y / scaleY,
        width: coordinates.width / scaleX,
        height: coordinates.height / scaleY,
    };
};


export const BoxAreaOnImage = ({ coordinates, imageDimensions, drawAreaCondition, boxColor }: BoxAreaOnImageProps) => {
    const memoGetArea = useCallback(() =>
        getAreaStyle({ coordinates, imageDimensions, drawAreaCondition })
    , [coordinates, imageDimensions, drawAreaCondition])

    return (
        <div
            style={{
                position: 'absolute',
                border: `2px solid ${boxColor || 'rgba(190, 190, 190, 0.5)'}`,
                ...memoGetArea(),
                pointerEvents: 'none',
                boxSizing: 'border-box',
                transition: 'all 0.3s',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    bottom: '100%',
                    background: 'rgba(190, 190, 190, 0.5)',
                    color: 'white',
                    padding: 4,
                    fontSize: 12,
                    whiteSpace: 'nowrap',
                }}
            >
                {`x: ${coordinates.x}, y: ${coordinates.y}, w: ${coordinates.width}, h: ${coordinates.height}`}
            </div>
        </div>
    );
}