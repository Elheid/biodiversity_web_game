/*import { useEffect, useState } from "react";
import { useLanguageContext } from "../context/LanguageProvider";

export const useGetTextInLang = (startText: string) => {
    const { language } = useLanguageContext();
    const [text, setText] = useState<string>(startText)
    useEffect(() => {
        const fetchStartButtonText = async () => {
            setStartButtonText(await getStartButtonText(language) || startText)
        }
        fetchStartButtonText()
    })
    return { text, setText }
}*/

// hooks/useText.ts
//import { useEffect, useState } from 'react';
import { useLanguageContext } from '../context/LanguageProvider';
import { CURRENT_DURATION_TIME, DEFAULT_TEXTS, DURATION_TIME_GRAD_TEXT, LANGUAGE, TextKey } from '../config';
import { getTexts } from '../api/api';
import { renderDynamicText } from '../utill';
import { useQuery } from '@tanstack/react-query';


export const useTextLang = (textKey: TextKey) => {
    const { language } = useLanguageContext();

    const query = useQuery({
        queryKey: ['text', textKey, language], // Уникальный ключ для кеширования
        queryFn: async () => {
            const data = await getTexts(textKey);
            return  data.texts.ENGLISH;
        }, // Время устаревания данных (можно настроить по необходимости)
        initialData: DEFAULT_TEXTS[textKey], // Начальные данные
        refetchOnWindowFocus: false, // Отключаем повторные запросы при фокусе
    });

    // Обрабатываем динамический текст
    const translatedText = language === LANGUAGE.ENGLISH ? query.data : DEFAULT_TEXTS[textKey];
    const addVariable = renderDynamicText(translatedText, {
        CURRENT_DURATION_TIME: CURRENT_DURATION_TIME.toString(),
        DURATION_TIME_GRAD_TEXT: DURATION_TIME_GRAD_TEXT
    });

    return {
        text: addVariable.length > 1 ? addVariable.join(" ") : translatedText,
        isLoading: query.isLoading || translatedText,
        error: query.error ? 'Ошибка загрузки текста ' + query.error : null
    };
};

/*export const useTextLang = (textKey: TextKey) => {
    const { language, } = useLanguageContext();
    const [text, setText] = useState(DEFAULT_TEXTS[textKey]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true)
        let isMounted = true;

        const fetchText = async () => {
            try {
                const data = await getTexts(textKey);
                const translatedText = data.texts[language] || data.texts.ENGLISH;

                if (isMounted) {
                    const addVariable = renderDynamicText(translatedText, {"CURRENT_DURATION_TIME": CURRENT_DURATION_TIME.toString(), "DURATION_TIME_GRAD_TEXT":DURATION_TIME_GRAD_TEXT})
                    if (addVariable.length > 1) setText(addVariable.join(" "))
                    //console.log(addVariable)
                    else setText(translatedText);
                    setIsLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError('Ошибка загрузки текста ' + err);
                    setIsLoading(false);
                }
            }
        };

        fetchText();

        return () => {
            isMounted = false;
            setIsLoading(true);
        };
    }, [language, textKey]);

    return { text, isLoading, error };
};*/

