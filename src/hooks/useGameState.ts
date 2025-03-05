import { useEffect, useRef, useState } from 'react';
import { Game, RoundsInfo } from '../classes/game';
import { Species } from '../classes/animalSpecies';
import { Player } from '../classes/player';
import { Answer } from '../classes/gameRound';
import { getCurrAnswers } from '../utill';
import { useDisablButtonContext } from '../context/DisbleButtonsProvider';



export const useGameState = (roundsInfo: RoundsInfo, totalRounds: number) => {
    const [game, setGame] = useState<Game>();
    const [gameStarted, setGameStarted] = useState(false);
    const [isRoundEnd, setIsRoundEnd] = useState(false);
    const [currentRound, setCurrentRound] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<Species | null>(null);
    const [currentAnswers, setCurrentAnswers] = useState<Answer[]>([]);

    const {buttonsDisabled, setButtonsDisabled}= useDisablButtonContext()

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
                40000
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