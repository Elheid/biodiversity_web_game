import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

/**
 * Interface defining the shape of the GamePoints context.
 */
interface GamePointsType {
    firstRoundPoints: number;
    setFirstRoundPoints: (points: number) => void;
    secondRoundPoints: number;
    setSecondRoundPoints: (points: number) => void;
};

/**
 * React context for managing game points state.
 */
const GamePointsContext = createContext<GamePointsType | undefined>(undefined);

/**
 * Props for the GamePointsProvider component.
 */
interface GamePointsProps {
    children: ReactNode;
}

/**
 * Helper function to get initial points state from localStorage.
 * @param key - The localStorage key.
 * @returns The parsed number or 0 if not found or invalid.
 */
export const getInitialState = (key: string): number => {
    if (typeof window === 'undefined') return 0;
    const saved = localStorage.getItem(key);
    if (saved === null) return 0;
    const parsed = parseInt(saved, 10);
    return isNaN(parsed) ? 0 : parsed;
};

/**
 * Get first round points from localStorage.
 * @returns The first round points.
 */
export const getFirstRoundFromStorage = (): number => {
    return getInitialState("firstRoundPoints");
};

/**
 * Get second round points from localStorage.
 * @returns The second round points.
 */
export const getSecondRoundFromStorage = (): number => {
    return getInitialState("secondRoundPoints");
};

/**
 * Set first round points in localStorage.
 * @param score - The score to set.
 */
export const setFirstRoundFromStorage = (score: number): void => {
    localStorage.setItem('firstRoundPoints', score.toString());
};

/**
 * Set second round points in localStorage.
 * @param score - The score to set.
 */
export const setSecondRoundFromStorage = (score: number): void => {
    localStorage.setItem('secondRoundPoints', score.toString());
};

/**
 * GamePointsProvider component provides the game points state context.
 */
export const GamePointsProvider: React.FC<GamePointsProps> = ({ children }) => {
    const [firstRoundPoints, setFirstRoundPoints] = useState(() =>
        getInitialState('firstRoundPoints')
    );

    const [secondRoundPoints, setSecondRoundPoints] = useState(() =>
        getInitialState('secondRoundPoints')
    );

    useEffect(() => {
        setFirstRoundFromStorage(firstRoundPoints);
    }, [firstRoundPoints]);

    useEffect(() => {
        setSecondRoundFromStorage(secondRoundPoints);
    }, [secondRoundPoints]);

    return (
        <GamePointsContext.Provider
            value={{
                firstRoundPoints,
                setFirstRoundPoints,
                secondRoundPoints,
                setSecondRoundPoints
            }}
        >
            {children}
        </GamePointsContext.Provider>
    );
};

/**
 * Custom hook to access the GamePoints context.
 * Throws an error if used outside of GamePointsProvider.
 * @returns The GamePoints context value.
 */
export const useGamePointsContext = () => {
    const context = useContext(GamePointsContext);
    if (context === undefined) {
        throw new Error("useGamePointsContext must be used within a GamePointsProvider");
    }
    return context;
};
