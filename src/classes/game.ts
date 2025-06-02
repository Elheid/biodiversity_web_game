
/**
 * Represents the main Game class that manages game state, rounds, score, and timer.
 */
import { BASE_DURATION_TIME, BASE_TIME_BEETWEN_ROUNDS, START_ROUND, START_SCORE } from "../config";
import { setFirstRoundFromStorage, setSecondRoundFromStorage } from "../context/GamePointsProvider";
import { Coordinates } from "../interfaces/coordinates";
import { Answer, GameType, RoundsInfo } from "../interfaces/rounds";
import { GameRound } from "./gameRound";

import { Player } from "./player";
import { Timer } from "./timer";

const HOLLOW_PICTURES = { pictureId: 0, pictureUrl: '', resultPictureUrl: '', coordinates: { x: 0, y: 0, height: 0, width: 0 } };

/**
 * Game class manages the overall game logic including rounds, score, timer, and UI updates.
 */
export class Game {

    protected player: Player;
    public rounds: number;
    public roundCounter: number;
    public score: number;
    public RoundController: GameRound;

    public timeBetweenRounds: number;

    public scoreRef: HTMLSpanElement;
    public imageRef: HTMLImageElement;
    public roundStateRef: HTMLSpanElement | undefined;

    public roundsInfo: RoundsInfo;

    public roundTitle = "";

    public timer: Timer;
    private _durationTime: number;

    public gameType: GameType;

    /**
     * Constructs a new Game instance.
     * @param player - The player object.
     * @param rounds - Total number of rounds in the game.
     * @param scoreRef - Reference to the HTML element displaying the score.
     * @param imageRef - Reference to the HTML image element for displaying round images.
     * @param roundStateRef - Optional reference to the HTML element displaying round state.
     * @param durationTime - Optional duration time for each round.
     * @param timeBetweenRounds - Optional time interval between rounds.
     * @param gameType - Optional game type (firstType or secondType).
     * @param roundsInfo - Optional rounds information data.
     */
    constructor(player: Player, rounds: number, scoreRef: HTMLSpanElement, imageRef: HTMLImageElement, roundStateRef?: HTMLSpanElement, durationTime?: number, timeBetweenRounds?: number, gameType?: GameType, roundsInfo?: RoundsInfo) {
        this.player = player;

        this.rounds = rounds;
        this.roundCounter = START_ROUND;

        if(roundsInfo) this.roundsInfo = roundsInfo;
        else this.roundsInfo = {};

        this.score = START_SCORE;

        this.RoundController = new GameRound(this.player, [], HOLLOW_PICTURES, 0, () => this.changeRoundState());

        this.scoreRef = scoreRef;
        this.imageRef = imageRef;
        this.roundStateRef = roundStateRef;

        this._durationTime = durationTime ? durationTime : BASE_DURATION_TIME;

        this.timer = new Timer(this._durationTime);

        this.timer.onTimeout(() => {
            console.log("Game time out");
            this.finishGame();
        });

        this.timeBetweenRounds = timeBetweenRounds ? timeBetweenRounds : BASE_TIME_BEETWEN_ROUNDS;

        this.gameType = gameType ? gameType : GameType.firstType;
    }

    /**
     * Restarts the game with new parameters.
     * @param player - The player object.
     * @param rounds - Total number of rounds.
     * @param roundsInfo - Information about rounds.
     * @param scoreRef - Reference to score display element.
     * @param imageRef - Reference to image display element.
     * @param roundStateRef - Optional reference to round state display element.
     * @param durationTime - Optional duration time per round.
     * @param timeBetweenRounds - Optional time between rounds.
     * @param gameType - Optional game type.
     */
    public restartNewGame(player: Player, rounds: number, roundsInfo: RoundsInfo, scoreRef: HTMLSpanElement, imageRef: HTMLImageElement, roundStateRef?: HTMLSpanElement, durationTime?: number, timeBetweenRounds?: number, gameType?: GameType): void {
        this.player = player;

        this.rounds = rounds;
        this.roundsInfo = roundsInfo;
        this.roundCounter = START_ROUND;

        this.score = START_SCORE;

        this.RoundController = new GameRound(this.player, [], HOLLOW_PICTURES, 0, () => this.changeRoundState());

        this.scoreRef = scoreRef;
        this.imageRef = imageRef;
        this.roundStateRef = roundStateRef;

        this._durationTime = durationTime ? durationTime : BASE_DURATION_TIME;

        this.timer = new Timer(this._durationTime);

        this.timer.onTimeout(() => {
            console.log("Game time out");
            this.finishGame();
        });

        this.timeBetweenRounds = timeBetweenRounds ? timeBetweenRounds : BASE_TIME_BEETWEN_ROUNDS;

        this.gameType = gameType ? gameType : GameType.firstType;

        this.startGame();
    }

    /**
     * Logs the result message with the current score.
     * @param message - Message to log.
     */
    protected showResult(message: string): void {
        console.log(message + this.score);
    }

    /**
     * Gets the remaining time on the timer.
     * @returns Remaining time in milliseconds.
     */
    public getTimerValue(): number {
        return this.timer.remainingTime;
    }

    /**
     * Gets the current round's answers.
     * @returns Array of answers.
     */
    public getRoundAnswers(): Answer[] {
        return this.RoundController.returnCurrentAnswers();
    }

    /**
     * Gets the base picture URL for the current round.
     * @returns Picture URL string.
     */
    public returnBaseRoundPicture(): string {
        return this.RoundController.returnCurrentPictures().pictureUrl;
    }

