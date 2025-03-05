import { Box, Button, Container, List, Paper, Typography } from "@mui/material";
import { Game, RoundsInfo } from "../../classes/game";
import { Player } from "../../classes/player";
import { useEffect, useRef, useState } from "react";
import { Answer, GamePictures } from "../../classes/gameRound";
import { Species } from "../../classes/animalSpecies";


import giraff from "../../assets/img/giraff.png"
import deer from "../../assets/img/deer.png"
import { AnswerButton } from "../AnswerButton";
import { useTimer } from "../../hooks/useTimer";

const answers: Answer[] = [
    {
        answerName: Species.deer,
        isAnswerTrue: true
    },
    {
        answerName: Species.giraffe,
        isAnswerTrue: false
    },
    {
        answerName: Species.hog,
        isAnswerTrue: false
    },
]

const answers2: Answer[] = [
    {
        answerName: Species.deer,
        isAnswerTrue: false
    },
    {
        answerName: Species.giraffe,
        isAnswerTrue: true
    },
    {
        answerName: Species.hog,
        isAnswerTrue: false
    },
]


const getCurrAnswers = (game: Game | undefined): Answer[] => {
    if (game)
        return game.getRoundAnswers();
    throw new Error("game not found")
}

const gamePictures: GamePictures[] = [
    { pictureId: 1, pictureUrl: deer, resultPictureUrl: deer },
    { pictureId: 2, pictureUrl: giraff, resultPictureUrl: giraff }
]


const gameInfo: RoundsInfo = {
    0: { answers: answers, gamePictures: gamePictures[0] },
    1: { answers: answers2, gamePictures: gamePictures[1] }
}

export const StartGame = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [game, setGame] = useState<Game>();
    //const [timeLeft, setTimeLeft] = useState<number>(0);

    const [isRoundEnd, setIsRoundEnd] = useState<boolean>(false)

    const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);


    const scoreRef = useRef<HTMLSpanElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const stateRef = useRef<HTMLSpanElement>(null);

    const [currentRound, setCurrentRound] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<Species | null>(null);

    const [currentAnswers, setCurrentAnswers] = useState<Answer[]>([]);


    const {timeLeft, formatTime}= useTimer(game)

    const onAnswerClick =( e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const answerName = e.currentTarget.textContent;
        game?.RoundController.ChoiceAnswer(answerName || "-1");
        setButtonsDisabled(true);
        setSelectedAnswer(answerName as Species);
    }

    useEffect(()=>{
        if (gameStarted)
            setCurrentAnswers(getCurrAnswers(game))
    },[gameStarted, game, currentRound])


    useEffect(() => {
        if (scoreRef.current && imgRef.current && stateRef.current) {
            const player = new Player();
            const game = new Game(player, 2, gameInfo, scoreRef.current, stateRef.current, imgRef.current, 40000);
            setGame(game);
            const onChoiceAnswer = (e: CustomEventInit<number>) => {
                setIsRoundEnd(true);
                game?.nextRound(e, () => {
                    setButtonsDisabled(false);
                    setIsRoundEnd(false);
                    setSelectedAnswer(null);
                    setCurrentRound(prev => prev + 1);
                });
            };



            window.addEventListener("choice-answer", onChoiceAnswer)
            game.startGame();
            setGameStarted(true);
        }

        return () => {
            const onChoiceAnswer = (e: CustomEventInit<number>) => game?.nextRound(e, () => setButtonsDisabled(false))
            window.removeEventListener("choice-answer", onChoiceAnswer)
        };
    }, []);

    useEffect(() => {
        const nav = (e: CustomEventInit<number>) => window.location.href = "/end/" + e.detail;
        window.addEventListener("game-end", nav)

        return () => {
            // Очистка при размонтировании
            window.removeEventListener("game-end", nav)
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
                <img style={{ maxWidth: "50vw" }} ref={imgRef} src="123"></img>
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
            <Typography ref={stateRef}>{ }</Typography>
            <Button onClick={onAnswerClick}>SKIP ROUND</Button>
        </Container>
    );
};
