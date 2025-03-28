import { Container, Typography } from "@mui/material";
import { GameType } from "../interfaces/rounds";
import { ROUND_TARGET, ROUND_TARGET_TITLE_AI, ROUND_TARGET_TITLE, RAUND_TEXT } from "../config";

export const TextForRoundStart = ({roundType}:{roundType : GameType})=>{
    let roundNum = 1;
    let target = ROUND_TARGET_TITLE;
    if (roundType === GameType.secondType){
        roundNum = 2;
        target = ROUND_TARGET_TITLE_AI;
    }
    return(
        <Container>
            <Typography variant="h1">
            {RAUND_TEXT} {roundNum}
            </Typography>
            <Typography variant="h3">
                {target}
            </Typography>
            <Typography variant="h5">
            {ROUND_TARGET}
            </Typography>
        </Container>
    );
}