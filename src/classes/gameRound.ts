import { Species } from "./animalSpecies";
import { Player } from "./player";
import { Timer } from "./timer";

export interface Answer {
    answerName: string,
    isAnswerTrue: boolean;

}

export interface GamePictures{
    pictureId: number,
    pictureUrl:string,
    resultPictureUrl:string
}

export class GameRound {

    public timer: Timer;
    private _durationTime = 100000;
    private _answers: Answer[];
    public  player: Player;
    private _gamePictures: GamePictures;
    private onFinishRound?: () => void;




    constructor(player:Player, _answers: Answer[], _gamePictures:GamePictures, onFinishRound?: () => void ,durationTime?:number) {
        this.player = player;
        this._answers = _answers;
        this._gamePictures = _gamePictures;
        if (durationTime) this.timer = new Timer(durationTime)
        else this.timer = new Timer(this._durationTime);

        this.onFinishRound = onFinishRound;

        this.timer.onTimeout(()=> {
            alert("Game round time out");
            this.finishRound();
        })

    }
    public returnPlayerRoundState(){
        return this.player.roundState;
    }

    public returnTimerValue():number{
        return this.timer.remainingTime;
    }

    public startRound():void{
        this.timer.start();
        this.player.newRound();
        console.log("Game round started");
    }

    public finishRound():void{
        this.onFinishRound?.();
        this.timer.stop();
        console.log("Game round end");
        const endEvent = new CustomEvent<string>("round-end")
        window.dispatchEvent(endEvent)
    }


    public showResultPicture():void{
        console.log(this._gamePictures.resultPictureUrl);
    }

    public ChoiceAnswer(name:string){
        this.player.choiceName = name as Species;

        const answerEvent = new CustomEvent<string>("choice-answer", {detail:name})
        window.dispatchEvent(answerEvent)
    }


    public checkAnswer():boolean{
        const choice = this.player.selectChoice()
        const expectedAnswer = this._answers.filter((answer)=>{
            return answer.isAnswerTrue
        })

        for (let i = 0; i < expectedAnswer.length; i++) {
            if (expectedAnswer[i].answerName === choice){
                this.player.playerWin();
                this.finishRound();
                return true;
            }
        }
        this.player.playerLose();
        this.finishRound();
        return false;
    }

}