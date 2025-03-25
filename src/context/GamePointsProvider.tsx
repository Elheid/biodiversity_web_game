import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GamePointsType {
    firstRoundPoints: number;
    setFirstRoundPoints: (disabled: number) => void;

    secondRoundPoints: number;
    setSecondRoundPoints: (disabled: number) => void;
};

const GamePointsContext = createContext<GamePointsType | undefined>(undefined);;

interface GamePointsProps {
    children: ReactNode;
}

export const GamePointsProvider: React.FC<GamePointsProps> = ({ children }) => {
    const [firstRoundPoints, setFirstRoundPoints] = useState(0);

    const [secondRoundPoints, setSecondRoundPoints] = useState(0);


    return (
        <GamePointsContext.Provider value={{ secondRoundPoints, firstRoundPoints, setSecondRoundPoints, setFirstRoundPoints }}>
        {children}
        </GamePointsContext.Provider>
    );
};

export const useGamePointsContext = () =>{
    const context = useContext(GamePointsContext);
    if (context === undefined) {
        throw new Error("must used with provider");
    }
    return context;
};