

import { Species } from "../classes/animalSpecies";

import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { AnswerButtonStyle } from "../style/AnswerButtonStyle"
import { Answer } from "../interfaces/rounds";
import { YES_NO_BUTTONS_TEXT } from "../config";


interface AnswerButtonProps {
    answer: Answer;
    parentTitle:string|undefined;
    trueAnswer:string;
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
    parentTitle,
    trueAnswer,
    isRoundEnd,
    selectedAnswer,
    isDisabled,
    onClick
}: AnswerButtonProps) => {
    const [className, setClassName] = useState<string>(ButtonImage.disableButton);

    useEffect(() => {
        
        let answerName = answer.answerName;
        if (parentTitle && answerName=== YES_NO_BUTTONS_TEXT.yes )     answerName = parentTitle;

        if (isDisabled) setClassName(ButtonImage.disableButton);
        else setClassName(ButtonImage.normalButton);
        if (isRoundEnd) {
            if (answerName === trueAnswer && trueAnswer !== "") {
                setClassName(ButtonImage.trueButton);
            } else if (answerName === selectedAnswer && trueAnswer !== "") {
                setClassName(ButtonImage.falseButton);
            }
        } else {
            if (selectedAnswer && answerName === selectedAnswer && trueAnswer !== "") {
                    setClassName(answerName === trueAnswer
                        ? ButtonImage.trueButton 
                        : ButtonImage.falseButton);
                
            }
        }
        
    }, [isDisabled, isRoundEnd, selectedAnswer, answer, trueAnswer]);
    //if (!game?.isThisSecondType()) {
        return (
            <Button
                disabled={isDisabled}
                onClick={onClick}
                className={`${className} background-icon`}
                sx={AnswerButtonStyle}
            >
                <Typography>
                {answer.answerName}
                </Typography>
            </Button>
        );
    //}
};