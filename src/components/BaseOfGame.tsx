// BaseGame.tsx
import { Box, Button, Container, List, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useGameState } from "./../hooks/useGameState";
import { GameImage } from "./GameImage/GameImage";
import { GameType, RoundsInfo } from "../classes/game";
import { useTimer } from "../hooks/useTimer";
import { AnswerButton } from "./AnswerButton";
import { useNavigate, useParams } from "react-router";
import { getPicturesCoordinate } from "../tempInfo";
import { ShowFullScreenProvider } from "../context/ShowFullScreen";

interface BaseGameProps {
    getGameInfo: () => RoundsInfo; // Уточните тип согласно вашей реализации
    getNextGameInfo?: () => RoundsInfo; // Опционально для следующего 
    gameType?: GameType;
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

    const { timeLeft, formatTime } = useTimer(game);

    //Для отображения надписи/вопроса в начале каждого раунда
    const gameInfo = getGameInfo();
    const curRound = game?.roundCounter || 0;
    const [answerQuestion, setAnswerQuestion] = useState<string>("");

    useEffect(()=>{
        const answerQuestion = gameInfo[curRound]?.answerTitle;
        if (!isRoundEnd && answerQuestion) {
            setAnswerQuestion(answerQuestion);
        }
    },[curRound, isRoundEnd, gameInfo]);
    //
    //Это для перехода между играми и выхода на страницу с подсчетом очков
    const navigator = useNavigate();

    const { firstScore } = useParams<{ firstScore?: string }>();

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
    //

    const onAnswerClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const answerName = e.currentTarget.textContent;
        if (answerName) handleAnswerSelect(answerName);
    };

    return (
        <Container className="start-game">
            <Paper>
                <Typography variant="h5" component="h2">
                    {formatTime(timeLeft)}
                </Typography>
            </Paper>

            <Paper>
                Очки:
                <Typography ref={scoreRef}>{0}</Typography>
            </Paper>

            <Box>
                <ShowFullScreenProvider>
                    <GameImage ref={imgRef} coordinates={getPicturesCoordinate()[curRound]} game={game}/>
                </ShowFullScreenProvider>
                
            </Box>

            <Typography>
                {answerQuestion}
            </Typography>
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