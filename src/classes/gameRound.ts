/**
 * GameRound class manages a single round of the game, including answers, pictures, and player state.
 */
import { isAnswerCorrect, MyRoutes } from "../api/api";
import { SKIP_ROUND_BUTTON_TEXT } from "../config";
import { Answer, GamePictures, GameType } from "../interfaces/rounds";

import { Player } from "./player";

export class GameRound {
    private _answers: Answer[];
    public player: Player;
    private _gamePictures: GamePictures;
    private onFinishRound?: () => void;
    public roundId: number;

    /**
     * Constructs a new GameRound instance.
     * @param player - The player object.
     * @param _answers - Array of possible answers for the round.
     * @param _gamePictures - Pictures associated with the round.
     * @param roundId - Identifier for the round.
     * @param onFinishRound - Optional callback to execute when the round finishes.
     */
    constructor(player: Player, _answers: Answer[], _gamePictures: GamePictures, roundId: number, onFinishRound?: () => void) {
        this.player = player;
        this._answers = _answers;
        this._gamePictures = _gamePictures;
        this.onFinishRound = onFinishRound;

        this.roundId = roundId;
    }

    /**
     * Gets the round ID.
     * @returns The round identifier.
     */
    public getRoundId(): number {
        return this.roundId;
    }

    /**
     * Gets the player's current round state.
     * @returns The round state string.
     */
    public returnPlayerRoundState() {
        return this.player.roundState;
    }

    /**
     * Gets the current answers for the round.
     * @returns Array of answers.
     */
    public returnCurrentAnswers(): Answer[] {
        return this._answers;
    }

    /**
     * Gets the pictures associated with the round.
     * @returns GamePictures object.
     */
    public returnCurrentPictures(): GamePictures {
        return this._gamePictures;
    }

    /**
     * Starts the round by resetting player state and dispatching a round-start event.
     */
    public startRound(): void {
        this.player.newRound();
        const startEvent = new CustomEvent<number>("round-start", { detail: this.roundId });
        window.dispatchEvent(startEvent);
    }

    /**
     * Finishes the round by calling the finish callback and dispatching a round-end event.
     */
    public finishRound(): void {
        this.onFinishRound?.();

        console.log("Game round end");
        const endEvent = new CustomEvent<string>("round-end");
        window.dispatchEvent(endEvent);
    }

    /**
     * Logs the result picture URL to the console.
     */
    public showResultPicture(): void {
        console.log(this._gamePictures.resultPictureUrl);
    }

    /**
     * Sets the player's choice and dispatches a choice-answer event.
     * @param name - The chosen answer name.
     */
    public ChoiceAnswer(name: string): void {
        this.player.choiceName = name;

        const answerEvent = new CustomEvent<string>("choice-answer", { detail: name });
        window.dispatchEvent(answerEvent);
    }

    /**
     * Checks if the given choice is correct by calling the API.
     * Dispatches a checked-answer event for second type games.
     * @param choice - The chosen answer.
     * @param roundType - The type of the game round.
     * @returns Promise resolving to true if the answer is correct, false otherwise.
     */
    public async isAnswerTrue(choice: string, roundType: GameType) {
        const route = roundType === GameType.firstType ? MyRoutes.FIRST_ROUND : MyRoutes.SECOND_ROUND;
        const isAnswerTrueObj = await isAnswerCorrect(route, this.roundId, choice || "");
        const isAnswerTrue = isAnswerTrueObj.isCorrect;

        if (roundType === GameType.secondType) {
            const answerEvent = new CustomEvent("checked-answer", {
                detail: {
                    answerName: choice,
                    result: isAnswerTrue
                }
            });
            window.dispatchEvent(answerEvent);
        }

        return isAnswerTrue;
    }

    /**
     * Checks the player's selected answer and updates player state accordingly.
     * @param roundType - The type of the game round.
     * @returns Promise resolving to true if the answer is correct, false otherwise.
     */
    public async checkAnswer(roundType: GameType): Promise<boolean> {
        const choice = this.player.selectChoice();
        if (!choice || choice === SKIP_ROUND_BUTTON_TEXT) return false;

        /*const expectedAnswer = this._answers.filter((answer)=>{
            return answer.isAnswerTrue
        })

        for (let i = 0; i < expectedAnswer.length; i++) {
            if (expectedAnswer[i].answerName === choice){
                this.player.playerWin();
                this.finishRound();
                return true;
            }
        }*/

        const isAnswerTrue = await this.isAnswerTrue(choice, roundType);
        if (isAnswerTrue) return isAnswerTrue;

        this.player.playerLose();
        this.finishRound();
        return false;
    }

    /**
     * Cleans up the round by removing event handlers and callbacks.
     */
    public cleanup(): void {
        // 1. Remove event handlers

        // 2. Clear callbacks
        this.onFinishRound = undefined;

        // 3. Additional cleanup if needed
        // (e.g., timers in extended logic)
    }
}
