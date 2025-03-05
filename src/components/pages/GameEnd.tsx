import { Button, Container, Typography } from "@mui/material"
import { NavLink, useParams } from "react-router";

export const GameEnd = ()=>{
    const { firstScore } = useParams<{ firstScore?: string }>();
    const {secondScore} = useParams<{secondScore?:string}>();
    return (
        <Container>
            <Typography>
                Game End
                Score without ai: 
                {firstScore}
            </Typography>

            <Typography>
            Score with ai: 
            {secondScore}
            </Typography>
            
            <Button >
                <NavLink to={"/"}>
                    To Home
                </NavLink>
            </Button>
        </Container>
    )
}