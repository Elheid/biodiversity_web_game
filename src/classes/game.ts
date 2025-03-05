import { Answer, GamePictures, GameRound } from "./gameRound";
import { Player } from "./player";
import { Timer } from "./timer";

export interface RoundInfo{
    answers: Answer[]
    gamePictures:GamePictures
}

export type RoundsInfo = { [key: number]: RoundInfo }

const BASE_TIME_BEETWEN_ROUNDS = 1200;
const BASE_DURATION_TIME = 100000;
const START_ROUND = 0;
const START_SCORE = 0;
export class Game {

    protected player: Player;
    public rounds: number;
    public roundCounter: number;
    public score: number;
    public RoundController : GameRound;

    public timeBetweenRounds: number;


    public scoreRef: HTMLSpanElement;
    public imageRef:HTMLImageElement
    public roundStateRef:HTMLSpanElement;

    private roundsInfo: RoundsInfo;

    public timer: Timer;
    private _durationTime:number;


    constructor(player:Player, rounds: number, roundsInfo:RoundsInfo ,scoreRef:HTMLSpanElement,roundStateRef:HTMLSpanElement, imageRef:HTMLImageElement, durationTime?:number, timeBetweenRounds?:number) {
        this.player = player;

        this.rounds = rounds;
        this.roundsInfo = roundsInfo;
        this.roundCounter = START_ROUND;

        this.score = START_SCORE;

        this.RoundController = new GameRound(this.player,[],{pictureId:0, pictureUrl:'', resultPictureUrl:''}, ()=> this.changeRoundState());

        this.scoreRef = scoreRef;
        this.imageRef = imageRef;
        this.roundStateRef = roundStateRef;


        
        if (durationTime) this._durationTime = (durationTime)
        else this._durationTime = (BASE_DURATION_TIME)

        this.timer = new Timer(this._durationTime);

        this.timer.onTimeout(()=> {
            console.log("Game time out");
            this.finishGane()
        })


        if(timeBetweenRounds) this.timeBetweenRounds = timeBetweenRounds
        else this.timeBetweenRounds = BASE_TIME_BEETWEN_ROUNDS;



    }

    protected showResult(message: string): void {
        console.log(message + this.score);
    }

    public getTimerValue():number{
        //if (this.RoundController)
        return this.timer.remainingTime;
    }
    public getRoundAnswers():Answer[]{
        return this.RoundController.returnCurrentAnswers();
    }

    public changeScore():void{
        this.score ++;
        if (this.scoreRef)
        {
            this.scoreRef.textContent = (this.score).toString();
        }
    }
    public changePictureOnStart(newUrl:string):void{
        this.imageRef.src = newUrl
    }
    public changeRoundState():void{
        const roundState = this.RoundController.player.playerGetRoundState();
        this.roundStateRef.textContent = roundState;
    }
    public isRoundWin(){
        return this.RoundController.player.playerGetRoundState() === 'win';
    }

    public nextRound(e:CustomEventInit<number>,  onNextRoundStart?:()=>void):void{
        const isAnswerTrue = this.RoundController.checkAnswer();
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
    }

    public finishGane():void{
        console.log("Game Ends");
        const endEvent = new CustomEvent<number>("game-end", {detail:this.score})
        window.dispatchEvent(endEvent)
    }

    public startGame():void{
        if (this.roundCounter === START_ROUND) this.timer.start();
        
        if (this.roundCounter >= this.rounds) {
            this.finishGane()
            return;
        }
            const answers = this.roundsInfo[this.roundCounter].answers;
            const pictures = this.roundsInfo[this.roundCounter].gamePictures;
            this.RoundController = new GameRound(this.player, answers, pictures, ()=> this.changeRoundState());
            this.RoundController.startRound();
            this.changeRoundState();
            this.changePictureOnStart(pictures.pictureUrl)
        
    }
}