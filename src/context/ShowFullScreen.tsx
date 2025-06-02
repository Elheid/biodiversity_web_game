import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Interface defining the shape of the ShowFullScreen context.
 */
interface ShowFullScreenType {
    showFullScreen: boolean;
    setShowFullScreen: (disabled: boolean) => void;
};

/**
 * React context for managing full screen display state.
 */
const ShowFullScreenContext = createContext<ShowFullScreenType | undefined>(undefined);

/**
 * Props for the ShowFullScreenProvider component.
 */
interface ShowFullScreenProps {
    children: ReactNode;
}

/**
 * ShowFullScreenProvider component provides the full screen display state context.
 */
export const ShowFullScreenProvider: React.FC<ShowFullScreenProps> = ({ children }) => {
    const [showFullScreen, setShowFullScreen] = useState(false);
    return (
        <ShowFullScreenContext.Provider value={{ showFullScreen, setShowFullScreen }}>
            {children}
        </ShowFullScreenContext.Provider>
    );
};

/**
 * Custom hook to access the ShowFullScreen context.
 * Throws an error if used outside of ShowFullScreenProvider.
 * @returns The ShowFullScreen context value.
 */
export const useShowFullScreen = () => {
    const context = useContext(ShowFullScreenContext);
    if (context === undefined) {
        throw new Error("must used with provider");
    }
    return context;
};
