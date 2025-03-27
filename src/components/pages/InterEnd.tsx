import { Button, Container, Typography } from "@mui/material"
import { NavLink } from "react-router";
import { useGamePointsContext } from "../../context/GamePointsProvider";

export const InterEnd = ()=>{
    const {firstRoundPoints} = useGamePointsContext()
    return (
        <Container>
            <Typography variant="h3">
                Твой результат
            </Typography>
            <Typography>
            Верно обработано фотографий:
            <br/><span className="result-score">{firstRoundPoints}</span>
            </Typography>
            
            <Button >
                <NavLink to={"/second-round-start"}>
                    Узнать возможности нейросети!
                </NavLink>
            </Button>
        </Container>
    )
}