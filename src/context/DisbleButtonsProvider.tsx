import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DisbleButtonsType {
    buttonsDisabled: boolean;
    setButtonsDisabled: (disabled: boolean) => void;
};

const DisbleButtonsContext = createContext<DisbleButtonsType | undefined>(undefined);;

interface DisbleButtonsProps {
    children: ReactNode;
}

export const DisbleButtonsProvider: React.FC<DisbleButtonsProps> = ({ children }) => {
    const [buttonsDisabled, setButtonsDisabled] = useState(false);
    return (
        <DisbleButtonsContext.Provider value={{ buttonsDisabled, setButtonsDisabled }}>
        {children}
        </DisbleButtonsContext.Provider>
    );
};

export const useDisablButtonContext = () =>{
    const context = useContext(DisbleButtonsContext);
    if (context === undefined) {
        throw new Error("useGameContext must be used within a DisableButtonsProvider");
    }
    return context;
};