// BaseGame.tsx
import { Box, Button, Container, List, Paper, Typography } from "@mui/material";
import { useEffect } from "react";

import { useGameState } from "./../hooks/useGameState";
import { GameImage } from "./GameImage";
import { GameType, RoundsInfo } from "../classes/game";
import { useTimer } from "../hooks/useTimer";
import { AnswerButton } from "./AnswerButton";
import { useNavigate, useParams } from "react-router";
import { getPicturesCoordinate } from "../tempInfo";

interface BaseGameProps {
    getGameInfo: () => RoundsInfo; // Уточните тип согласно вашей реализации
    getNextGameInfo?: () => RoundsInfo; // Опционально для следующего 
    gameType?:GameType;
}

export const BaseOfGame = ({ getGameInfo, gameType }: BaseGameProps) => {
    const {
        game,
        isRoundEnd,
        buttonsDisabled,
        selectedAnswer,
        currentAnswers,
        scoreRef,
        imgRef,
        handleAnswerSelect,
    } = useGameState(getGameInfo(), Object.keys(getGameInfo()).length, gameType);


    const navigator = useNavigate();
    const { timeLeft, formatTime } = useTimer(game);

    const { firstScore } = useParams<{ firstScore?: string }>();

    const onAnswerClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const answerName = e.currentTarget.textContent;
        if (answerName) handleAnswerSelect(answerName);
    };

    useEffect(() => {
        const nav = (e: CustomEventInit<number>) => navigator(`/end/${firstScore}/${e.detail}`)
        //window.location.href = "/end/" + e.detail;
        const onGameEnd = (e: CustomEventInit<number>) => {
            if (firstScore) {
                nav(e);
            } else {
                navigator(`/second-round/${e.detail}`, { replace: true })
            }
        };

        window.addEventListener("game-end", onGameEnd);
        return () => window.removeEventListener("game-end", onGameEnd);
    }, [game, firstScore]);

    const curRound = game?.roundCounter || 0;

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
                <GameImage ref={imgRef} coordinates={getPicturesCoordinate()[curRound]} game={game}  />
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
            <Button disabled={buttonsDisabled && isRoundEnd} onClick={onAnswerClick}>SKIP ROUND</Button>
        </Container>
    );
};