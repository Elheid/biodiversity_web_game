/**
 * Custom React hook to manage the game state and interactions.
 */
import { useEffect, useRef, useState } from 'react';
import { Game } from '../classes/game';

import { Player } from '../classes/player';

import { getCurrAnswers } from '../utill';
import { useDisablButtonContext } from '../context/DisbleButtonsProvider';
import { useRoundEndContext } from '../context/RoundEndProvider';
import { CURRENT_DURATION_TIME, CURRENT_TIME_BEETWEN_ROUNDS } from '../config';
import { Answer, GameType } from '../interfaces/rounds';
import { useLazyRounds } from './useLazyRounds';
import { useGameContext } from '../context/GameContextProvider';

/**
 * useGameState hook manages the game lifecycle, current round, answers, and UI state.
 * @param totalRounds - Total number of rounds in the game.
 * @param gameType - Optional game type to determine game mode.
 * @returns Object containing game state and handlers.
 */
export const useGameState = (totalRounds: number, gameType?: GameType) => {
    const {game, setGame} = useGameContext();
    const [gameStarted, setGameStarted] = useState(false);
    //const [isRoundEnd, setIsRoundEnd] = useState(false);
    const [currentRound, setCurrentRound] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [currentAnswers, setCurrentAnswers] = useState<Answer[]>([]);

    const {buttonsDisabled, setButtonsDisabled}= useDisablButtonContext();
    const {isRoundEnd, setIsRoundEnd} = useRoundEndContext();

    const scoreRef = useRef<HTMLSpanElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const stateRef = useRef<HTMLSpanElement>(undefined);

    const { roundsInfo, loadRound } = useLazyRounds();

    /*useEffect(() => {
        if (game)
            loadRound(game);
    }, [currentRound, loadRound, game]);*/
    
    // Initialize the game when refs are available
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

            const start = async () => {
                await loadRound(game);
                game.startGame();
                setGameStarted(true);
    
                setButtonsDisabled(true);
            };
            start();

            const onChoiceAnswer = (e: CustomEventInit<number>) => {
                setIsRoundEnd(true);
                game?.nextRound(e, () => {
                    setButtonsDisabled(true);
                    setIsRoundEnd(false);
                    setSelectedAnswer(null);
                    setCurrentRound(prev => prev + 1);
                }, () => loadRound(game));
            };

            window.addEventListener("choice-answer", onChoiceAnswer);
            return () => {
                setIsRoundEnd(false);
                window.removeEventListener("choice-answer", onChoiceAnswer);
                if (game) {
                    game.stopGame();
                }
            };
        }
    }, [totalRounds, setButtonsDisabled]);

    // Update current answers on game start, checked answer, or round start events
    useEffect(() => {
        if (gameStarted)
            setCurrentAnswers(getCurrAnswers(game));

        const onCheckedAnswer = () => {
            if (game?.isThisSecondType()) setCurrentAnswers(getCurrAnswers(game));
        };
        const onRoundStart = () => {
            console.log("round start");
            setCurrentAnswers(getCurrAnswers(game));
        };

        window.addEventListener("checked-answer", onCheckedAnswer);
        window.addEventListener("round-start", onRoundStart);

        return () => {
            window.removeEventListener("checked-answer", onCheckedAnswer);
            window.removeEventListener("round-start", onRoundStart);
        };
    }, [gameStarted, game, currentRound]);

    /**
     * Handles answer selection by the user.
     * @param answerName - The selected answer name.
     */
    const handleAnswerSelect = (answerName: string) => {
        game?.RoundController.ChoiceAnswer(answerName);
        setButtonsDisabled(true);
        setSelectedAnswer(answerName);
    };

    /**
     * Advances to the next round and resets relevant state.
     */
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
        setIsRoundEnd,
        setButtonsDisabled
    };
};
