import { useState } from 'react';
import { Game } from '../classes/game';
import { Species } from '../classes/animalSpecies';

export const useGameState = () => {
    const [game, setGame] = useState<Game>();
    const [isRoundEnd, setIsRoundEnd] = useState(false);
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    const [currentRound, setCurrentRound] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<Species | null>(null);

    const handleAnswerSelect = (answerName: string, game?: Game) => {
        game?.RoundController.ChoiceAnswer(answerName);
        setButtonsDisabled(true);
        setSelectedAnswer(answerName as Species);
    };

    const nextRound = () => {
        setButtonsDisabled(false);
        setIsRoundEnd(false);
        setSelectedAnswer(null);
        setCurrentRound(prev => prev + 1);
    };

    return {
        game,
        setGame,
        isRoundEnd,
        buttonsDisabled,
        currentRound,
        selectedAnswer,
        handleAnswerSelect,
        nextRound
    };
};