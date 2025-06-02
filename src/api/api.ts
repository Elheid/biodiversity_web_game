/**
 * API module for making HTTP requests to the backend server.
 */
import axios from "axios";
import { LANGUAGE, SERVER_URL } from "../config";
import { TextDTO } from "../interfaces/backendDTO";

const BASE_URL = SERVER_URL;

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;
//axios.defaults.headers.common['Authorization'] = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token") }` : undefined;

/**
 * Helper function to build language query parameter.
 * @param lang - Language enum value.
 * @returns Query string with language parameter.
 */
const langQuery = (lang: LANGUAGE) => `?language=${lang}`;

/**
 * Object containing API route strings and functions to build routes.
 */
export const MyRoutes = {
    FIRST_ROUND: "first-round",
    SECOND_ROUND: "second-round",
    ANIMALS: "animals",

    TEXTS_WITH_TITLE: function (title: string): string {
        return `/ui-texts/title/${title}`;
    },

    SESSION_INVALIDATE: "session/invalidate",

    RANDOM_LEVEL: function (currRound: string): string {
        return `${currRound}/random-level`;
    },

    IS_CORRECT_ANSWER: function (currRound: string, roundId: number): string {
        return `${currRound}/is-correct-answer/${roundId}`;
    }
};

/**
 * Performs a GET request to the specified route.
 * @param route - API route string.
 * @returns Response data.
 */
const getData = async (route: string) => {
    const response = await axios.get(route);
    return response.data;
};

/**
 * Performs a GET request with language parameter.
 * @param route - API route string.
 * @param lang - Language enum value (default is Russian).
 * @returns Response data.
 */
const getDataWithLang = async (route: string, lang: LANGUAGE = LANGUAGE.RUSSIAN) => {
    const response = await axios.get(route + langQuery(lang));
    return response.data;
};

/**
 * Performs a POST request to the specified route with data.
 * Handles 404 errors by returning isCorrect: false.
 * @param route - API route string.
 * @param data - Data object to post.
 * @returns Response data.
 */
const postAnswer = async (route: string, data: object) => {
    try {
        const response = await axios.post(route, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return { isCorrect: false };
        }
        throw error; // Propagate other errors
    }
};

/**
 * Gets UI texts by title.
 * @param title - Title string.
 * @returns Promise resolving to TextDTO.
 */
export const getTexts = async (title: string): Promise<TextDTO> => {
    const response = await axios.get(MyRoutes.TEXTS_WITH_TITLE(title));
    return response.data;
};

/**
 * Ends the current session.
 * @returns Axios POST promise.
 */
export const endSession = () => axios.post(MyRoutes.SESSION_INVALIDATE);

/**
 * Gets data for the first round with language parameter.
 * @returns Promise resolving to first round data.
 */
export const getFirstRoundData = () => getDataWithLang(MyRoutes.FIRST_ROUND);

/**
 * Gets data for the second round with language parameter.
 * @returns Promise resolving to second round data.
 */
export const getSecondRoundData = () => getDataWithLang(MyRoutes.SECOND_ROUND);

/**
 * Checks if an answer is correct for a given round.
 * @param curRound - Current round string.
 * @param roundId - Round identifier.
 * @param answer - Answer string.
 * @returns Promise resolving to correctness object.
 */
export const isAnswerCorrect = (curRound: string, roundId: number, answer: string) => postAnswer(MyRoutes.IS_CORRECT_ANSWER(curRound, roundId), { answer: answer });

/**
 * Gets the true answer for a given round.
 * @param curRound - Current round string.
 * @param roundId - Round identifier.
 * @returns Promise resolving to true answer data.
 */
export const getTrueAnswer = (curRound: string, roundId: number) => getData(`${curRound}/${roundId}/correct`);

/**
 * Gets a random round for the current round and language.
 * @param curRound - Current round string.
 * @param lang - Language enum value.
 * @returns Promise resolving to random round data.
 */
export const getRandomRound = (curRound: string, lang: LANGUAGE) => getDataWithLang(MyRoutes.RANDOM_LEVEL(curRound), lang);

/**
 * Starts a session request. // just random req for start session
 */
export const startSessionRequest = () => {
    axios.get("/animals/1");
};
