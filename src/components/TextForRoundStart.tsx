import { Container, Typography } from "@mui/material";
import { GameType } from "../interfaces/rounds";
import { CURRENT_DURATION_TIME, ROUND_TARGET_FIRST, ROUND_TARGET_SECOND } from "../config";

export const TextForRoundStart = ({roundType}:{roundType : GameType})=>{
    let roundNum = 1;
    let target = ROUND_TARGET_FIRST;
    if (roundType === GameType.secondType){
        roundNum = 2;
        target = ROUND_TARGET_SECOND;
    }
    return(
        <Container>
            <Typography variant="h1">
            Раунд {roundNum}
            </Typography>
            <Typography variant="h3">
                {target}
            </Typography>
            <Typography variant="h5">
            Обработай как можно больше снимков за {CURRENT_DURATION_TIME / 1000} секунд!
            </Typography>
        </Container>
    );
}