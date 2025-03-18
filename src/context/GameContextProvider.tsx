import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Game } from '../classes/game';

interface GameType {
    game: Game | undefined;
    setGame: React.Dispatch<React.SetStateAction<Game | undefined>>
};

const GameContext = createContext<GameType | undefined>(undefined);;

interface GameProps {
    children: ReactNode;
}

export const GameProvider: React.FC<GameProps> = ({ children }) => {
    const [game, setGame] = useState<Game | undefined>(undefined);
    return (
        <GameContext.Provider value={{ game, setGame }}>
        {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () =>{
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error("must used with provider");
    }
    return context;
};