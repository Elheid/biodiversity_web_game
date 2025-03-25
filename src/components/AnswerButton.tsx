

import { Species } from "../classes/animalSpecies";

import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { AnswerButtonStyle } from "../style/AnswerButtonStyle"
import { Answer } from "../interfaces/rounds";


interface AnswerButtonProps {
    answer: Answer;
    isAnswerTrue:boolean;
    isRoundEnd: boolean;
    selectedAnswer: Species | null;

    isDisabled: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}


enum ButtonImage {
    disableButton = "disable-button",
    trueButton = "true-button",
    falseButton = "false-button",
    normalButton = "normal-button"
}

export const AnswerButton = ({
    answer,
    isAnswerTrue,
    isRoundEnd,
    selectedAnswer,
    isDisabled,
    onClick
}: AnswerButtonProps) => {
    const [className, setClassName] = useState<string>(ButtonImage.disableButton);

    //const { game } = useGameContext();

    //const curRound = game?.roundCounter || 0;
    //const animalInQuestion = game?.roundsInfo[curRound]?.answerTitle;

    useEffect(() => {
        if (isDisabled) setClassName(ButtonImage.disableButton);
        else setClassName(ButtonImage.normalButton);
       /* if (isRoundEnd) {
            if (isAnswerTrue && answer.answerName === selectedAnswer) {
                setClassName(ButtonImage.trueButton);
            } else if (answer.answerName === selectedAnswer && !isAnswerTrue) {
                setClassName(ButtonImage.falseButton);
            }
        } else {*/
            if (answer.answerName === selectedAnswer) {
                if (answer.answerName === selectedAnswer) {
                    setClassName(isAnswerTrue
                        ? ButtonImage.trueButton
                        : ButtonImage.falseButton);
                }
            }
        //}

    }, [isDisabled, isRoundEnd, selectedAnswer, answer, isAnswerTrue]);


    //if (!game?.isThisSecondType()) {
        return (
            <Button
                disabled={isDisabled}
                onClick={onClick}
                className={`${className} background-icon`}
                sx={AnswerButtonStyle}
            >
                {answer.answerName}
            </Button>
        );
    //}
};