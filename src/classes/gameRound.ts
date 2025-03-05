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

    private _answers: Answer[];
    public  player: Player;
    private _gamePictures: GamePictures;
    private onFinishRound?: () => void;




    constructor(player:Player, _answers: Answer[], _gamePictures:GamePictures, onFinishRound?: () => void) {
        this.player = player;
        this._answers = _answers;
        this._gamePictures = _gamePictures;

        this.onFinishRound = onFinishRound;


    }
    public returnPlayerRoundState(){
        return this.player.roundState;
    }

    public returnCurrentAnswers():Answer[]{
        return this._answers;
    }

    public startRound():void{
        this.player.newRound();
        console.log("Game round started");
    }

    public finishRound():void{
        this.onFinishRound?.();

        console.log("Game round end");
        const endEvent = new CustomEvent<string>("round-end")
        window.dispatchEvent(endEvent)
    }


    public showResultPicture():void{
        console.log(this._gamePictures.resultPictureUrl);
    }

    public ChoiceAnswer(name:string):void{
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