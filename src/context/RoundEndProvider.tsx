import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Interface defining the shape of the RoundEnd context.
 */
interface RoundEndType {
    isRoundEnd: boolean;
    setIsRoundEnd: (disabled: boolean) => void;
};

/**
 * React context for managing round end state.
 */
const RoundEndContext = createContext<RoundEndType | undefined>(undefined);

/**
 * Props for the RoundEndProvider component.
 */
interface RoundEndProps {
    children: ReactNode;
}

/**
 * RoundEndProvider component provides the round end state context.
 */
export const RoundEndProvider: React.FC<RoundEndProps> = ({ children }) => {
    const [isRoundEnd, setIsRoundEnd] = useState(false);
    return (
        <RoundEndContext.Provider value={{ isRoundEnd, setIsRoundEnd }}>
            {children}
        </RoundEndContext.Provider>
    );
};

/**
 * Custom hook to access the RoundEnd context.
 * Throws an error if used outside of RoundEndProvider.
 * @returns The RoundEnd context value.
 */
export const useRoundEndContext = () => {
    const context = useContext(RoundEndContext);
    if (context === undefined) {
        throw new Error("must used with provider");
    }
    return context;
};
