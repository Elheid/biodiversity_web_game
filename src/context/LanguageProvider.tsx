import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { LANGUAGE } from '../config';

/**
 * Interface defining the shape of the Language context.
 */
interface LanguageType {
    language: LANGUAGE;
    setLanguage: React.Dispatch<React.SetStateAction<LANGUAGE>>;
};

/**
 * React context for the Language state.
 */
const LanguageContext = createContext<LanguageType | undefined>(undefined);

/**
 * Props for the LanguageProvider component.
 */
interface LanguageProps {
    children: ReactNode;
}

/**
 * LanguageProvider component provides the Language context to its children.
 * It initializes language state from localStorage and persists changes.
 */
export const LanguageProvider: React.FC<LanguageProps> = ({ children }) => {
    // Initialize language state from localStorage or default to Russian
    const [language, setLanguage] = useState<LANGUAGE>(() => {
        if (typeof window === 'undefined') {
            return LANGUAGE.RUSSIAN;
        }
        const savedLanguage = localStorage.getItem('app-language');
        if (savedLanguage && Object.values(LANGUAGE).includes(savedLanguage as LANGUAGE)) {
            return savedLanguage as LANGUAGE;
        }
        return LANGUAGE.RUSSIAN;
    });

    // Persist language changes to localStorage
    useEffect(() => {
        localStorage.setItem('app-language', language);
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

/**
 * Custom hook to access the Language context.
 * Throws an error if used outside of LanguageProvider.
 * @returns The Language context value.
 */
export const useLanguageContext = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguageContext must be used within a LanguageProvider");
    }
    return context;
};

/*import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LANGUAGE } from '../api/api';

interface LanguageType {
    language:LANGUAGE;
    setLanguage: React.Dispatch<React.SetStateAction<LANGUAGE >>
};

const LanguageContext = createContext<LanguageType | undefined>(undefined);;

interface LanguageProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProps> = ({ children }) => {
    const [language, setLanguage] = useState<LANGUAGE>("RUSSIAN");
    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
        {children}
        </LanguageContext.Provider>
    );
};

export const useLanguageContext = () =>{
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("must used with provider");
    }
    return context;
};*/