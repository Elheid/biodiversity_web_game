// BaseGame.tsx
import { Box, Button, ButtonGroup, Container, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useGameState } from "./../hooks/useGameState";
import { GameImage } from "./GameImage/GameImage";

import { useTimer } from "../hooks/useTimer";
import { AnswerButton } from "./AnswerButton";
import { useNavigate, useParams } from "react-router";

import { ShowFullScreenProvider } from "../context/ShowFullScreen";
import { Home } from "@mui/icons-material";
import { GameType, RoundsInfo } from "../interfaces/rounds";
import { useGameContext } from "../context/GameContextProvider";
import { Game } from "../classes/game";

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
    const { timeLeft, formatTime } = useTimer();

    const curRound = game?.roundCounter || 0;
    //const [answerQuestion, setAnswerQuestion] = useState<string>(getAnswerTitle(game) || "");
    const [showYesNo, setShowYesNo] = useState<boolean>(true); // Состояние для отображения "Да" и "Нет"


    useEffect(() => {
        const answerQuestion = getAnswerTitle(game) //game?.roundsInfo[curRound]?.answerTitle;
        if (answerQuestion) {
            //setAnswerQuestion(answerQuestion);

            setShowYesNo(true); // При новом раунде снова показываем "Да" и "Нет"
        }

       /* const onRoundEnd = (e: CustomEventInit)=>{
            setAnswerQuestion(getAnswerTitle(game) || "");
        }
        window.addEventListener("round-end", ()=> onRoundEnd);

        return()=>{

        }*/
    }, [curRound, game]);

    const navigator = useNavigate();
    const { firstScore } = useParams<{ firstScore?: string }>();

    useEffect(() => {
        const nav = (e: CustomEventInit<number>) => navigator(`/end/${firstScore}/${e.detail}`);
        const onGameEnd = (e: CustomEventInit<number>) => {
            if (firstScore) {
                nav(e);
            } else {
                navigator(`/second-round/${e.detail}`, { replace: true });
            }
        };

        window.addEventListener("game-end", onGameEnd);
        return () => window.removeEventListener("game-end", onGameEnd);
    }, [game, firstScore]);

    // Обработчик события "checked-answer"
    useEffect(() => {
        const onCheckedAnswer = (e: CustomEventInit<{
            answerName: string;
            result: boolean;
        }>) => {
            const title = getAnswerTitle(game)//game?.roundsInfo[curRound]?.answerTitle;
            if (e.detail && e.detail.result === false && e.detail.answerName === title/*answerQuestion*/) {
                setShowYesNo(false); // Если ответ неверный, показываем currentAnswers
            }
        };

        window.addEventListener("checked-answer", onCheckedAnswer);
        return () => window.removeEventListener("checked-answer", onCheckedAnswer);
    }, [game]);

    const onAnswerClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const answerName = e.currentTarget.textContent;

        if (game?.isThisSecondType() && showYesNo) {
            // Если есть answerQuestion и показываем "Да" и "Нет", передаем answerQuestion
            const choice = getAnswerTitle(game) || ""//game?.roundsInfo[curRound]?.answerTitle || "";
            game?.RoundController.isAnswerTrue(choice, GameType.secondType).then(res =>{
                const answer = answerName === "Да" ?choice:"Нет";
                if (res || (!res && answerName === "Да"))
                    handleAnswerSelect(answer);
            })
        } else if (answerName) {
            // Иначе передаем текст кнопки
            handleAnswerSelect(answerName);
        }
    };

    const [answersToShow, setAnswersToShow] = useState<
    { answerName: string; isAnswerTrue: boolean }[]
>([]);

useEffect(() => {
    if (game) {
        const secondType = game.isThisSecondType();
        const showAllAnswers = showYesNo && secondType;

        console.log("currentAnswers:", currentAnswers); // Логируем currentAnswers

        const newAnswersToShow = showAllAnswers
            ? [
                { answerName: "Да", isAnswerTrue: true },
                { answerName: "Нет", isAnswerTrue: false },
            ]
            : currentAnswers;

        console.log("newAnswersToShow:", newAnswersToShow); // Логируем newAnswersToShow

        setAnswersToShow(newAnswersToShow);
    } else {
        setAnswersToShow(currentAnswers);
    }
}, [showYesNo, game, currentAnswers]);

    // Определяем, какие ответы показывать
    /*const answersToShow = showYesNo && game?.isThisSecondType()
        ? [
            { answerName: "Да", isAnswerTrue: true },
            { answerName: "Нет", isAnswerTrue: false },
        ]
        : currentAnswers;*/

    return (
      
      
        <Container className="start-game" sx={{ display: "flex", flexDirection: "row" }}>
            <Paper sx={{ display: "none" }}>
                Очки:
                <Typography ref={scoreRef}>{0}</Typography>
            </Paper>

            <div className="image-container">
                <div className="main-image">
                    <ShowFullScreenProvider>
                        <GameImage ref={imgRef} game={game} />
                    </ShowFullScreenProvider>
                </div>
            </div>
        
        <Box className="timer-container timer-container-big">
                <Typography 
                    variant={window.innerWidth < 600 ? 'h6' : 'h3'} 
                    component="h3" 
            
                >

                    {formatTime(timeLeft)}
                </Typography>
            </Box>

            <div className="buttons">
                <Typography className="question-container">
                    {answerQuestion}
                </Typography>
                <ButtonGroup orientation={window.innerWidth < 782 ? 'horizontal' : 'vertical'}>
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
/*
            <Container className="control-part">
                <Box className="timer-container">
                    <Typography variant="h5" component="h2">
                        {formatTime(timeLeft)}
                    </Typography>
                </Box>

                <div className="buttons">
                    <Typography className="question-container">
                        {getAnswerTitle(game)}
                    </Typography>
                    <ButtonGroup orientation="vertical">
                        {answersToShow?.map((answer) => (
                            <AnswerButton
                                answer={answer}
                                key={answer.answerName}
                                isRoundEnd={isRoundEnd}
                                selectedAnswer={selectedAnswer}
                                isDisabled={buttonsDisabled}
                                onClick={onAnswerClick}
                            />
                        ))}
                    </ButtonGroup>
                    <Button disabled={buttonsDisabled && isRoundEnd} onClick={onAnswerClick}>
                        SKIP ROUND
                    </Button>
                </div>

                <Button onClick={() => navigator("/")}>
                    <Typography>На главную</Typography>
                    <Home />
                </Button>
            </Container>
        </Container>
    );
};
*/
/*
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
    const {game} = useGameContext();
    const { timeLeft, formatTime } = useTimer();

    //Для отображения надписи/вопроса в начале каждого раунда

    const curRound = game?.roundCounter || 0;
    const [answerQuestion, setAnswerQuestion] = useState<string>("");

    useEffect(() => {
        const answerQuestion = game?.roundsInfo[curRound]?.answerTitle;
        if (!isRoundEnd && answerQuestion) {
            setAnswerQuestion(answerQuestion);
        }
    }, [curRound, isRoundEnd, game]);
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

    useEffect(()=>{
        if (answerQuestion){
            currentAnswers = 
        }
    },[])

    return (
        <Container className="start-game" sx={{
            display: "flex",
            flexDirection: "row"
        }}>


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


            <div className="image-container">
                <div className="main-image">
                    <ShowFullScreenProvider>
                        <GameImage ref={imgRef} game={game} />
                    </ShowFullScreenProvider>
                </div>
            </div>


            {/*<Container className="control-part">*/}