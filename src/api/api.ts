import axios from "axios";
import { LANGUAGE, SERVER_URL } from "../config";
import { TextDTO } from "../interfaces/backendDTO";

const BASE_URL = SERVER_URL;

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;
//axios.defaults.headers.common['Authorization'] = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token") }` : undefined;


/*export type LANGUAGE = 
    "RUSSIAN" | "ENGLISH" | "ITALIAN";*/


const langQuery = (lang: LANGUAGE) => `?language=${lang}`


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

const getData = async (route: string) => {
    const response = await axios.get(route)
    return response.data;
}

const getDataWithLang = async (route: string, lang: LANGUAGE = LANGUAGE.RUSSIAN) => {
    const response = await axios.get(route + langQuery(lang))
    return response.data;
}


/*const postData = async (route: string, data: object) => {
    const response = await axios.post(route, data)
    return response.data;
}*/

const postAnswer = async (route: string, data: object) => {
    try {
        const response = await axios.post(route, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return { isCorrect: false };
        }
        throw error; // Пробрасываем другие ошибки
    }
};


export const getTexts = async (title: string): Promise<TextDTO> => {
    const response = await axios.get(MyRoutes.TEXTS_WITH_TITLE(title))
    return response.data;
}

export const endSession = () => axios.post(MyRoutes.SESSION_INVALIDATE)

export const getFirstRoundData = () => getDataWithLang(MyRoutes.FIRST_ROUND);
export const getSecondRoundData = () => getDataWithLang(MyRoutes.SECOND_ROUND);

export const isAnswerCorrect = (curRound: string, roundId: number, answer: string) => postAnswer(MyRoutes.IS_CORRECT_ANSWER(curRound, roundId), { answer: answer });
export const getTrueAnswer = (curRound: string, roundId: number) => getData(`${curRound}/${roundId}/correct`);

export const getRandomRound = (curRound: string, lang: LANGUAGE) => getDataWithLang(MyRoutes.RANDOM_LEVEL(curRound), lang);

export const startSessionRequest = () => {
    axios.get("/animals/1");
}