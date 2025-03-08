import { Button, Container } from "@mui/material"
import { NavLink } from "react-router"

import startButton from "../../assets/img/start.svg"

export const MainPage = () => {
    return (
        <Container>
            <h1>Начальный экран</h1>

            <Button >
                <NavLink className="icon-button" to={"/first-round"}>
                    
                        <img src={startButton} alt={"start button"}></img>
                    
                </NavLink>
            </Button>
        </Container>

    )
}