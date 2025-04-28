import { BASE_DURATION_TIME, BASE_TIME_BEETWEN_ROUNDS, START_ROUND, START_SCORE } from "../config";
import { setFirstRoundFromStorage, setSecondRoundFromStorage } from "../context/GamePointsProvider";
import { Coordinates } from "../interfaces/coordinates";
import { Answer, GameType, RoundsInfo } from "../interfaces/rounds";
import { GameRound } from "./gameRound";

import { Player } from "./player";
import { Timer } from "./timer";


const HOLLOW_PICTURES = { pictureId: 0, pictureUrl: '', resultPictureUrl: '', coordinates: { x: 0, y: 0, height: 0, width: 0 } };

export class Game {

    protected player: Player;
    public rounds: number;
    public roundCounter: number;
    public score: number;
    public RoundController: GameRound;

    public timeBetweenRounds: number;


    public scoreRef: HTMLSpanElement;
    public imageRef: HTMLImageElement
    public roundStateRef: HTMLSpanElement | undefined;

    public roundsInfo: RoundsInfo;

    public roundTitle = "";

    public timer: Timer;
    private _durationTime: number;

    public gameType: GameType;


    constructor(player: Player, rounds: number, scoreRef: HTMLSpanElement, imageRef: HTMLImageElement, roundStateRef?: HTMLSpanElement, durationTime?: number, timeBetweenRounds?: number, gameType?: GameType, roundsInfo?: RoundsInfo) {
        this.player = player;

        this.rounds = rounds;
        this.roundCounter = START_ROUND;

        if(roundsInfo)this.roundsInfo = roundsInfo;
        else this.roundsInfo = {};

        this.score = START_SCORE;

        this.RoundController = new GameRound(this.player, [], HOLLOW_PICTURES, 0, () => this.changeRoundState());

        this.scoreRef = scoreRef;
        this.imageRef = imageRef;
        this.roundStateRef = roundStateRef;

        if (durationTime) this._durationTime = (durationTime)
        else this._durationTime = (BASE_DURATION_TIME)

        this.timer = new Timer(this._durationTime);

        this.timer.onTimeout(() => {
            console.log("Game time out");
            this.finishGane()
        })

        if (timeBetweenRounds) this.timeBetweenRounds = timeBetweenRounds
        else this.timeBetweenRounds = BASE_TIME_BEETWEN_ROUNDS;

        if (gameType) this.gameType = gameType
        else this.gameType = GameType.firstType;
    }

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

        if (durationTime) this._durationTime = (durationTime)
        else this._durationTime = (BASE_DURATION_TIME)

        this.timer = new Timer(this._durationTime);

        this.timer.onTimeout(() => {
            console.log("Game time out");
            this.finishGane()
        })

        if (timeBetweenRounds) this.timeBetweenRounds = timeBetweenRounds
        else this.timeBetweenRounds = BASE_TIME_BEETWEN_ROUNDS;

        if (gameType) this.gameType = gameType
        else this.gameType = GameType.firstType;

        this.startGame()
    }

    protected showResult(message: string): void {
        console.log(message + this.score);
    }

    public getTimerValue(): number {
        //if (this.RoundController)
        return this.timer.remainingTime;
    }
    public getRoundAnswers(): Answer[] {
        return this.RoundController.returnCurrentAnswers();
    }
    public returnBaseRoundPicture(): string {
        return this.RoundController.returnCurrentPictures().pictureUrl;
    }
    public returnResultRoundPicture(): string {
        return this.RoundController.returnCurrentPictures().resultPictureUrl ||"";
    }

    public returnPictureCoordinates(): Coordinates | undefined {
        return this.RoundController.returnCurrentPictures().coordinates;
    }



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

    public changePictureToResult(): void {
        this.imageRef.src = this.returnResultRoundPicture();
        this.changeImageOfFullScreen(this.returnResultRoundPicture());
    }

    public changePictureOnStart(): void {
        //if (this.gameType === GameType.firstType) {
            this.imageRef.src = this.returnBaseRoundPicture()//newUrl
            this.changeImageOfFullScreen(this.returnBaseRoundPicture());
        //}
        //else this.imageRef.src = this.returnResultRoundPicture()
    }



    public returnGameType(): GameType {
        return this.gameType
    }

    public isThisSecondType(): boolean {
        return this.gameType === GameType.secondType;
    }

    public isRoundWin() {
        return this.RoundController.player.playerGetRoundState() === 'win';
    }


    public changeScore(): void {
        this.score++;
        if(this.gameType === GameType.firstType) setFirstRoundFromStorage(this.score) 
        if(this.gameType === GameType.secondType) setSecondRoundFromStorage(this.score) 
        if (this.scoreRef) {
            this.scoreRef.textContent = (this.score).toString();
        }
    }

    public changeRoundState(): void {
        const roundState = this.RoundController.player.playerGetRoundState();
        if (this.roundStateRef)
            this.roundStateRef.textContent = roundState;
    }

    updateRoundsInfo(newRoundsInfo: RoundsInfo) {
        this.roundsInfo = {
            ...this.roundsInfo,
            ...newRoundsInfo
        };
    }


    /*public nextRound(e: CustomEventInit<number>, onNextRoundStart?: () => void): void {
        const isAnswerTrue =  this.RoundController.checkAnswer(this.gameType);
        this.changeRoundState()
        this.roundCounter++;
        if (isAnswerTrue) {
            this.changeScore();
            console.log("start new Round")
        }
        window.setTimeout(() => {
            this.startGame();
            onNextRoundStart?.()
        }, this.timeBetweenRounds);
        console.log(e.detail)
    }*/

    public async nextRound(e: CustomEventInit<number>, onNextRoundStart: () => void, loadOnStart:()=>void): Promise<void> {
        // Сохраняем данные события, так как они могут быть недоступны позже
        const detail = e.detail;

        this.timer.pause(); //остановить, на время окончания раунда

        const isAnswerTrue =  await this.RoundController.checkAnswer(this.gameType);
                this.changeRoundState();
                this.roundCounter++;

                if (isAnswerTrue) {
                    this.changeScore();
                    console.log("start new Round");
                }

                window.setTimeout(async () => {
                    await onNextRoundStart();
                    await loadOnStart();
                    this.startGame();
                    this.timer.start(); //восстановиьт, на время начала раунда
                }, this.timeBetweenRounds);

                console.log(detail);
    }


    public finishGane(): void {
        console.log("Game Ends");
        const endEvent = new CustomEvent<number>("game-end", { detail: this.score })
        window.dispatchEvent(endEvent)
    }

    public startGame(): void {
        if (this.roundCounter === START_ROUND) this.timer.start();

        if (this.roundCounter >= this.rounds) {
            this.finishGane()
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
            this.changePictureOnStart()
        }
    }

    public stopGame(): void {
        this.timer.stop();
        this.RoundController.cleanup();
    }

    publicresetGame(): void {
        this.timer.destroy();
        // Дополнительная логика сброса состояния игры
    }

    /*
        updateRoundsInfo(newRoundsInfo: RoundsInfo) {
            this.roundsInfo = { ...this.roundsInfo, ...newRoundsInfo };
            this.RoundController.updateRounds(this.roundsInfo);
        }*/

}