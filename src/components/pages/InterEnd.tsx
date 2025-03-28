import { Button, Container, Typography } from "@mui/material"
import { NavLink } from "react-router";
import { useGamePointsContext } from "../../context/GamePointsProvider";
import { TRUE_AMOUNT_PHOTO_TEXT, TRY_AI_BUTTON_TEXT, YOUR_SCORE_TEXT } from "../../config";

export const InterEnd = ()=>{
    const {firstRoundPoints} = useGamePointsContext()
    return (
        <Container>
            <Typography variant="h3">
                {YOUR_SCORE_TEXT}
            </Typography>
            <Typography>
            {TRUE_AMOUNT_PHOTO_TEXT}
            <br/><span className="result-score">{firstRoundPoints}</span>
            </Typography>
            
            <Button >
                <NavLink to={"/second-round-start"}>
                    {TRY_AI_BUTTON_TEXT}
                </NavLink>
            </Button>
        </Container>
    )
}