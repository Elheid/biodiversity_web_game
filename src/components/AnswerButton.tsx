

import { Species } from "../classes/animalSpecies";

import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { AnswerButtonStyle } from "../style/AnswerButtonStyle"
import { Answer } from "../interfaces/rounds";


interface AnswerButtonProps {
    answer: Answer;
    isRoundEnd: boolean;
    selectedAnswer: Species | null;
    isDisabled: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}


enum ButtonImage{
    disableButton ="disable-button",
    trueButton = "true-button",
    falseButton = "false-button",
    normalButton = "normal-button"
}

export const AnswerButton = ({
    answer,
    isRoundEnd,
    selectedAnswer,
    isDisabled,
    onClick
}: AnswerButtonProps) => {
    const [className, setClassName] = useState<string>(ButtonImage.disableButton);

    useEffect(() => {
        if (isDisabled) setClassName(ButtonImage.disableButton);
        else setClassName(ButtonImage.normalButton);
        if (isRoundEnd) {
            if (answer.isAnswerTrue) {
                setClassName(ButtonImage.trueButton);
            } else if (answer.answerName === selectedAnswer) {
                setClassName(ButtonImage.falseButton);
            }
        } else {
            if (answer.answerName === selectedAnswer) {
                if (answer.answerName === selectedAnswer) {
                    setClassName(answer.isAnswerTrue 
                        ? ButtonImage.trueButton 
                        : ButtonImage.falseButton);
                }
            }
        }
        
    }, [isDisabled, isRoundEnd, selectedAnswer, answer]);



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
};