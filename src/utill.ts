
import { Game } from "./classes/game";
import { Answer } from "./interfaces/rounds";

export const getCurrAnswers = (game: Game | undefined): Answer[] => {
    if (game)
        return game.getRoundAnswers();
    throw new Error("game not found")
}


export const renderDynamicText = (template:string, variables:Record<string, string> ) => {
    const regex = /\${(.*?)}/g;
    const parts = template.split(regex);

    return parts.map((part, index) => {
        if (index % 2 === 1) { // Нечетные индексы - названия переменных
            return variables[part] || '';
        }
        return part; // Четные индексы - статический текст
    });
};



export const setMainPageBodyStyle = () => {
    document.body.className = ""
    document.body.classList.add("background")
    document.body.classList.add("background-main")
}
export const setStartRoundsBodyStyle = () => {
    document.body.className = ""
    document.body.classList.add("background")
    document.body.classList.add("background-rounds-start")
}

export const setRoundsBodyStyle = () => {
    document.body.className = ""
    document.body.classList.add("background")
    document.body.classList.add("background-rounds")
}

export const setEndBodyStyle = () => {
    document.body.className = ""
    document.body.classList.add("background")
    document.body.classList.add("background-end")
}

