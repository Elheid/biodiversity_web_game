import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Interface defining the shape of the DisbleButtons context.
 */
interface DisbleButtonsType {
    buttonsDisabled: boolean;
    setButtonsDisabled: (disabled: boolean) => void;
};

/**
 * React context for managing buttons disabled state.
 */
const DisbleButtonsContext = createContext<DisbleButtonsType | undefined>(undefined);

/**
 * Props for the DisbleButtonsProvider component.
 */
interface DisbleButtonsProps {
    children: ReactNode;
}

/**
 * DisbleButtonsProvider component provides the buttons disabled state context.
 */
export const DisbleButtonsProvider: React.FC<DisbleButtonsProps> = ({ children }) => {
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    return (
        <DisbleButtonsContext.Provider value={{ buttonsDisabled, setButtonsDisabled }}>
            {children}
        </DisbleButtonsContext.Provider>
    );
};

/**
 * Custom hook to access the DisbleButtons context.
 * Throws an error if used outside of DisbleButtonsProvider.
 * @returns The DisbleButtons context value.
 */
export const useDisablButtonContext = () => {
    const context = useContext(DisbleButtonsContext);
    if (context === undefined) {
        throw new Error("must used with provider");
    }
    return context;
};
