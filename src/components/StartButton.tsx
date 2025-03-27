import { Button } from "@mui/material";
import { NavLink } from "react-router";
import startButton from "../assets/img/start.svg"

interface StartButton {
    to: string;
    onClick?:()=>void;
}

export const StartButton= ({ to, onClick }: StartButton) => {
    return (
        <Button onClick={()=>(onClick)?.()}>
            <NavLink className="icon-button" to={to}>
                <img src={startButton} alt={"start button"}></img>
            </NavLink>
        </Button>
    );
}