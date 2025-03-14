import axios from "axios";
import { SERVER_URL } from "../config";

const BASE_URL = SERVER_URL;

axios.defaults.baseURL = BASE_URL;
//axios.defaults.headers.common['Authorization'] = localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token") }` : undefined;


export const MyRoutes = {
    FIRST_ROUND: "first-round",
    SECOND_ROUND: "second-round",
    ANIMALS: "animals",

    RANDOM_LEVEL: function(currRound: string): string {
        return `${currRound}/random-level`;
    },

    IS_CORRECT_ANSWER: function(currRound: string, roundId: number): string {
        return `${currRound}/is-correct-answer/${roundId}`;
    }
};

const getData = async(route : string) =>{
    const response = await axios.get(route)
    return response.data;
}
const postData = async(route : string, data:object) =>{
    const response = await axios.post(route, data)
    return response.data;
}

export const getFirstRoundData = ()=> getData(MyRoutes.FIRST_ROUND);
export const getSecondRoundData = ()=> getData(MyRoutes.SECOND_ROUND);

export const isAnswerCorrect = (curRound:string, roundId:number, answer:string)=> postData(MyRoutes.IS_CORRECT_ANSWER(curRound, roundId),{answer:answer});

export const getRandomRound = (curRound:string)=> getData(MyRoutes.RANDOM_LEVEL(curRound));

