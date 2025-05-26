//import { getTexts, LANGUAGE } from "./api/api";

//Нужно только для того, чтобы если CURRENT_DURATION_TIME или CURRENT_TIME_BEETWEN_ROUNDS не будет
export const BASE_TIME_BEETWEN_ROUNDS = 100;//0.5 * 1000;
export const BASE_DURATION_TIME = 40 * 1000;
//Настройки врмени

export const CURRENT_DURATION_TIME = 40 * 1000;//время в милисекундах
export const CURRENT_TIME_BEETWEN_ROUNDS = 100;//1.2 * 1000;;

//
export const START_ROUND = 0;
export const START_SCORE = 0;

export const AMOUNTS_OF_ROUNDS = 500;
//Сервер
const apiUrl = import.meta.env.VITE_API_URL;
const apiHost = import.meta.env.VITE_API_PORT;
const serverIp = apiUrl//"localhost"//apiHost//"localhost"//apiUrl//"localhost"//"84.201.144.181"//192.168.1.187:5001
export const SERVER_URL = `http://${serverIp}:${apiHost}`//"http://localhost:5001";

//Все слова/тексты
//MainPage
export enum LANGUAGE {
    RUSSIAN = "RUSSIAN",
    ENGLISH = "ENGLISH",
    //ITALIAN = "ITALIAN"
}


export type TextKey =
    | 'START_BUTTON_TEXT'
    | 'MAIN_PAGE_TITLE'
    | 'MAIN_PAGE_DESCRIPTION'
    | 'MAIN_PAGE_AI_SUBTITLE'
    | 'RAUND_START__BUTTON_TEXT'
    | 'ROUND_TARGET_TITLE'
    | 'ROUND_TARGET_TITLE_AI'
    | 'ROUND_TARGET'
    | 'RAUND_TEXT'
    | 'SCROE_TEXT'
    | 'TARGET_ANIMAL_TITLE'
    | 'TRAGET_ANIMAL_SUBTITILE'
    | 'SKIP_ROUND_BUTTON_TEXT'
    | 'HOME_BUTTON_TEXT'
    | 'YOUR_SCORE_TEXT'
    | 'TRUE_AMOUNT_PHOTO_TEXT'
    | 'TRY_AI_BUTTON_TEXT'
    | 'END_TITLE'
    | "DURATION_TIME_GRAD_TEXT"
    | "YES_NO_BUTTONS_TEXT_yes"
    | "YES_NO_BUTTONS_TEXT_no"
    | "TYPE_OF_SCORE_TEXT_self"
    | "TYPE_OF_SCORE_TEXT_ai"
    | "CHOICE_LEVEL_TEXT"
    | "IS_THIS_ANIMAL_NAME";



export const START_BUTTON_TEXT = "Начать игру"
//export const getStartButtonText = (lang: LANGUAGE) => getTexts("START_BUTTON_TEXT").then((data) => data.texts[lang])

export const IS_THIS_ANIMAL_NAME = "В выбранной области"

export const MAIN_PAGE_TITLE = "Попробуй себя в роли учёного-зоолога!"
export const MAIN_PAGE_DESCRIPTION = "До 1000 снимков с фотоловушек в день необходимо обрабатывать исследователям особо охраняемых природных территорий"
export const MAIN_PAGE_AI_SUBTITLE = "AI-помощник возьмет часть работы на себя";

//TextRoundStart
export const RAUND_START__BUTTON_TEXT = "Начать"//1 или 2


export const ROUND_TARGET_TITLE = "Найди животное и определи его вид";
export const ROUND_TARGET_TITLE_AI = "Оцени работу с AI-помощником";
export const DURATION_TIME_GRAD_TEXT = `<span class="gradient-number">${CURRENT_DURATION_TIME / 1000}</span>`;
export const ROUND_TARGET = ` Обработай как можно больше снимков за ${DURATION_TIME_GRAD_TEXT}!`
export const RAUND_TEXT = "Раунд"//1 или 2
//BaseOfGame
export const SCROE_TEXT = "Очки";
export const TARGET_ANIMAL_TITLE = "Найди животное на снимке"
export const TRAGET_ANIMAL_SUBTITILE = "Укажи место, где оно находится"