    /**
     * Gets the result picture URL for the current round.
     * @returns Result picture URL string or empty string if none.
     */
    public returnResultRoundPicture(): string {
        return this.RoundController.returnCurrentPictures().resultPictureUrl || "";
    }

    /**
     * Gets the coordinates of the picture for the current round.
     * @returns Coordinates object or undefined.
     */
    public returnPictureCoordinates(): Coordinates | undefined {
        return this.RoundController.returnCurrentPictures().coordinates;
    }

    /**
     * Changes the source of the full screen image element.
     * @param src - New image source URL.
     */
    public changeImageOfFullScreen(src: string): void {
        const imageFull = document.querySelectorAll("img.image");
        if (imageFull.length > 1) {
            const imgElement = imageFull[1] as HTMLImageElement;
            if (imgElement) {
                imgElement.src = src;
            } else {
                console.error("The selected element is not an HTMLImageElement.");
            }
        }
    }

    /**
     * Changes the displayed picture to the result picture.
     */
    public changePictureToResult(): void {
        this.imageRef.src = this.returnResultRoundPicture();
        this.changeImageOfFullScreen(this.returnResultRoundPicture());
    }

    /**
     * Changes the displayed picture to the base picture at the start of the round.
     */
    public changePictureOnStart(): void {
        this.imageRef.src = this.returnBaseRoundPicture();
        this.changeImageOfFullScreen(this.returnBaseRoundPicture());
    }

    /**
     * Returns the current game type.
     * @returns GameType enum value.
     */
    public returnGameType(): GameType {
        return this.gameType;
    }

    /**
     * Checks if the game is of the second type.
     * @returns True if gameType is secondType, else false.
     */
    public isThisSecondType(): boolean {
        return this.gameType === GameType.secondType;
    }

    /**
     * Checks if the current round is won by the player.
     * @returns True if round state is 'win', else false.
     */
    public isRoundWin() {
        return this.RoundController.player.playerGetRoundState() === 'win';
    }

    /**
     * Increments the score and updates storage and UI.
     */
    public changeScore(): void {
        this.score++;
        if(this.gameType === GameType.firstType) setFirstRoundFromStorage(this.score);
        if(this.gameType === GameType.secondType) setSecondRoundFromStorage(this.score);
        if (this.scoreRef) {
            this.scoreRef.textContent = (this.score).toString();
        }
    }

    /**
     * Updates the round state display.
     */
    public changeRoundState(): void {
        const roundState = this.RoundController.player.playerGetRoundState();
        if (this.roundStateRef)
            this.roundStateRef.textContent = roundState;
    }

    /**
     * Updates the rounds information with new data.
     * @param newRoundsInfo - New rounds information to merge.
     */
    updateRoundsInfo(newRoundsInfo: RoundsInfo) {
        this.roundsInfo = {
            ...this.roundsInfo,
            ...newRoundsInfo
        };
    }

    /**
     * Advances to the next round asynchronously.
     * @param e - Custom event with round detail.
     * @param onNextRoundStart - Callback to execute on next round start.
     * @param loadOnStart - Callback to execute to load resources on start.
     */
    public async nextRound(e: CustomEventInit<number>, onNextRoundStart: () => void, loadOnStart:()=>void): Promise<void> {
        const detail = e.detail;

        this.timer.pause(); // Pause timer at round end

        const isAnswerTrue =  await this.RoundController.checkAnswer(this.gameType);
        this.changeRoundState();
        this.roundCounter++;

        if (isAnswerTrue) {
            this.changeScore();
            console.log("start new Round");
        }
        this.RoundController.finishRound();
        window.setTimeout(async () => {
            await onNextRoundStart();
            await loadOnStart();
            this.startGame();
            this.timer.start(); // Resume timer at round start
        }, this.timeBetweenRounds);

        console.log(detail);
    }

    /**
     * Finishes the game and dispatches a game-end event with the final score.
     */
    public finishGame(): void {
        console.log("Game Ends");
        const endEvent = new CustomEvent<number>("game-end", { detail: this.score });
        window.dispatchEvent(endEvent);
    }

    /**
     * Starts the game or next round.
     */
    public startGame(): void {
        if (this.roundCounter === START_ROUND) this.timer.start();

        if (this.roundCounter >= this.rounds) {
            this.finishGame();
            return;
        }

        if (this.roundsInfo){
            const answers = this.roundsInfo[0].answers;
            const pictures = this.roundsInfo[0].gamePictures;

            const roundId = this.roundsInfo[0].id;

            this.roundTitle = this.roundsInfo[0].answerTitle || "";
            this.RoundController = new GameRound(this.player, answers, pictures, roundId, () => this.changeRoundState());
            this.RoundController.startRound();
            this.changeRoundState();
            this.changePictureOnStart();
        }
    }

    /**
     * Stops the game timer and cleans up the round controller.
     */
    public stopGame(): void {
        this.timer.stop();
        this.RoundController.cleanup();
    }

    /**
     * Resets the game timer and performs additional reset logic.
     */
    publicresetGame(): void {
        this.timer.destroy();
        // Additional game reset logic can be added here
    }

    /*
        updateRoundsInfo(newRoundsInfo: RoundsInfo) {
            this.roundsInfo = { ...this.roundsInfo, ...newRoundsInfo };
            this.RoundController.updateRounds(this.roundsInfo);
        }
    */
}
