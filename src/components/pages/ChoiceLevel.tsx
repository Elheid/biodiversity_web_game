import { Box, Container, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { setRoundsBodyStyle } from "../../utill"
import { NavLink } from "react-router";
import { AutoTextSize } from "auto-text-size";
import { useMinWidth } from "../../hooks/useMinWidth";

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
                    <NavLink to={to} className={"level-text"} style={{/*padding:"5vw"</div>*/}}>
                        <div>
                            {/*<Typography variant="h4">{title}</Typography>*/}
                            <AutoTextSize maxFontSizePx={30} mode={'box'} style={{ padding: "20px" }}>
                                {title}
                            </AutoTextSize>
                        </div>
                        <div>
                            {/*<Typography variant="h4">{title}</Typography>*/}
                            <AutoTextSize maxFontSizePx={30} mode={'box'} style={{ padding: "20px" }}>
                                {description}
                            </AutoTextSize>
                        </div>

                        {/*description && <Typography>{description}</Typography>*/}
                    </NavLink>
                </div>
            </div>
        </Box>
    )
}

export const ChoiceLevel = () => {
    /*const [isMinWidth, setIsMinWidth] = useState(false);
    
    
        useEffect(() => {
        const checkWidth = () => {
            setIsMinWidth(window.innerWidth > 862);
        };
        
        checkWidth();
        window.addEventListener('resize', checkWidth);
        
        return () => window.removeEventListener('resize', checkWidth);
    }, []);*/
    const {isMinWidth} = useMinWidth(862)

    useEffect(() => {
        setRoundsBodyStyle()
    }, [])

    const levelCards = [
        {title:"Full game", description:"Тут будет описаниe", to:"/first-round-start"},
        {title:"1 level", description:"Тут будет описаниe", to:"/first-round-start/onlyFirst"},
        {title:"2 level", description:"Тут будет описаниe", to:"/second-round-start"},
    ]

    const style:object = isMinWidth ?
    { /*minHeight:"5vh", width:"100vw", justifyContent:"space-between" */ 
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            minHeight:"5vh",
            boxSizing:"content-box",
            gap:"2vw"
    }
    :
    {
            display:"flex",
            flexDirection:"column",
            minHeight:"5vh",
            boxSizing:"content-box",
            gap:"2vw"
    }
    ;
    return (
        <Container sx={{padding:0, ...style}}>
            {levelCards.map(item => 
            <LevelCard 
            key={item.title}
            title={item.title}
            description={item.description}
            to={item.to} />)}
        </Container>
    )
}