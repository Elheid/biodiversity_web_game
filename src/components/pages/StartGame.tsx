import { Box, Button, Container, List, Paper, Typography } from "@mui/material";
import { Game, RoundsInfo } from "../../classes/game";
import { Player } from "../../classes/player";
import { useEffect, useRef, useState } from "react";
import { Answer, GamePictures } from "../../classes/gameRound";
import { Species } from "../../classes/animalSpecies";


import giraff from "../../assets/img/giraff.png"
import deer from "../../assets/img/deer.png"

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


const gamePictures: GamePictures[] = [
    { pictureId: 1, pictureUrl: deer, resultPictureUrl: deer },
    { pictureId: 2, pictureUrl: giraff, resultPictureUrl: giraff}
]

const gameInfo : RoundsInfo = {
    0 : {answers : answers, gamePictures : gamePictures[0]},
    1 : {answers : answers2, gamePictures : gamePictures[1]}
}

export const StartGame = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const [game, setGame] = useState<Game>();
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const timerRef = useRef<number>(undefined);

    const scoreRef = useRef<HTMLSpanElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const stateRef = useRef<HTMLSpanElement>(null);


    useEffect(() => {
        if (scoreRef.current && imgRef.current && stateRef.current) {
            const player = new Player();
            const game = new Game(player, 2, gameInfo, scoreRef.current, stateRef.current,imgRef.current);
            setGame(game);
            window.addEventListener("choice-answer", (e:CustomEventInit<number>) => game.nextRound(e))
            game.startGame();
            setGameStarted(true);

            // Запускаем интервал для обновления времени
            timerRef.current = window.setInterval(() => {
                if (game) {
                    // Получаем оставшееся время из таймера игры
                    const remaining = game.getTimerValue();
                    setTimeLeft(remaining);
                    
                    // Автоматическая остановка при завершении
                    if (remaining <= 0) {
                        window.clearInterval(timerRef.current);
                    }
                }
            }, 100); // Обновление каждые 100 мс для плавности
        }

        return () => {
            // Очистка при размонтировании
            window.clearInterval(timerRef.current);
            window.removeEventListener("choice-answer", (e:CustomEventInit<number>) => game?.nextRound(e))
        };
    }, []);

    useEffect(() => {
        const nav = (e:CustomEventInit<number>)=> window.location.href ="/end/" + e.detail;
        window.addEventListener("game-end", nav)

        return () => {
            // Очистка при размонтировании
            window.removeEventListener("game-end", nav)
        };
    },[])


    // Форматирование времени в MM:SS
    const formatTime = (ms: number) => {
        const seconds = Math.ceil(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <Container className="start-game">
            <Paper>
                <Typography variant="h5" component="h2">
                    {formatTime(timeLeft)}
                </Typography>
            </Paper>
            
            <Box>
                <Typography ref={stateRef}>{}</Typography>
                Очки:
                <Typography ref={scoreRef}>{}</Typography>
            </Box>

            <Container>
                <img style={{maxWidth:"50vw"}} ref={imgRef} src="123"></img>
            </Container>
            <List>
                {answers.map((answer) => (
                    <Button onClick={(e)=> game?.RoundController.ChoiceAnswer(e.currentTarget.textContent || "-1")} key={answer.answerName}>{answer.answerName}</Button>
                ))}
            </List>
        </Container>
    );
};