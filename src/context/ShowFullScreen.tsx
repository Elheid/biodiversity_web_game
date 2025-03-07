import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ShowFullScreenType {
    showFullScreen: boolean;
    setShowFullScreen: (disabled: boolean) => void;
};

const ShowFullScreenContext = createContext<ShowFullScreenType | undefined>(undefined);;

interface ShowFullScreenProps {
    children: ReactNode;
}

export const ShowFullScreenProvider: React.FC<ShowFullScreenProps> = ({ children }) => {
    const [showFullScreen, setShowFullScreen] = useState(false);
    return (
        <ShowFullScreenContext.Provider value={{ showFullScreen, setShowFullScreen }}>
        {children}
        </ShowFullScreenContext.Provider>
    );
};

export const useShowFullScreen = () =>{
    const context = useContext(ShowFullScreenContext);
    if (context === undefined) {
        throw new Error("must used with provider");
    }
    return context;
};