import { Button, Container } from "@mui/material"
import { NavLink } from "react-router"


export const MainPage = () => {
    return (
        <Container>
            <h1>Начальный экран</h1>

            <Button >
                <NavLink to={"/first-round"}>
                    START
                </NavLink>
            </Button>
        </Container>

    )
}