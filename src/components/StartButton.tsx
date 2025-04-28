import { Button } from "@mui/material";
import { NavLink } from "react-router";
import startButton from "../assets/img/start.svg"
//import startButtonHover from "../assets/img/startHover.svg"

import coloredButton from "../assets/img/coloredButton.svg"
import interEndButton from "../assets/img/interEndButton.svg"
import { useMinWidth } from "../hooks/useMinWidth";
interface StartButton {
    to: string;
    onClick?:()=>void;
    variant?:"white"|"colored" | "interEnd";
    text?:string;
}


export const StartButton= ({ to, onClick, variant = "white", text }: StartButton) => {

    const {isMinWidth } = useMinWidth(700)
    let fontSize = isMinWidth ? '2rem' : "1.2rem";

    const {isMinWidth: isMinWidthSecond } = useMinWidth(436)
    if (!isMinWidthSecond) fontSize = "0.8rem";

    let imageSrc = startButton;
    if (variant === "colored") imageSrc = coloredButton;

    if (variant == "white")
    return (
        <Button onClick={()=>(onClick)?.()}>
            <NavLink className={"icon-button"} to={to}>
                <img className="start-button-img" src={imageSrc} alt={"start button"}>
                </img>
            </NavLink>
        </Button>
    );
    if (variant == "colored" || variant == "interEnd"){
    const imageSrc = variant === "colored" ? coloredButton : interEndButton;

    return (
        <Button
            component={NavLink}
            to={to}
            onClick={onClick}
            sx={{
                position: 'relative',
                padding: 0,
                minWidth: 'auto',
                '&:hover': {
                    background: 'none', // Remove MUI hover effect
                },
            }}
        >
            <img 
                className="start-button-img"
                src={imageSrc} 
                alt="Start button" 
                style={{ display: 'block', width: '100%', height: 'auto' }}
            />
            {text && (
                <span
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontSize: fontSize,
                        pointerEvents: 'none', // Makes the text non-interactive
                        whiteSpace: 'nowrap',
                    }}
                >
                    {text}
                </span>
            )}
        </Button>)
    }
}
