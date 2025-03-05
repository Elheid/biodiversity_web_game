import { forwardRef, ImgHTMLAttributes, useEffect } from "react";
import { Game } from "../classes/game";
import { useDisablButtonContext } from "../context/DisbleButtonsProvider";

interface GameImageProps{
    game: Game|undefined;
}

export const GameImage = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement> & GameImageProps>(({game}, ref) => {

    const {setButtonsDisabled}= useDisablButtonContext()

    const onImageClick = ()=>{
        setButtonsDisabled(false);
        game?.changePictureToResult();
    }
    
    useEffect(() => {
        if (ref && typeof ref !== 'function' && ref.current && game) {
            ref.current.textContent = game.returnBaseRoundPicture();
        }
    }, [game, ref]);

    return (
    <img style={{ maxWidth: "50vw" }} onClick={onImageClick} ref={ref} />
    );
});