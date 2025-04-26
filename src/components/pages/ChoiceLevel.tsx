import { Box, Container, Typography } from "@mui/material"
import { useEffect } from "react"
import { setRoundsBodyStyle } from "../../utill"
import { NavLink } from "react-router";

export interface LevelCardProps {
    title: string;
    description?:string;
    to:string;
}
export const LevelCard = ({ title, description, to }: LevelCardProps) => {
    return (
        <Box className="level-box">
            <div className="white-container" style={{display:"block", textDecoration:"none", padding:0 }}>
                <div className="container-image">
                    <NavLink to={to} className={"level-text"} style={{padding:"5vw"}}>
                    <Typography variant="h4">{title}</Typography>
                    {description && <Typography>{description}</Typography>}
                    </NavLink>
                </div>
            </div>
        </Box>
    )
}

export const ChoiceLevel = () => {
    useEffect(() => {
        setRoundsBodyStyle()
    }, [])

    const levelCards = [
        {title:"Full game", description:"Тут будет описаниe", to:"/first-round-start"},
        {title:"1 level", description:"Тут будет описаниe", to:"/first-round-start/onlyFirst"},
        {title:"2 level", description:"Тут будет описаниe", to:"/second-round-start"},
    ]
    return (
        <Container sx={{ /*minHeight:"5vh", width:"100vw", justifyContent:"space-between" */ 
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            minHeight:"5vh",
            boxSizing:"content-box",
            gap:"2vw"
        }}>
            {levelCards.map(item => 
            <LevelCard 
            key={item.title}
            title={item.title}
            description={item.description}
            to={item.to} />)}
        </Container>
    )
}