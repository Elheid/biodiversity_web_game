import { forwardRef, ImgHTMLAttributes, useEffect, useState } from "react";
import { Game } from "../classes/game";
import { useDisablButtonContext } from "../context/DisbleButtonsProvider";

interface Coordinates{
    x: number;
    y:number;
    width:number;
    height:number;
}

const coordinates:Coordinates[] = [
    {x:336,y:14,width:860,height:886},
    {x:356,y:20,width:402,height:761},
    {x:0,y:0,width:0,height:0}
]


interface GameImageProps {
    game: Game | undefined;
}

export const GameImage = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement> & GameImageProps>(({ game, ...props }, ref) => {
    
    const { setButtonsDisabled } = useDisablButtonContext();
    const [imageDimensions, setImageDimensions] = useState<{
        displayWidth: number;
        displayHeight: number;
        naturalWidth: number;
        naturalHeight: number;
    } | null>(null);

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        const img = event.currentTarget;
        setImageDimensions({
            displayWidth: img.width,
            displayHeight: img.height,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
        });
    };

    const roundNum = game?.roundCounter || 0;
    const {x,y,width,height} = coordinates[roundNum]
    
    const onImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
        if (!game || !imageDimensions || game.isThisSecondType()) return;

        

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
        if (!game || !imageDimensions) return;

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
            
            {game && imageDimensions && (
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

// const {x,y,width,height} = coordinates[game.roundCounter]

/*
interface GameImageProps {
    game: Game | undefined;
}

interface Coordinates{
    x: number;
    y:number;
    width:number;
    height:number;
}

export const GameImage = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement> & GameImageProps>(({ game, ...props }, ref) => {
    const { setButtonsDisabled } = useDisablButtonContext();

    const onImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
        if (!game) return;

        const img = event.currentTarget;
        // Проверяем, загружено ли изображение
        if (img.naturalWidth === 0 || img.naturalHeight === 0) return;

        // Получаем позицию и размеры изображения на экране
        const rect = img.getBoundingClientRect();
        // Рассчитываем масштаб для преобразования координат
        const scaleX = img.naturalWidth / rect.width;
        const scaleY = img.naturalHeight / rect.height;

        // Координаты клика относительно исходного изображения
        const clickX = (event.clientX - rect.left) * scaleX;
        const clickY = (event.clientY - rect.top) * scaleY;

        // Получаем параметры прямоугольной области из game
        // Предполагаем, что game содержит x, y, width, height нужной области
        const {x,y,width,height} = coordinates[game.roundCounter]

        // Проверяем, находится ли клик внутри области
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

    useEffect(() => {
        if (ref && typeof ref !== 'function' && ref.current && game) {
            ref.current.textContent = game.returnBaseRoundPicture();
        }
    }, [game, ref]);

    return (
        <img
            style={{ maxWidth: "50vw" }}
            onClick={onImageClick}
            ref={ref}
            {...props}
        />
    );
});*/