/**
 * BaseOfGame component manages the main game interface and logic.
 * It handles game rounds, answers, timers, and navigation.
 * 
 * @param props - BaseGameProps containing optional gameType and getNextGameInfo.
 * @returns JSX.Element representing the game UI.
 */
import { Button, ButtonGroup, Container, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GameType, RoundsInfo } from "../../interfaces/rounds";
import { Game } from "../../classes/game";
import { useGameState } from "../../hooks/useGameState";
import { useGameContext } from "../../context/GameContextProvider";
import { getTrueAnswer } from "../../api/api";
import { useNavigate, useParams } from "react-router";
import { useGamePointsContext } from "../../context/GamePointsProvider";
import { ImageContainer } from "../ImageContainer";
import { TimerComponent } from "../TimerComponent";
import { AnswerButton } from "../AnswerButton";
import { HomeButton } from "../HomeButtons";
import { setRoundsBodyStyle } from "../../utill";

import { AMOUNTS_OF_ROUNDS,
    SKIP_ROUND_BUTTON_TEXT_default,
    /*YES_NO_BUTTONS_TEXT*/} from "../../config";
import { useLanguageContext } from "../../context/LanguageProvider";
import { useTextLang } from "../../hooks/useTextLang";
import { LoadingForPreparedWithChildren } from "../LoadingForPrepared";

interface BaseGameProps {
    //getGameInfo: () => RoundsInfo; // Уточните тип согласно вашей реализацииs
    getNextGameInfo?: () => RoundsInfo; // Optional function to get next game info
    gameType?: GameType; // Optional game type to determine game mode
    //onlyFirstRound?:boolean;
}

const getAnswerTitle = (game: Game | undefined): string | undefined => {
    // Helper function to get the current round's title from the game object
    return game?.roundTitle;
}

