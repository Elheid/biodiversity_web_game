import { useCallback, useRef, useState } from "react";
import { getRandomRound, MyRoutes } from "../api/api";
import { GameType, RoundsInfo } from "../interfaces/rounds";
import { mapFirstRound, mapSecondRound } from "../mappingFromBack/mappingDTO";
import { useGameContext } from "../context/GameContextProvider";

import { Game } from "../classes/game";


export const useLazyRounds = () => {
    const [roundsInfo, setRoundsInfo] = useState<RoundsInfo>({});
    const {game} = useGameContext();
    const loadedRounds = useRef<Set<number>>(new Set());



    const loadRound = useCallback(async (game: Game) => {
        if (loadedRounds.current.has(game.roundCounter) || !game || game.roundCounter === game.rounds) return;
        const roundNumber = game.roundCounter
        try {

            const currRound = game.gameType === GameType.firstType
                ? MyRoutes.FIRST_ROUND
                : MyRoutes.SECOND_ROUND;

            const data = await getRandomRound(currRound);

            const mapper = game.gameType === GameType.firstType
                ? mapFirstRound
                : mapSecondRound;

            setRoundsInfo(prev => ({
                ...prev,
                [roundNumber]:mapper(data)
            }));

            game.updateRoundsInfo([mapper(data)])
            loadedRounds.current.add(roundNumber);
        } catch (error) {

            console.error('Error loading round:', error);
            
        }
    }, [game,roundsInfo]);

    return { roundsInfo, loadRound };
};