import { isAnswerCorrect, MyRoutes } from "../api/api";
import { Answer, GamePictures, GameType } from "../interfaces/rounds";
import { isSpecies } from "./animalSpecies";
import { Player } from "./player";

export class GameRound {
    private _answers: Answer[];
    public  player: Player;
    private _gamePictures: GamePictures;
    private onFinishRound?: () => void;
    public roundId:number;




    constructor(player:Player, _answers: Answer[], _gamePictures:GamePictures, roundId:number, onFinishRound?: () => void) {
        this.player = player;
        this._answers = _answers;
        this._gamePictures = _gamePictures;
        this.onFinishRound = onFinishRound;

        this.roundId = roundId;
    }

    public getRoundId():number{
        return this.roundId;
    }

    public returnPlayerRoundState(){
        return this.player.roundState;
    }

    public returnCurrentAnswers():Answer[]{
        return this._answers;
    }
    public returnCurrentPictures():GamePictures{
        return this._gamePictures;
    }


    public startRound():void{
        this.player.newRound();
        const startEvent = new CustomEvent<number>("round-start", { detail: this.roundId});
        window.dispatchEvent(startEvent)
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
        this.player.choiceName = name;

        const answerEvent = new CustomEvent<string>("choice-answer", {detail:name})
        window.dispatchEvent(answerEvent)
    }

    public async isAnswerTrue(choice:string, roundType:GameType){
        const route = roundType === GameType.firstType ? MyRoutes.FIRST_ROUND:MyRoutes.SECOND_ROUND;
        const isAnswerTrueObj = await isAnswerCorrect(route, this.roundId, choice || "");
        const isAnswerTrue = isAnswerTrueObj.isCorrect;

        if( roundType === GameType.secondType ){
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

    public async checkAnswer(roundType:GameType):Promise<boolean>{
        const choice = this.player.selectChoice()
        if (!choice || !isSpecies(choice)) return false;
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

        const isAnswerTrue = this.isAnswerTrue(choice, roundType)
        if (isAnswerTrue) return isAnswerTrue;

        this.player.playerLose();
        this.finishRound();
        return false;
    }

    public cleanup(): void {
        // 1. Удаляем обработчики событий
        
        // 2. Обнуляем коллбэки
        this.onFinishRound = undefined;
        
        // 3. Дополнительные очистки при необходимости
        // (например, если есть таймеры в расширенной логике)
    }

}