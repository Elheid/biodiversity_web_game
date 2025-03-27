// BaseGame.tsx
import { Box, Button, ButtonGroup, Container, Paper, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useGameState } from "./../hooks/useGameState";
import { GameImage } from "./GameImage/GameImage";

import { useTimer } from "../hooks/useTimer";
import { AnswerButton } from "./AnswerButton";
import { useNavigate } from "react-router";

import { ShowFullScreenProvider } from "../context/ShowFullScreen";
import { Home } from "@mui/icons-material";
import { GameType, RoundsInfo } from "../interfaces/rounds";
import { useGameContext } from "../context/GameContextProvider";
import { Game } from "../classes/game";
import { useGamePointsContext } from "../context/GamePointsProvider";
import { getTrueAnswer } from "../api/api";
import { TimerComponent } from "./TimerComponent";
import { ImageContainer } from "./ImageContainer";

interface BaseGameProps {
    //getGameInfo: () => RoundsInfo; // Уточните тип согласно вашей реализацииs
    getNextGameInfo?: () => RoundsInfo; // Опционально для следующего 
    gameType?: GameType;
}

const getAnswerTitle = (game:Game|undefined):string|undefined=>{
    return game?.roundTitle;
}

export const BaseOfGame = ({ gameType }: BaseGameProps) => {
    const {
        isRoundEnd,
        buttonsDisabled,
        selectedAnswer,
        currentAnswers,
        scoreRef,
        imgRef,
        handleAnswerSelect,
    } = useGameState(2, gameType);
    const { game } = useGameContext();

    const [showYesNo, setShowYesNo] = useState<boolean>(true); // Состояние для отображения "Да" и "Нет"


    const [trueAnswer, setTrueAnswer] = useState<string>("");


    useEffect(() => {

            const onRoundStart = (e: CustomEventInit<number>) => {
                if (game &&  game.roundsInfo[0] && game.roundsInfo[0].id ){
                    const type = gameType || GameType.firstType;
                    getTrueAnswer(type === GameType.firstType ? "first-round" : "second-round", e.detail || -1)
                    .then(res=>setTrueAnswer(res.name))
                }
                if (gameType === GameType.secondType) {
                    setShowYesNo(true)
                } else {
                    setShowYesNo(false)
                }
            };

            window.addEventListener("round-start", onRoundStart);
            return () => window.removeEventListener("round-start", onRoundStart);

    }, [gameType, game]);

    const [answersToShow, setAnswersToShow] = useState<
    { answerName: string; isAnswerTrue: boolean }[]
>([]);

useEffect(() => {
    if (game) {
        const YesNoAnswers = [
            { answerName: "Да", isAnswerTrue: false },
            { answerName: "Нет", isAnswerTrue: false },
        ]
        
        const secondType = game.isThisSecondType();
        const showEcondRoundAnsw = showYesNo && secondType;

        console.log("currentAnswers:", currentAnswers); // Логируем currentAnswers

        const newAnswersToShow = showEcondRoundAnsw
            ? YesNoAnswers
            : currentAnswers ? currentAnswers : YesNoAnswers ;

        console.log("newAnswersToShow:", newAnswersToShow); // Логируем newAnswersToShow

        setAnswersToShow(newAnswersToShow);
    } else {
        setAnswersToShow(currentAnswers);
    }
}, [showYesNo, game, currentAnswers]);


    const navigator = useNavigate();
    const {setFirstRoundPoints, setSecondRoundPoints} = useGamePointsContext()

    useEffect(() => {
        const points = (e: CustomEventInit<number>)=> e.detail || 0;
        const nav = () => navigator(`/end`);
        const onGameEnd = (e: CustomEventInit<number>) => {
            if (gameType === GameType.secondType) {
                setSecondRoundPoints(points(e));
                nav();
            } else {
                setFirstRoundPoints(points(e));
                navigator(`/first-round-end`, { replace: true });
            }
        };

        window.addEventListener("game-end", onGameEnd);
        return () => window.removeEventListener("game-end", onGameEnd);
    }, [game]);

    // Обработчик события "checked-answer"
    useEffect(() => {
        const onCheckedAnswer = (e: CustomEventInit<{
            answerName: string;
            result: boolean;
        }>) => {
            const title = getAnswerTitle(game)//game?.roundsInfo[curRound]?.answerTitle;
            if (e.detail && e.detail.result === false && e.detail.answerName === title && trueAnswer !== title/*answerQuestion*/) {
                setShowYesNo(false); // Если ответ неверный, показываем currentAnswers
            }
        };

        window.addEventListener("checked-answer", onCheckedAnswer);
        return () => window.removeEventListener("checked-answer", onCheckedAnswer);
    }, [game]);

    const [isAnswerTrue, setIsAnswerTrue] = useState(false);

    const onAnswerClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const answerName = e.currentTarget.textContent;

        if (game?.isThisSecondType() && showYesNo) {
            // Если есть answerQuestion и показываем "Да" и "Нет", передаем answerQuestion
            const choice = getAnswerTitle(game) || ""//game?.roundsInfo[curRound]?.answerTitle || "";
            game?.RoundController.isAnswerTrue(choice, GameType.secondType).then(res =>{
                setIsAnswerTrue(res)
                const answer = answerName === "Да" ?choice:"Нет";
                if (res || (!res && answerName === "Да"))
                    handleAnswerSelect(answer);
            })
        } else if (answerName) {
            // Иначе передаем текст кнопки
            game?.RoundController.isAnswerTrue(answerName, gameType || GameType.firstType).then(res =>{
                setIsAnswerTrue(res)});
            handleAnswerSelect(answerName);
        }
    };



    return (
        <Container className="start-game" sx={{ display: "flex", flexDirection: "row" }}>
            <Paper sx={{ display: "none" }}>
                Очки:
                <Typography ref={scoreRef}>{0}</Typography>
            </Paper>

            <div className="description">
                <Typography variant="h4" component="h2">
                    Найди животное на снимке
                </Typography>
                <Typography variant="body1" component="h2">
                    Укажи место, где оно находится
                </Typography>
            </div>
            
            {<ImageContainer ref={imgRef} game={game} />}

            {game && <TimerComponent timer={game?.timer}/>}

            <div className="buttons">
                <Typography className="question-container">
                    {getAnswerTitle(game)}
                </Typography>
                <ButtonGroup orientation={window.innerWidth < 782 ? 'horizontal' : 'vertical'}>
                    {answersToShow?.map((answer) => (
                        <AnswerButton
                            parentTitle={ getAnswerTitle(game)}
                            key={answer.answerName}
                            answer={answer}
                            isAnswerTrue={isAnswerTrue}
                            isRoundEnd={isRoundEnd}
                            trueAnswer={trueAnswer}
                            selectedAnswer={selectedAnswer}
                            isDisabled={buttonsDisabled}
                            onClick={onAnswerClick}
                        />
                    ))}
                </ButtonGroup>
                <Button disabled={buttonsDisabled && isRoundEnd} onClick={onAnswerClick}>SKIP ROUND</Button>
                <Button onClick={() => {
                    navigator("/")
                }}>
                    <Typography>
                        На главную
                    </Typography>
                    <Home />
                </Button>
            </div>

            {/*</Container>*/}
        </Container>
    );

};