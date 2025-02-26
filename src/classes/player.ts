import { Species } from "./animalSpecies";

export class Player {
    public choiceName: Species | null;
    public roundState: "process" | "win" | "loose"  = "process";


    constructor() {
        this.choiceName = null;
    }

    public newRound():void{
        this.roundState = "process";
        this.choiceName = null;
    }

    public playerWin(){
        this.roundState = "win";
        console.log("Win")
    }
    playerLose(){
        this.roundState = "loose";
        console.log("loose")
    }

    playerGetRoundState(){
        return this.roundState;
    }


    public selectChoice():string | null{
        if (this.choiceName )
            return this.choiceName
        return null;
    }

}