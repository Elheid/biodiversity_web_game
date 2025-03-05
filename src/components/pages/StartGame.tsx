import { Box, Button, Container, List, Paper, Typography } from "@mui/material";

import { useEffect } from "react";


import { AnswerButton } from "../AnswerButton";
import { useTimer } from "../../hooks/useTimer";
import { useGameState } from "../../hooks/useGameState";
import { GameImage } from "../GameImage";
import { getGameInfo } from "../../tempInfo";


export const StartGame = () => {

    const {
        game,
        isRoundEnd,
        buttonsDisabled,
        selectedAnswer,
        currentAnswers,
        scoreRef,
        imgRef,
        handleAnswerSelect,

    } = useGameState(getGameInfo(), Object.keys(getGameInfo()).length);

    const { timeLeft, formatTime } = useTimer(game)
    const onAnswerClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const answerName = e.currentTarget.textContent;
        if (answerName) handleAnswerSelect(answerName);
    }


    useEffect(() => {
        const nav = (e: CustomEventInit<number>) => window.location.href = "/end/" + e.detail;
        const onGameEnd = (e: CustomEventInit<number>) => {
            nav(e);
        }
        window.addEventListener("game-end", onGameEnd)

        return () => {
            window.removeEventListener("game-end", onGameEnd)
        };
    }, [])

    return (
        
            <Container className="start-game">
                <Paper>
                    <Typography variant="h5" component="h2">
                        {formatTime(timeLeft)}
                    </Typography>
                </Paper>

                <Box>
                    Очки:
                    <Typography ref={scoreRef}>{0}</Typography>
                </Box>

                <Container>
                    <GameImage ref={imgRef} game={game} />
                </Container>
                <List>
                    {currentAnswers?.map((answer) => (
                        <AnswerButton
                            key={answer.answerName}
                            answer={answer}
                            isRoundEnd={isRoundEnd}
                            selectedAnswer={selectedAnswer}
                            isDisabled={buttonsDisabled}
                            onClick={onAnswerClick}
                        />
                    ))}
                </List>
                <Button onClick={onAnswerClick}>SKIP ROUND</Button>
            </Container>
    );
};
