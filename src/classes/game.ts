import { Answer, GamePictures, GameRound } from "./gameRound";
import { Player } from "./player";

export interface RoundInfo{
    answers: Answer[]
    gamePictures:GamePictures
}

export type RoundsInfo = { [key: number]: RoundInfo }

export class Game {

    protected player: Player;
    public rounds: number;
    public roundCounter: number;
    public score: number;
    public RoundController : GameRound;


    public scoreRef: HTMLSpanElement;
    public imageRef:HTMLImageElement
    public roundStateRef:HTMLSpanElement;

    private roundsInfo: RoundsInfo;

    constructor(player:Player, rounds: number, roundsInfo:RoundsInfo ,scoreRef:HTMLSpanElement,roundStateRef:HTMLSpanElement, imageRef:HTMLImageElement) {
        this.player = player;

        this.rounds = rounds;
        this.roundsInfo = roundsInfo;
        this.roundCounter = 0;

        this.score = 0;

        this.RoundController = new GameRound(this.player,[],{pictureId:0, pictureUrl:'', resultPictureUrl:''}, ()=> this.changeRoundState());

        this.scoreRef = scoreRef;
        this.imageRef = imageRef;
        this.roundStateRef = roundStateRef;

    }

    protected showResult(message: string): void {
        console.log(message + this.score);
    }

    public getTimerValue(){
        //if (this.RoundController)
        return this.RoundController.returnTimerValue();
    }

    public changeScore(){
        this.score ++;
        if (this.scoreRef)
        {
            this.scoreRef.textContent = (this.score).toString();
        }
    }
    public changePictureOnStart(newUrl:string){
        this.imageRef.src = newUrl
    }
    public changeRoundState(){
        this.roundStateRef.textContent = this.RoundController.player.playerGetRoundState()
    }

    public nextRound(e:CustomEventInit<number>){
        const isTrue = this.RoundController.checkAnswer();
        this.changeRoundState()
        this.roundCounter++;
        if (isTrue) {
            this.changeScore();
            console.log("start new Round")
        }
        window.setTimeout(() => {
            this.startGame();
        }, 2000);
        console.log(e.detail)
    }

    public startGame(){

        if (this.roundCounter >= this.rounds) {
            console.log("Game Ends");
            const endEvent = new CustomEvent<number>("game-end", {detail:this.score})
            window.dispatchEvent(endEvent)
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