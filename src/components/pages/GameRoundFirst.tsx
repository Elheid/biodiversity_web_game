// StartGame.tsx
import { BaseOfGame } from "../BaseOfGame";
import { getGameInfo } from "../../tempInfo";

export const GameRoundFirst = () => (
    <BaseOfGame
        getGameInfo={getGameInfo}
    />
);