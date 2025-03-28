import { Container, Typography } from "@mui/material"

import { useEffect } from "react"
import { endSession } from "../../api/api"
import { StartButton } from "../StartButton"
import { MAIN_PAGE_AI_SUBTITLE, MAIN_PAGE_DESCRIPTION, MAIN_PAGE_TITLE } from "../../config"

export const MainPage = () => {
    useEffect(()=>{
        endSession()//end prev session
    },[])
    
    return (
        <Container>
            <h1>{MAIN_PAGE_TITLE}</h1>

            <Typography>
            {MAIN_PAGE_DESCRIPTION}
            </Typography>


            <Typography>
            {MAIN_PAGE_AI_SUBTITLE}
            </Typography>
            
            <StartButton to={"/first-round-start"} />
        </Container>

    )
}