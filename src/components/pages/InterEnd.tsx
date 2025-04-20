import { Container, Typography } from "@mui/material"
import { useGamePointsContext } from "../../context/GamePointsProvider";
import { TRUE_AMOUNT_PHOTO_TEXT, TRY_AI_BUTTON_TEXT, YOUR_SCORE_TEXT } from "../../config";
import { AutoTextSize } from "auto-text-size";
import { setStartRoundsBodyStyle } from "../../utill";
import { useEffect } from "react";
import { StartButton } from "../StartButton";

export const InterEnd = () => {
    const { firstRoundPoints } = useGamePointsContext()
        useEffect(() => {
            setStartRoundsBodyStyle()
        }, [])

    return (
        <Container className="container-with-gap">
            <div className="white-container" style={{marginBottom:"8vh"}}>
                <div className="container-image">
                    {<AutoTextSize maxFontSizePx={50} mode={"box"} style={{ padding: "20px" }}>
                        <Typography variant="h1" >
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
            <StartButton variant="interEnd" text={TRY_AI_BUTTON_TEXT}  to={"/second-round-start"}/>
        </Container>
    )
}