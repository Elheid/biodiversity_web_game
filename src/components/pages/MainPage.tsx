import { Button, Container } from "@mui/material"
import { NavLink } from "react-router"

import startButton from "../../assets/img/start.svg"
import { useEffect } from "react"
import { endSession } from "../../api/api"

export const MainPage = () => {
    useEffect(()=>{
        endSession()//end prev session
    },[])
    
    return (
        <Container>
            <h1>Начальный экран</h1>

            <Button >
                <NavLink className="icon-button" to={"/first-round-start"}>
                    
                        <img src={startButton} alt={"start button"}></img>
                    
                </NavLink>
            </Button>
        </Container>

    )
}