//Нужно только для того, чтобы если CURRENT_DURATION_TIME или CURRENT_TIME_BEETWEN_ROUNDS не будет
export const BASE_TIME_BEETWEN_ROUNDS = 1200;
export const BASE_DURATION_TIME = 40000;
//Настройки врмени
export const CURRENT_DURATION_TIME = 40000;//время в милисекундах
export const CURRENT_TIME_BEETWEN_ROUNDS = 1200;
//
export const START_ROUND = 0;
export const START_SCORE = 0;
//Сервер
const serverIp = "localhost"//"84.201.144.181"//"84.201.144.181"//.168.1.187:5001
export const SERVER_URL = `http://${serverIp}:5001`//"http://localhost:5001";

//Все слова/тексты
//MainPage
export const MAIN_PAGE_TITLE = "Попробуй себя в роли учёного-зоолога!"
export const MAIN_PAGE_DESCRIPTION = "До 1000 снимков с фотоловушек в день необходимо обрабатывать исследователям особо охраняемых природных территорий"
export const MAIN_PAGE_AI_SUBTITLE = "AI-помощник возьмет часть работы на себя";

//TextRoundStart
export const ROUND_TARGET_TITLE = "Найди животноеи определи его вид";
export const ROUND_TARGET_TITLE_AI = "Оцени работу с AI-помощником";
export const ROUND_TARGET = ` Обработай как можно больше снимков за ${CURRENT_DURATION_TIME / 1000} секунд!`
export const RAUND_TEXT = "Раунд"//1 или 2
//BaseOfGame
export const SCROE_TEXT = "Очки";
export const TARGET_ANIMAL_TITLE = "Найди животное на снимке"
export const TRAGET_ANIMAL_SUBTITILE = "Укажи место, где оно находится"

export const SKIP_ROUND_BUTTON_TEXT = "SKIP BUTTON"
export const HOME_BUTTON_TEXT = "На главную"
export const YES_NO_BUTTONS_TEXT = {yes:"Да", no:"Нет"}

//End pages
export const YOUR_SCORE_TEXT = "Твой результат"
export const TRUE_AMOUNT_PHOTO_TEXT = "Верно обработано фотографий:"
export const TRY_AI_BUTTON_TEXT = 'Узнать возможности нейросети!'//Кнопка перехода к запуску 2 раунда

export const END_TITLE = "СберегAI природу с нами!";
export const TYPE_OF_SCORE_TEXT = {self:"Самостоятельно", ai:"С AI-помощником"};