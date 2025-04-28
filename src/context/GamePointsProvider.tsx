import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface GamePointsType {
    firstRoundPoints: number;
    setFirstRoundPoints: (points: number) => void;
    secondRoundPoints: number;
    setSecondRoundPoints: (points: number) => void;
};

const GamePointsContext = createContext<GamePointsType | undefined>(undefined);

interface GamePointsProps {
    children: ReactNode;
}

export const getFirstRoundFromStorage = (): number =>{
    return getInitialState("firstRoundPoints")
}
export const getSecondRoundFromStorage = (): number =>{
    return getInitialState("secondRoundPoints")
}

export const setFirstRoundFromStorage = (score:number):void=>{
    localStorage.setItem('firstRoundPoints', score.toString());
}

export const setSecondRoundFromStorage = (score:number):void=>{
    localStorage.setItem('secondRoundPoints', score.toString());
}



const getInitialState = (key: string): number => {
    if (typeof window === 'undefined') return 0;
    const saved = localStorage.getItem(key);
    if (saved === null) return 0;
    const parsed = parseInt(saved, 10);
    return isNaN(parsed) ? 0 : parsed;
};

export const GamePointsProvider: React.FC<GamePointsProps> = ({ children }) => {
    const [firstRoundPoints, setFirstRoundPoints] = useState(() => 
        getInitialState('firstRoundPoints')
    );
    
    const [secondRoundPoints, setSecondRoundPoints] = useState(() => 
        getInitialState('secondRoundPoints')
    );

    useEffect(() => {
        //localStorage.setItem('firstRoundPoints', firstRoundPoints.toString());
        setFirstRoundFromStorage(firstRoundPoints)
    }, [firstRoundPoints]);

    useEffect(() => {
        //localStorage.setItem('secondRoundPoints', secondRoundPoints.toString());
        setSecondRoundFromStorage(secondRoundPoints)
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

export const useGamePointsContext = () => {
    const context = useContext(GamePointsContext);
    if (context === undefined) {
        throw new Error("useGamePointsContext must be used within a GamePointsProvider");
    }
    return context;
};

/*import React, { createContext, useContext, useState, ReactNode } from 'react';

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
};*/