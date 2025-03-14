import { useCallback, useRef, useState } from "react";
import { getRandomRound, MyRoutes } from "../api/api";
import { GameType, RoundsInfo } from "../interfaces/rounds";
import { mapFirstRound, mapSecondRound } from "../utill";

export const useLazyRounds = (gameType: GameType) => {
    const [roundsInfo, setRoundsInfo] = useState<RoundsInfo>({});
    const loadedRounds = useRef<Set<number>>(new Set());

    const loadRound = useCallback(async (roundNumber: number) => {
        if (loadedRounds.current.has(roundNumber)) return;

        try {

            const currRound = gameType === GameType.firstType
                ? MyRoutes.FIRST_ROUND
                : MyRoutes.SECOND_ROUND;

            const data = await getRandomRound(currRound);
            const mapper = gameType === GameType.firstType
                ? mapFirstRound
                : mapSecondRound;

            setRoundsInfo(prev => ({
                ...prev,
                [roundNumber]: mapper(data)
            }));

            loadedRounds.current.add(roundNumber);
        } catch (error) {
            console.error('Error loading round:', error);
        }
    }, [gameType]);

    return { roundsInfo, loadRound };
};