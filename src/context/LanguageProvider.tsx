import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { LANGUAGE } from '../api/api';


interface LanguageType {
    language: LANGUAGE;
    setLanguage: React.Dispatch<React.SetStateAction<LANGUAGE>>;
};

const LanguageContext = createContext<LanguageType | undefined>(undefined);

interface LanguageProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProps> = ({ children }) => {
    // Инициализация состояния с чтением из localStorage
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

    // Сохраняем изменения языка в localStorage
    useEffect(() => {
        localStorage.setItem('app-language', language);
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

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