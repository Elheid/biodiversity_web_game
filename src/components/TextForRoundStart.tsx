import { Container, Typography } from "@mui/material";
import { GameType } from "../interfaces/rounds";
import { ROUND_TARGET, ROUND_TARGET_TITLE_AI, ROUND_TARGET_TITLE, RAUND_TEXT } from "../config";
import { AutoTextSize } from "auto-text-size";
import { useMinWidth } from "../hooks/useMinWidth";

export const TextForRoundStart = ({ roundType }: { roundType: GameType }) => {
    let roundNum = 1;
    let target = ROUND_TARGET_TITLE;
    if (roundType === GameType.secondType) {
        roundNum = 2;
        target = ROUND_TARGET_TITLE_AI;
    }

    const {isMinWidth } = useMinWidth(740)

    return (
        <Container className="white-container" sx={{ marginBottom: "8vh" }}>
            <div className="container-image">
                <Container>
                    {<AutoTextSize className="text-block-auto-size" maxFontSizePx={30} mode={'box'} style={{ padding: "20px" }}>
                        <Typography className="gradient-text" variant={isMinWidth ? "h1":"h2"}>
                            {RAUND_TEXT} {roundNum}
                        </Typography>
                        <Typography  variant={isMinWidth ? "h3":"h5"}>
                            {target}
                        </Typography>
                        <Typography variant={isMinWidth ? "h5":"h6"}>
                            <div dangerouslySetInnerHTML={{ __html: ROUND_TARGET }} />
                        </Typography>
                    </AutoTextSize>}
                    {/*
                        <div className="text-auto-size-container">
                            <div style={{width:"100%",justifyContent:"center"}}>
                                <AutoTextSize className="gradient-text" maxFontSizePx={50} mode={'box'} style={{ padding: "20px" }}>
                                    {RAUND_TEXT} {roundNum}
                                </AutoTextSize>
                            </div>
                            <div className="" style={{width:"100%"}}>
                                <AutoTextSize maxFontSizePx={30} mode={'box'} style={{ padding: "20px" }}>
                                    {target}
                                </AutoTextSize>
                            </div>

                            <div className="" style={{width:"100%"}}>
                                <AutoTextSize maxFontSizePx={30} mode={'box'} style={{ padding: "20px" }}>
                                    <div dangerouslySetInnerHTML={{ __html: ROUND_TARGET }} />
                                </AutoTextSize>
                            </div>
                        </div>

                    */}

                </Container>

            </div>
        </Container>
    );
}