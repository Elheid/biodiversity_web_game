/**
 * Custom React hook to fetch and provide localized text based on the current language.
 */
import { useLanguageContext } from '../context/LanguageProvider';
import { CURRENT_DURATION_TIME, DEFAULT_TEXTS, DURATION_TIME_GRAD_TEXT, LANGUAGE, TextKey } from '../config';
import { getTexts } from '../api/api';
import { renderDynamicText } from '../utill';
import { useQuery } from '@tanstack/react-query';

/**
 * useTextLang hook fetches localized text for a given text key.
 * It uses react-query for caching and fetching.
 * @param textKey - The key identifying the text to fetch.
 * @returns Object containing the localized text, loading state, and error if any.
 */
export const useTextLang = (textKey: TextKey) => {
    const { language } = useLanguageContext();

    const query = useQuery({
        queryKey: ['text', textKey, language], // Unique cache key
        queryFn: async () => {
            const data = await getTexts(textKey);
            return data.texts.ENGLISH;
        },
        initialData: DEFAULT_TEXTS[textKey], // Initial data
        refetchOnWindowFocus: false, // Disable refetch on window focus
    });

    // Process dynamic text variables
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
