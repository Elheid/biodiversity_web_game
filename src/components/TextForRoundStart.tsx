import { Container, Typography } from "@mui/material";
import { GameType } from "../interfaces/rounds";
import { ROUND_TARGET, ROUND_TARGET_TITLE_AI, ROUND_TARGET_TITLE, RAUND_TEXT } from "../config";
import { AutoTextSize } from "auto-text-size";

export const TextForRoundStart = ({ roundType }: { roundType: GameType }) => {
    let roundNum = 1;
    let target = ROUND_TARGET_TITLE;
    if (roundType === GameType.secondType) {
        roundNum = 2;
        target = ROUND_TARGET_TITLE_AI;
    }
    return (
        <Container className="white-container" sx={{marginBottom:"8vh"}}>
            <div className="container-image">
                <Container>
                    <AutoTextSize maxFontSizePx={30} mode={'box'} style={{ padding: "20px" }}>
                        <Typography variant="h1">
                            {RAUND_TEXT} {roundNum}
                        </Typography>
                        <Typography variant="h3">
                            {target}
                        </Typography>
                        <Typography variant="h5">
                            {ROUND_TARGET}
                        </Typography>
                    </AutoTextSize>
                    {/*
            <AutoTextSize maxFontSizePx={50} mode={'box'} style={{ padding: "20px" }}>
                {RAUND_TEXT} {roundNum}
            </AutoTextSize>

            <AutoTextSize maxFontSizePx={30} mode={'box'} style={{ padding: "20px" }}>
            {target}
            </AutoTextSize>

            <AutoTextSize maxFontSizePx={25} mode={'box'} style={{ padding: "20px" }}>
            {ROUND_TARGET}
            </AutoTextSize>*/}

                </Container>

            </div>
        </Container>
    );
}