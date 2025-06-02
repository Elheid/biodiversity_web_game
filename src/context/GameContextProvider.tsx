import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Game } from '../classes/game';

/**
 * Interface defining the shape of the Game context.
 */
interface GameType {
    game: Game | undefined;
    setGame: React.Dispatch<React.SetStateAction<Game | undefined>>
};

/**
 * React context for the Game object.
 */
const GameContext = createContext<GameType | undefined>(undefined);

/**
 * Props for the GameProvider component.
 */
interface GameProps {
    children: ReactNode;
}

/**
 * GameProvider component provides the Game context to its children.
 */
export const GameProvider: React.FC<GameProps> = ({ children }) => {
    const [game, setGame] = useState<Game | undefined>(undefined);
    return (
        <GameContext.Provider value={{ game, setGame }}>
            {children}
        </GameContext.Provider>
    );
};

/**
 * Custom hook to access the Game context.
 * Throws an error if used outside of GameProvider.
 * @returns The Game context value.
 */
export const useGameContext = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error("must used with provider");
    }
    return context;
};
