import { Box, Container, Typography } from "@mui/material"
import { useEffect } from "react"
import { setRoundsBodyStyle } from "../../utill"
import { NavLink } from "react-router";
import { AutoTextSize } from "auto-text-size";
import { useMinWidth } from "../../hooks/useMinWidth";
import { useResetPoints } from "../../hooks/resetPoints";
import { useTextLang } from "../../hooks/useTextLang";
import { Loading } from "../Loading";

export interface LevelCardProps {
    title: string;
    description?: string;
    to: string;
    removeAnimation?: boolean;
}
export const LevelCard = ({ title, /*description, */to, removeAnimation }: LevelCardProps) => {
    useResetPoints();
    return (
        <Box className={removeAnimation ? "level-box" : ""}>
            <div className="white-container" style={{ display: "block", textDecoration: "none", padding: 0 }}>
                <div className="container-image">
                    <NavLink to={to} className={"level-text"} style={{/*padding:"5vw"</div>*/ color: "rgba(51, 63, 72, 1)"}}>
                        <div style={{ justifyContent: "center" }}>
                            {/*<Typography variant="h4">{title}</Typography>*/}
                            <AutoTextSize maxFontSizePx={40} mode={'box'} style={{ padding: "20px" }}>
                                {title}
                            </AutoTextSize>
                        </div>
                        <div>
                            {/*<Typography variant="h4">{title}</Typography>*/}
                            <AutoTextSize maxFontSizePx={30} mode={'box'} style={{ padding: "20px", color: "rgba(51, 63, 72, 1)" }}>
                                {/*description*/}
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
    const { isMinWidth } = useMinWidth(862)

    useEffect(() => {
        setRoundsBodyStyle()
    }, [])

    const { text:CHOICE_LEVEL_TEXT, isLoading } = useTextLang('CHOICE_LEVEL_TEXT');

    const levelCards = [
        { title: "Full game", description: "Тут будет описаниe", to: "/first-round-start" },
        { title: "1 level", description: "Тут будет описаниe", to: "/first-round-start/onlyFirst" },
        { title: "2 level", description: "Тут будет описаниe", to: "/second-round-start" },
    ]

    const style: object = isMinWidth ?
        { /*minHeight:"5vh", width:"100vw", justifyContent:"space-between" */
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            minHeight: "5vh",
            boxSizing: "content-box",
            gap: "2vw"
        }
        :
        {
            display: "flex",
            flexDirection: "column",
            minHeight: "5vh",
            boxSizing: "content-box",
            gap: "2vw"
        };
        
    if (isLoading){
        return (
            <Loading />
        )
    }    
    return (
        <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <Typography className="gradient-text" variant="h3" style={{ padding: "20px", margin:"0 auto" }}>
                {CHOICE_LEVEL_TEXT}
            </Typography>
            <Container sx={{ padding: "0 !important", ...style }}>
                {levelCards.map(item =>
                    <LevelCard
                        removeAnimation={isMinWidth}
                        key={item.title}
                        title={item.title}
                        description={item.description}
                        to={item.to}
                    />)}
            </Container>
        </Box>

    )
}