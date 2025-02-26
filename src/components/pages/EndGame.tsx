import { Button, Container, Typography } from "@mui/material"
import { NavLink, useParams } from "react-router";

export const EndGame = ()=>{
    const { score } = useParams<{ score?: string }>();
    return (
        <Container>
            <Typography>
                Game End
                Score : 
                {score}
            </Typography>
            <Button >
                <NavLink to={"/"}>
                    To Home
                </NavLink>
            </Button>
        </Container>
    )
}