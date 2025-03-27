import { Container, Typography } from "@mui/material"

import { useEffect } from "react"
import { endSession } from "../../api/api"
import { StartButton } from "../StartButton"

export const MainPage = () => {
    useEffect(()=>{
        endSession()//end prev session
    },[])
    
    return (
        <Container>
            <h1>Попробуй себя в роли
            учёного-зоолога!</h1>

            <Typography>
            До 1000 снимков с фотоловушек
            в день необходимо обрабатывать исследователям особо охраняемых природных территорий
            </Typography>


            <Typography>
            AI-помощник возьмет часть работы на себя
            </Typography>
            
            <StartButton to={"/first-round-start"} />
        </Container>

    )
}