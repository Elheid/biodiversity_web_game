import { Button } from "@mui/material";
import { Answer } from "../classes/gameRound";

interface AnswerButtonProps {
    answer: Answer;
    isRoundEnd: boolean;
    selectedAnswer: Species | null;
    isDisabled: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const AnswerButton = ({
    answer,
    isRoundEnd,
    selectedAnswer,
    isDisabled,
    onClick
}: AnswerButtonProps) => {
    let backgroundColor = 'inherit';

    if (isRoundEnd) {
        if (answer.isAnswerTrue) {
            backgroundColor = 'green';
        } else if (answer.answerName === selectedAnswer) {
            backgroundColor = 'red';
        }
    } else {
        if (answer.answerName === selectedAnswer) {
            backgroundColor = answer.isAnswerTrue ? 'green' : 'red';
        }
    }

    return (
        <Button
            disabled={isDisabled}
            onClick={onClick}
            style={{ backgroundColor }}
        >
            {answer.answerName}
        </Button>
    );
};