import { Container, Stack, Typography } from "@mui/material"
import { useGamePointsContext } from "../../context/GamePointsProvider";
import { HomeButton } from "../HomeButtons";
import { END_TITLE, TRUE_AMOUNT_PHOTO_TEXT, TYPE_OF_SCORE_TEXT } from "../../config";

export const GameEnd = () => {
    const { firstRoundPoints, secondRoundPoints } = useGamePointsContext()
    return (
        <Container sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px"
        }}>
            <Typography variant="h2">
            {END_TITLE}
            </Typography>
            <Typography variant="h4">
                {TRUE_AMOUNT_PHOTO_TEXT}
            </Typography>

            <Stack 
            direction="row" 
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "center",
            }}
            >

                <Typography>
                    {TYPE_OF_SCORE_TEXT.self}:
                    <br/><span className="result-score">{firstRoundPoints}</span>
                </Typography>

                <Typography>
                    {TYPE_OF_SCORE_TEXT.ai}:
                    <br/><span className="result-score">{secondRoundPoints}</span>
                </Typography>

            </Stack>
            
            <HomeButton />
        </Container >
    )
}