import { useEffect, useRef, useState } from 'react';
import { Game } from '../classes/game';
import { Species } from '../classes/animalSpecies';
import { Player } from '../classes/player';

import { getCurrAnswers } from '../utill';
import { useDisablButtonContext } from '../context/DisbleButtonsProvider';
import { useRoundEndContext } from '../context/RoundEndProvider';
import { CURRENT_DURATION_TIME, CURRENT_TIME_BEETWEN_ROUNDS } from '../config';
import { Answer, GameType, RoundsInfo } from '../interfaces/rounds';



export const useGameState = (roundsInfo: RoundsInfo, totalRounds: number, gameType?:GameType) => {
    const [game, setGame] = useState<Game>();
    const [gameStarted, setGameStarted] = useState(false);
    //const [isRoundEnd, setIsRoundEnd] = useState(false);
    const [currentRound, setCurrentRound] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<Species | null>(null);
    const [currentAnswers, setCurrentAnswers] = useState<Answer[]>([]);

    const {buttonsDisabled, setButtonsDisabled}= useDisablButtonContext()
    const {isRoundEnd, setIsRoundEnd} = useRoundEndContext();

    const scoreRef = useRef<HTMLSpanElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const stateRef = useRef<HTMLSpanElement>(undefined);

    // Инициализация игры
    useEffect(() => {
        if (scoreRef.current && imgRef.current) {
            const player = new Player();
            const game = new Game(
                player,
                totalRounds,
                roundsInfo,
                scoreRef.current,
                imgRef.current,
                stateRef.current,
                CURRENT_DURATION_TIME,
                CURRENT_TIME_BEETWEN_ROUNDS,
                gameType
            );
            setGame(game);
            game.startGame();
            setGameStarted(true);

            setButtonsDisabled(true);

            const onChoiceAnswer = (e: CustomEventInit<number>) => {
                setIsRoundEnd(true);
                game?.nextRound(e, () => {
                    setButtonsDisabled(true);
                    setIsRoundEnd(false);
                    setSelectedAnswer(null);
                    setCurrentRound(prev => prev + 1);
                });
            };

            window.addEventListener("choice-answer", onChoiceAnswer)
            return ()=>{
                setIsRoundEnd(false);
                window.removeEventListener("choice-answer", onChoiceAnswer)
                if (game) {
                    game.stopGame();
                }
            }
        }
    }, [roundsInfo,totalRounds, setButtonsDisabled]);

    useEffect(()=>{
        if (gameStarted)
            setCurrentAnswers(getCurrAnswers(game))
    },[gameStarted, game, currentRound])


    // Обработчик выбора ответа
    const handleAnswerSelect = (answerName: string) => {
        game?.RoundController.ChoiceAnswer(answerName);
        setButtonsDisabled(true);
        setSelectedAnswer(answerName as Species);
    };

    // Переход к следующему раунду
    const nextRound = () => {
        setButtonsDisabled(false);
        setIsRoundEnd(false);
        setSelectedAnswer(null);
        setCurrentRound(prev => {
            const newRound = prev + 1;
            setCurrentAnswers(game?.getRoundAnswers() || []);
            return newRound;
        });
    };


    return {
        game,
        isRoundEnd,
        buttonsDisabled,
        currentRound,
        selectedAnswer,
        currentAnswers,
        scoreRef,
        imgRef,
        stateRef,
        handleAnswerSelect,
        nextRound,
        setIsRoundEnd
    };
};