export const BaseOfGame = ({ gameType, /*onlyFirstRound = false*/ }: BaseGameProps) => {
    // Destructure game state and handlers from custom hook useGameState
    const {
        isRoundEnd,
        buttonsDisabled,
        selectedAnswer,
        currentAnswers,
        scoreRef,
        imgRef,
        handleAnswerSelect,
        setButtonsDisabled
    } = useGameState(AMOUNTS_OF_ROUNDS, gameType);

    // Load localized text strings and loading states using useTextLang hook
    const { text:SCROE_TEXT, isLoading: isLoadingScore } = useTextLang('SCROE_TEXT');
    const { text:SKIP_ROUND_BUTTON_TEXT, isLoading: isLoadingRound } = useTextLang('SKIP_ROUND_BUTTON_TEXT');
    const { text:TARGET_ANIMAL_TITLE, isLoading: isLoadingTitle } = useTextLang('TARGET_ANIMAL_TITLE');
    const { text:TRAGET_ANIMAL_SUBTITILE, isLoading: isLoadingSubtitle } = useTextLang('TRAGET_ANIMAL_SUBTITILE');

    const { text:IS_THIS_ANIMAL_NAME, isLoading: isLoadingAnimalQuestion } = useTextLang('IS_THIS_ANIMAL_NAME');
    const { text:YES_NO_BUTTONS_TEXT_yes, isLoading: isLoadingYes } = useTextLang('YES_NO_BUTTONS_TEXT_yes');
    const { text:YES_NO_BUTTONS_TEXT_no , isLoading: isLoadingNo} = useTextLang('YES_NO_BUTTONS_TEXT_no');

    // Get URL parameter onlyFirst from react-router useParams hook
    const {onlyFirst} = useParams<{onlyFirst:string}>()

    // Set body style for rounds on component mount
    useEffect(()=>{
        setRoundsBodyStyle()
    },[])

    // Get game object from context
    const { game } = useGameContext();

    // State to control display of Yes/No buttons
    const [showYesNo, setShowYesNo] = useState<boolean>(true);

    // State to store the true answer string
    const [trueAnswer, setTrueAnswer] = useState<string>("");

    // Get current language from context
    const {language} = useLanguageContext();

    // Effect to handle round start event and fetch true answer
    useEffect(() => {
        const onRoundStart = (e: CustomEventInit<number>) => {
            if (game && game.roundsInfo[0] && game.roundsInfo[0].id) {
                const type = gameType || GameType.firstType;
                getTrueAnswer(type === GameType.firstType ? "first-round" : "second-round", e.detail || -1)
                    .then(res => setTrueAnswer(res.names[language]))
            }
            if (gameType === GameType.secondType) {
                setShowYesNo(true)
            } else {
                setShowYesNo(false)
            }
        };

        window.addEventListener("round-start", onRoundStart);
        return () => window.removeEventListener("round-start", onRoundStart);

    }, [gameType, game]);

    const [answersToShow, setAnswersToShow] = useState<
        { answerName: string; isAnswerTrue: boolean }[]
    >([]);

    useEffect(() => {
        if (game) {
            const YesNoAnswers = [
                { answerName: YES_NO_BUTTONS_TEXT_yes, isAnswerTrue: false },
                { answerName: YES_NO_BUTTONS_TEXT_no, isAnswerTrue: false },
            ]

            const secondType = game.isThisSecondType();
            const showEcondRoundAnsw = showYesNo && secondType;

            console.log("currentAnswers:", currentAnswers); // Логируем currentAnswers

            const newAnswersToShow = showEcondRoundAnsw
                ? YesNoAnswers
                : currentAnswers ? currentAnswers : YesNoAnswers;

            console.log("newAnswersToShow:", newAnswersToShow); // Логируем newAnswersToShow

            setAnswersToShow(newAnswersToShow);
            if (newAnswersToShow === YesNoAnswers) setButtonsDisabled(false)
            else if (secondType)setButtonsDisabled(false);
        } else {
            setAnswersToShow(currentAnswers);
        }
    }, [showYesNo, game, currentAnswers]);


    const navigator = useNavigate();
    const { setFirstRoundPoints, setSecondRoundPoints } = useGamePointsContext()

    useEffect(() => {
        const points = (e: CustomEventInit<number>) => e.detail || 0;
        const nav = () => navigator(`/end`);
        const onGameEnd = (e: CustomEventInit<number>) => {
            if (gameType === GameType.secondType) {
                setSecondRoundPoints(points(e));
                nav();
            } else {
                if (onlyFirst){
                    setFirstRoundPoints(points(e));
                    navigator(`/end`, { replace: true });
                }
                else{
                    setFirstRoundPoints(points(e));
                    navigator(`/first-round-end`, { replace: true });
                }
            }
        };

        window.addEventListener("game-end", onGameEnd);
        return () => window.removeEventListener("game-end", onGameEnd);
    }, [game]);

    // Обработчик события "checked-answer"
    useEffect(() => {
        const onCheckedAnswer = (e: CustomEventInit<{
            answerName: string;
            result: boolean;
        }>) => {
            const title = getAnswerTitle(game)//game?.roundsInfo[curRound]?.answerTitle;
            if (e.detail && e.detail.result === false && e.detail.answerName === title && trueAnswer !== title/*answerQuestion*/) {
                setShowYesNo(false); // Если ответ неверный, показываем currentAnswers
            }
        };

        window.addEventListener("checked-answer", onCheckedAnswer);
        return () => window.removeEventListener("checked-answer", onCheckedAnswer);
    }, [game]);


    const onAnswerClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const answerName = e.currentTarget.textContent;
        setButtonsDisabled(true)
        if (game?.isThisSecondType() && showYesNo) {
            // Если есть answerQuestion и показываем "Да" и "Нет", передаем answerQuestion
            const choice = getAnswerTitle(game) || ""//game?.roundsInfo[curRound]?.answerTitle || "";
            game?.RoundController.isAnswerTrue(choice, GameType.secondType).then(res => {
                const answer = answerName === YES_NO_BUTTONS_TEXT_yes ? choice : YES_NO_BUTTONS_TEXT_no;
                if (res || (!res && answerName === YES_NO_BUTTONS_TEXT_yes))
                    handleAnswerSelect(answer);
            })
        } else if (answerName) {
            // Иначе передаем текст кнопки

            handleAnswerSelect(answerName);
        }
    };

    const onSkipClick = (/*e: React.MouseEvent<HTMLButtonElement, MouseEvent>*/) => {
        //const answerName = e.currentTarget.textContent || "";
        handleAnswerSelect(SKIP_ROUND_BUTTON_TEXT_default);
    }


    //const [isRoundPrepared, setIsPrepared] = useState(false)

    /*useEffect(()=>{
        const onRoundStart = ()=>{
            setIsPrepared(true)
        }
        const onRoundEnd = ()=>{
            setIsPrepared(false)
        }
        window.addEventListener("round-start", onRoundStart);
        window.addEventListener("round-end", onRoundEnd);

        return () => {
            window.removeEventListener("round-start", onRoundStart);
            window.removeEventListener("round-end", onRoundEnd);
        }
    },)*/


    const isLoading =isLoadingScore 
        && isLoadingRound 
        && isLoadingTitle 
        && isLoadingSubtitle 
        && isLoadingYes 
        && isLoadingNo
        && isLoadingAnimalQuestion
    /*if (isLoading || !isRoundPrepared){
        return (
            <Loading />
        )
    }  */
    useEffect(()=>{
        if(isLoading)setButtonsDisabled(true)
    },[isLoading])

    return (
        <LoadingForPreparedWithChildren isLoading={isLoading ? false : true} haveRounds={true}>
            <Container className="start-game" sx={{ display: "flex", flexDirection: "row" }}>
            <Paper sx={{ display: "none" }}>
                {SCROE_TEXT}:
                <Typography ref={scoreRef}>{0}</Typography>
            </Paper>

            <div className="description">
                <Typography variant="h4" component="h2">
                    {TARGET_ANIMAL_TITLE}
                </Typography>
                <Typography variant="body1" component="h2">
                    {TRAGET_ANIMAL_SUBTITILE}
                </Typography>
            </div>




            {<ImageContainer ref={imgRef} game={game} />}

            {game && <TimerComponent timer={game?.timer} />}

            <div className="buttons">
                {game && game.isThisSecondType() && <Typography className="question-container">
                    {IS_THIS_ANIMAL_NAME} {getAnswerTitle(game)}?
                </Typography>}
                <ButtonGroup orientation={window.innerWidth < 782 ? 'horizontal' : 'vertical'}>
                    {answersToShow?.map((answer) => (
                        <AnswerButton
                            parentTitle={getAnswerTitle(game)}
                            key={answer.answerName}
                            answer={answer}
                            isRoundEnd={isRoundEnd}
                            trueAnswer={trueAnswer}
                            selectedAnswer={selectedAnswer}
                            isDisabled={buttonsDisabled}
                            onClick={onAnswerClick}
                        />
                    ))}
                </ButtonGroup>
                <Button disabled={buttonsDisabled && isRoundEnd} onClick={onSkipClick}>{SKIP_ROUND_BUTTON_TEXT}</Button>
                <HomeButton />
            </div>
            {/*</Container>*/}
        </Container>
        </LoadingForPreparedWithChildren>

    );

};