
import { Game } from "./classes/game";
import { Answer } from "./interfaces/rounds";

export const getCurrAnswers = (game: Game | undefined): Answer[] => {
    if (game)
        return game.getRoundAnswers();
    throw new Error("game not found")
}



export const setMainPageBodyStyle = ()=>{  
    document.body.className = ""  
    document.body.classList.add("background")  
    document.body.classList.add("background-main")  
}  
export const setStartRoundsBodyStyle = ()=>{  
    document.body.className = ""  
    document.body.classList.add("background")  
    document.body.classList.add("background-rounds-start")  
}  

export const setRoundsBodyStyle = ()=>{  
    document.body.className = ""  
    document.body.classList.add("background")  
    document.body.classList.add("background-rounds")  
}  

export const setEndBodyStyle = ()=>{  
    document.body.className = ""  
    document.body.classList.add("background")  
    document.body.classList.add("background-end")  
}

