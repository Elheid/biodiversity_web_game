import { Container, Typography } from "@mui/material"
import { useGamePointsContext } from "../../context/GamePointsProvider";
import { TRUE_AMOUNT_PHOTO_TEXT, TRY_AI_BUTTON_TEXT, YOUR_SCORE_TEXT } from "../../config";
import { AutoTextSize } from "auto-text-size";
import { setStartRoundsBodyStyle } from "../../utill";
import { useEffect } from "react";
import { StartButton } from "../StartButton";
import { useMinWidth } from "../../hooks/useMinWidth";

export const InterEnd = () => {
    const { firstRoundPoints } = useGamePointsContext()
    useEffect(() => {
        setStartRoundsBodyStyle()
    }, [])

    /*const [isMinWidth, setIsMinWidth] = useState(false);
    
    
        useEffect(() => {
        const checkWidth = () => {
            setIsMinWidth(window.innerWidth > 824);
        };
        
        checkWidth();
        window.addEventListener('resize', checkWidth);
        
        return () => window.removeEventListener('resize', checkWidth);
    }, []);*/
    const {isMinWidth} = useMinWidth(824)


    return (
        <Container className="container-with-gap">
            <div className="white-container" style={{ marginBottom: "8vh" }}>
                <div className="container-image" style={{justifyContent: "center"}}>
                    {/*<div className="text-auto-size-container">
                    <div className="">
                        <AutoTextSize maxFontSizePx={60} mode={"oneline"} style={{ padding: "20px" }}>
                            {YOUR_SCORE_TEXT}
                        </AutoTextSize>
                    </div>
                    <div className="">
                        <AutoTextSize maxFontSizePx={30} mode={"box"} style={{ padding: "20px" }}>
                            {TRUE_AMOUNT_PHOTO_TEXT}

                        </AutoTextSize>
                    </div>
                    <div className="">
                        <AutoTextSize maxFontSizePx={30} mode={"box"} style={{ padding: "20px" }}>

                            <span className="result-score">{firstRoundPoints}</span>

                        </AutoTextSize>
                    </div>
                    </div>*/}




                    {<AutoTextSize className="text-block-auto-size" maxFontSizePx={50} mode={"box"} style={{ padding: "20px" }}>
                        <Typography variant={isMinWidth ? "h1" :"h3"} >
                            {YOUR_SCORE_TEXT}
                        </Typography>
                        <Typography variant="h5">
                            {TRUE_AMOUNT_PHOTO_TEXT}
                        </Typography>
                        <Typography>
                        <span className="result-score">{firstRoundPoints}</span>
                        </Typography>
                    </AutoTextSize>}
                    {/*<AutoTextSize maxFontSizePx={30} mode={"box"} style={{ padding: "20px" }}>
                    {YOUR_SCORE_TEXT}<br/>
                    
                    
                    {TRUE_AMOUNT_PHOTO_TEXT}<br/>

                    <br /><span className="result-score">{firstRoundPoints}</span>
                    </AutoTextSize>*/}
                </div>
            </div>
            {/*<Button >
                <NavLink to={"/second-round-start"}>
                    {TRY_AI_BUTTON_TEXT}
                </NavLink>
            </Button>*/}
            <StartButton variant="interEnd" text={TRY_AI_BUTTON_TEXT} to={"/second-round-start"} />
        </Container>
    )
}