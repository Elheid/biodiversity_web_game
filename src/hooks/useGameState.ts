import { useEffect, useRef, useState } from 'react';
import { Game } from '../classes/game';
import { Species } from '../classes/animalSpecies';
import { Player } from '../classes/player';

import { getCurrAnswers } from '../utill';
import { useDisablButtonContext } from '../context/DisbleButtonsProvider';
import { useRoundEndContext } from '../context/RoundEndProvider';
import { CURRENT_DURATION_TIME, CURRENT_TIME_BEETWEN_ROUNDS } from '../config';
import { Answer, GameType } from '../interfaces/rounds';
import { useLazyRounds } from './useLazyRounds';
import { useGameContext } from '../context/GameContextProvider';



export const useGameState = (totalRounds: number, gameType?:GameType) => {
    const {game, setGame} = useGameContext();
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

    const { roundsInfo, loadRound } = useLazyRounds();

    /*useEffect(() => {
        if (game)
            loadRound(game);
    }, [currentRound, loadRound, game]);*/
    

    // Инициализация игры
    useEffect(() => {
        if (scoreRef.current && imgRef.current) {
            const player = new Player();
            const game = new Game(
                player,
                totalRounds,
                scoreRef.current,
                imgRef.current,
                stateRef.current,
                CURRENT_DURATION_TIME,
                CURRENT_TIME_BEETWEN_ROUNDS,
                gameType,
                roundsInfo,
            );
            setGame(game);

            const start = async()=>{
                await loadRound(game)
                game.startGame();
                setGameStarted(true);
    
                setButtonsDisabled(true);
            }
            start();
            const onChoiceAnswer = (e: CustomEventInit<number>) => {
                setIsRoundEnd(true);
                game?.nextRound(e, () => {
                    setButtonsDisabled(true);
                    setIsRoundEnd(false);
                    setSelectedAnswer(null);
                    setCurrentRound(prev => prev + 1);
                
                }, ()=>loadRound(game));
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
    }, [totalRounds, setButtonsDisabled]);

    useEffect(()=>{
        if (gameStarted)
            setCurrentAnswers(getCurrAnswers(game))

        const onCheckedAnswer = () => {
            if (game?.isThisSecondType())setCurrentAnswers(getCurrAnswers(game))
        };
        const onRoundStart = ()=>{
            console.log("round start")
            setCurrentAnswers(getCurrAnswers(game))
        }

        window.addEventListener("checked-answer", onCheckedAnswer);

        window.addEventListener("round-start", onRoundStart);

        return () => {
            window.removeEventListener("checked-answer", onCheckedAnswer);
            window.removeEventListener("round-start", onRoundStart);
        }

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