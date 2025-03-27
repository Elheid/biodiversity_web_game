import { Container, Stack, Typography } from "@mui/material"
import { useGamePointsContext } from "../../context/GamePointsProvider";
import { HomeButton } from "../HomeButtons";

export const GameEnd = () => {
    const { firstRoundPoints, secondRoundPoints } = useGamePointsContext()
    return (
        <Container sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px"
        }}>
            <Typography variant="h2">
            СберегAI природу с нами!
            </Typography>
            <Typography variant="h4">
                Верно обработано фотографий
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
                    Самостоятельно:
                    <br/><span className="result-score">{firstRoundPoints}</span>
                </Typography>

                <Typography>
                    С AI-помощником:
                    <br/><span className="result-score">{secondRoundPoints}</span>
                </Typography>

            </Stack>
            
            <HomeButton />
        </Container >
    )
}