export const SKIP_ROUND_BUTTON_TEXT = "SKIP BUTTON"
export const SKIP_ROUND_BUTTON_TEXT_default = "SKIP BUTTON"
export const HOME_BUTTON_TEXT = "На главную"
export const YES_NO_BUTTONS_TEXT = { yes: "Да", no: "Нет" }

//End pages
export const YOUR_SCORE_TEXT = "Твой результат"
export const TRUE_AMOUNT_PHOTO_TEXT = "Верно обработано фотографий:"
export const TRY_AI_BUTTON_TEXT = 'Узнать возможности нейросети!'//Кнопка перехода к запуску 2 раунда

export const END_TITLE = "СберегAI природу с нами!";
export const TYPE_OF_SCORE_TEXT = { self: "Самостоятельно", ai: "С AI-помощником" };

export const CHOICE_LEVEL_TEXT = "Выбери тип игры";

export const DEFAULT_TEXTS: Record<TextKey, string> = {
    START_BUTTON_TEXT: START_BUTTON_TEXT,//'Начать игру',
    MAIN_PAGE_TITLE:MAIN_PAGE_TITLE, //'Попробуй себя в роли учёного-зоолога!',
    MAIN_PAGE_DESCRIPTION: MAIN_PAGE_DESCRIPTION,//"До 1000 снимков с фотоловушек в день необходимо обрабатывать исследователям особо охраняемых природных территорий",
    MAIN_PAGE_AI_SUBTITLE:MAIN_PAGE_AI_SUBTITLE, //"AI-помощник возьмет часть работы на себя",
    RAUND_START__BUTTON_TEXT:RAUND_START__BUTTON_TEXT,//"Начать",
    ROUND_TARGET_TITLE:ROUND_TARGET_TITLE,//"Найди животное и определи его вид",
    ROUND_TARGET_TITLE_AI:ROUND_TARGET_TITLE_AI,//"Оцени работу с AI-помощником",
    DURATION_TIME_GRAD_TEXT:DURATION_TIME_GRAD_TEXT,//`<span class="gradient-number">${CURRENT_DURATION_TIME / 1000}</span>`,
    ROUND_TARGET:ROUND_TARGET,//` Обработай как можно больше снимков за ${DURATION_TIME_GRAD_TEXT}!`,
    RAUND_TEXT:RAUND_TEXT,//"Раунд",
    SCROE_TEXT:SCROE_TEXT,//"Очки",
    TARGET_ANIMAL_TITLE:TARGET_ANIMAL_TITLE,//"Найди животное на снимке",
    TRAGET_ANIMAL_SUBTITILE:TRAGET_ANIMAL_SUBTITILE,//"Укажи место, где оно находится",
    SKIP_ROUND_BUTTON_TEXT:SKIP_ROUND_BUTTON_TEXT,//"SKIP BUTTON",
    HOME_BUTTON_TEXT:HOME_BUTTON_TEXT,//"На главную",
    YES_NO_BUTTONS_TEXT_yes: YES_NO_BUTTONS_TEXT.yes,//"Да",
    YES_NO_BUTTONS_TEXT_no:YES_NO_BUTTONS_TEXT.no,//"Нет",
    YOUR_SCORE_TEXT:YOUR_SCORE_TEXT,//"Твой результат",
    TRUE_AMOUNT_PHOTO_TEXT:TRUE_AMOUNT_PHOTO_TEXT,//"Верно обработано фотографий:",
    TRY_AI_BUTTON_TEXT:TRY_AI_BUTTON_TEXT,//'Узнать возможности нейросети!',
    END_TITLE:END_TITLE,//"СберегAI природу с нами!",
    TYPE_OF_SCORE_TEXT_self:TYPE_OF_SCORE_TEXT.self,//"Самостоятельно",
    TYPE_OF_SCORE_TEXT_ai:TYPE_OF_SCORE_TEXT.ai,//"С AI-помощником",

    CHOICE_LEVEL_TEXT:CHOICE_LEVEL_TEXT,//"Выбери тип игры",
    IS_THIS_ANIMAL_NAME: IS_THIS_ANIMAL_NAME,

};
