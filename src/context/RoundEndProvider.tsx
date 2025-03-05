import React, { createContext, useContext, useState, ReactNode } from 'react';

interface RoundEndType {
    isRoundEnd: boolean;
    setIsRoundEnd: (disabled: boolean) => void;
};

const RoundEndContext = createContext<RoundEndType | undefined>(undefined);;

interface RoundEndProps {
    children: ReactNode;
}

export const RoundEndProvider: React.FC<RoundEndProps> = ({ children }) => {
    const [isRoundEnd, setIsRoundEnd] = useState(false);
    return (
        <RoundEndContext.Provider value={{ isRoundEnd, setIsRoundEnd }}>
        {children}
        </RoundEndContext.Provider>
    );
};

export const useRoundEndContext = () =>{
    const context = useContext(RoundEndContext);
    if (context === undefined) {
        throw new Error("useGameContext must be used within a DisableButtonsProvider");
    }
    return context;
};