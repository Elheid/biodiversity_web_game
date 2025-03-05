import { Game } from "./classes/game";
import { Answer } from "./classes/gameRound";

export const getCurrAnswers = (game: Game | undefined): Answer[] => {
    if (game)
        return game.getRoundAnswers();
    throw new Error("game not found")
}
