import { useEffect } from "react";
import { setFirstRoundFromStorage, setSecondRoundFromStorage, useGamePointsContext } from "../context/GamePointsProvider";

/**
 * Custom React hook to reset game points for first and second rounds.
 * It resets points in both local storage and context state on mount.
 */
export const useResetPoints = () => {
    const { setFirstRoundPoints, setSecondRoundPoints } = useGamePointsContext();

    useEffect(() => {
        setFirstRoundFromStorage(0);
        setSecondRoundFromStorage(0);
        setFirstRoundPoints(0);
        setSecondRoundPoints(0);
    }, []);

    return;
};
