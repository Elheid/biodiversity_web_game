import { forwardRef, ImgHTMLAttributes, useEffect, useState } from "react";
import { Game } from "../classes/game";
import { useDisablButtonContext } from "../context/DisbleButtonsProvider";
import { useRoundEndContext } from "../context/RoundEndProvider";


export interface Coordinates{
    x: number;
    y:number;
    width:number;
    height:number;
}

interface GameImageProps {
    game: Game | undefined;
    coordinates:Coordinates;
}

export const GameImage = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement> & GameImageProps>(({ game, coordinates, ...props }, ref) => {

    const { setButtonsDisabled } = useDisablButtonContext();
    const {isRoundEnd} = useRoundEndContext();

    const [imageDimensions, setImageDimensions] = useState<{
        displayWidth: number;
        displayHeight: number;
        naturalWidth: number;
        naturalHeight: number;
    } | null>(null);


    useEffect(()=>{
        if(game && !isRoundEnd){
            if(game.isThisSecondType()) setButtonsDisabled(false);
        }
    },[game, isRoundEnd]);

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        const img = event.currentTarget;
        setImageDimensions({
            displayWidth: img.width,
            displayHeight: img.height,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
        });
    };
    const {x,y,width,height} = coordinates;

    const onImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
        if ((!game || (game.isThisSecondType()) || !imageDimensions)) return;



        const img = event.currentTarget;
        const rect = img.getBoundingClientRect();

        // Рассчёт масштаба
        const scaleX = imageDimensions.naturalWidth / rect.width;
        const scaleY = imageDimensions.naturalHeight / rect.height;

        // Координаты клика относительно оригинального изображения
        const clickX = (event.clientX - rect.left) * scaleX;
        const clickY = (event.clientY - rect.top) * scaleY;

        // Проверка попадания в целевую область
        if (
            clickX >= x &&
            clickX <= x + width &&
            clickY >= y &&
            clickY <= y + height
        ) {
            setButtonsDisabled(false);
            game.changePictureToResult();
        }
    };

    // Рассчёт позиции и размера прямоугольника для отрисовки
    const getAreaStyle = () => {
        if (!game || !imageDimensions || isRoundEnd) return;

        const scaleX = imageDimensions.naturalWidth / imageDimensions.displayWidth;
        const scaleY = imageDimensions.naturalHeight / imageDimensions.displayHeight;

        return {
            left: x / scaleX,
            top: y / scaleY,
            width: width / scaleX,
            height: height / scaleY,
        };
    };

    useEffect(() => {
        if (ref && typeof ref !== 'function' && ref.current && game) {
            ref.current.textContent = game.returnBaseRoundPicture();
        }
    }, [game, ref]);

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <img
                style={{ maxWidth: "50vw", display: 'block' }}
                onClick={onImageClick}
                onLoad={handleImageLoad}
                ref={ref}
                {...props}
            />

            {game && imageDimensions && !isRoundEnd && (
                <div
                    style={{
                        position: 'absolute',
                        border: '2px solid red',
                        ...getAreaStyle(),
                        pointerEvents: 'none',
                        boxSizing: 'border-box',
                        transition: 'all 0.3s',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '100%',
                            background: 'rgba(255, 0, 0, 0.7)',
                            color: 'white',
                            padding: 4,
                            fontSize: 12,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {`x: ${x}, y: ${y}, w: ${width}, h: ${height}`}
                    </div>
                </div>
            )}
        </div>
    );
});
