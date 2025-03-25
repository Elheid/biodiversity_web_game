import { Button, Container, Typography } from "@mui/material"
import { NavLink } from "react-router";
import { useGamePointsContext } from "../../context/GamePointsProvider";

export const InterEnd = ()=>{
    //const { firstScore } = useParams<{ firstScore?: string }>();
    //const {secondScore} = useParams<{secondScore?:string}>();
    const {firstRoundPoints} = useGamePointsContext()
    return (
        <Container>
            <Typography>
                Game End
                Score without ai: 
                {firstRoundPoints}
            </Typography>
            
            <Button >
                <NavLink to={"/second-round-start"}>
                    Узнать возможности нейросети!
                </NavLink>
            </Button>
        </Container>
    )
}