import { useCallback } from "react";
import { ImageDimensions } from "./GameImage";
import { Coordinates } from "../../interfaces/coordinates";

/**
 * Props for the BoxAreaOnImage component.
 */
interface BoxAreaOnImageProps {
    imageDimensions: ImageDimensions;
    coordinates: Coordinates;
    drawAreaCondition: boolean;
    boxColor?: string;
}

/**
 * Calculates the style for the box area on the image based on coordinates and image dimensions.
 * @param props - BoxAreaOnImageProps
 * @returns Style object or undefined if drawAreaCondition is false.
 */
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

/**
 * BoxAreaOnImage component renders a styled box overlay on an image to highlight an area.
 * It displays the coordinates as a label above the box.
 */
export const BoxAreaOnImage = ({ coordinates, imageDimensions, drawAreaCondition, boxColor }: BoxAreaOnImageProps) => {
    const memoGetArea = useCallback(() =>
        getAreaStyle({ coordinates, imageDimensions, drawAreaCondition })
    , [coordinates, imageDimensions, drawAreaCondition]);

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
};
