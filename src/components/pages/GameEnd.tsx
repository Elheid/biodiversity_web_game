import { Button, Container, Typography } from "@mui/material"
import { NavLink } from "react-router";
import { useGamePointsContext } from "../../context/GamePointsProvider";

export const GameEnd = ()=>{
    //const { firstScore } = useParams<{ firstScore?: string }>();
    //const {secondScore} = useParams<{secondScore?:string}>();
    const {firstRoundPoints, secondRoundPoints} = useGamePointsContext()
    return (
        <Container>
            <Typography>
                Game End
                Score without ai: 
                {firstRoundPoints}
            </Typography>

            <Typography>
            Score with ai: 
            {secondRoundPoints}
            </Typography>
            
            <Button >
                <NavLink to={"/"}>
                    To Home
                </NavLink>
            </Button>
        </Container>
    )
}