// StartGame2.tsx

import { GameType } from "../../interfaces/rounds";
import { getGameInfo2 } from "../../tempInfo";
import { BaseOfGame } from "../BaseOfGame";

export const GameRoundSecond = () => (
  <BaseOfGame 
    getGameInfo={getGameInfo2}
    gameType={GameType.secondType}
  />
);