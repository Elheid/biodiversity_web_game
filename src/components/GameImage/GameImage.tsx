import { forwardRef, ImgHTMLAttributes, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Game } from "../../classes/game";
import { useDisablButtonContext } from "../../context/DisbleButtonsProvider";
import { useRoundEndContext } from "../../context/RoundEndProvider";
import { BoxAreaOnImage } from "./BoxAreaOnImage";
import { FullScreenImage } from "../FullScreenImage/FullScreenImage";
import { useShowFullScreen } from "../../context/ShowFullScreen";


interface GameImageProps {
    game: Game | undefined;
    onImageLoad?:()=>void;
    isVisible:boolean;
}

export interface ImageDimensions{
    displayWidth: number;
    displayHeight: number;
    naturalWidth: number;
    naturalHeight: number;
}

export const GameImage = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement> & GameImageProps>(({ isVisible, onImageLoad,game, ...props }, ref) => {

    const { buttonsDisabled,setButtonsDisabled } = useDisablButtonContext();
    const {isRoundEnd} = useRoundEndContext();

    const [imageDimensions, setImageDimensions] = useState< ImageDimensions | null>(null);

    

    const [imageSrc, setImageSrc] = useState<string>("-1")

    const internalRef = useRef<HTMLImageElement>(null);

    
    useImperativeHandle(ref, () => internalRef.current as HTMLImageElement);
    const {showFullScreen} = useShowFullScreen();
    useEffect(() => {
        if (game){
            let img = internalRef.current;
            console.log(showFullScreen)
            if (!img){
                img = document.querySelectorAll("img.image")[0] as HTMLImageElement;
            }
            const updateDimensions = () => {
                setImageDimensions({
                    displayWidth: img.width,
                    displayHeight: img.height,
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight,
                });
            };
            updateDimensions();
        }

    }, [showFullScreen, game]);
    

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
        
        // Вызываем колбэк при загрузке изображения
        onImageLoad?.();
    };

    const coordinates = game?.returnPictureCoordinates() || {x:0,y:0, width:0, height:0};
    const {x,y,width,height} = coordinates;
    const onImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
        if ((!game /*|| (game.isThisSecondType())*/ || !imageDimensions)) return;

        const img = event.currentTarget;
        const rect = img.getBoundingClientRect();

        //масштаб
        const scaleX = imageDimensions.naturalWidth / rect.width;
        const scaleY = imageDimensions.naturalHeight / rect.height;

        setImageDimensions({
            displayWidth: rect.width,
            displayHeight: rect.height,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
        });

        //клик относительно оригинала
        const clickX = (event.clientX - rect.left) * scaleX;
        const clickY = (event.clientY - rect.top) * scaleY;

        // Попал в нужную облать или нет
        if (clickX >= x && clickX <= x + width && clickY >= y && clickY <= y + height) {
            setButtonsDisabled(false);
            //if (!game.isThisSecondType())game.changePictureToResult();
            props.onClick?.(event)
        }
    };
    useEffect(()=>{
        if (game && game.isThisSecondType()){
            /*if ((!game || !imageDimensions && internalRef.current)) return;
            const img = internalRef.current;
            const rect = img.getBoundingClientRect();
            //масштаб
            const scaleX = imageDimensions.naturalWidth / rect.width;
            const scaleY = imageDimensions.naturalHeight / rect.height;*/
    
    
            // Попал в нужную облать или нет
                setButtonsDisabled(false);
                //if (!game.isThisSecondType())game.changePictureToResult();
        }
    },[imageDimensions])

    useEffect(() => {
        const img = document.querySelectorAll("img.image")[0] as HTMLImageElement;
        if (img && game) {
            setImageSrc(img.src);
        }
    }, [game, internalRef.current]);

    return (
        <FullScreenImage>
        <div style={{ position: 'relative', display: isVisible ? "" : "none"}} >
            <img
                className={"image"}
                src={imageSrc}
                onClick={onImageClick}
                onLoad={handleImageLoad}
                ref={internalRef}
                {...props}
                // Добавляем стили для плавного появления
                style={{
                    ...props.style,
                    opacity: imageSrc === "-1" ? 0 : 1,
                    transition: "opacity 0.3s ease-in"
                }}
            />
            {!buttonsDisabled &&  game && imageDimensions && !isRoundEnd && (
                <BoxAreaOnImage 
                coordinates={coordinates} 
                imageDimensions={imageDimensions} 
                drawAreaCondition={!(!game || !imageDimensions || isRoundEnd)}
                boxColor={"rgba(0, 235, 199, 1)"}
                />
            )}
        </div>
        </FullScreenImage>
    );
});
