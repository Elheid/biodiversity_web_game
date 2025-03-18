import { Coordinates } from "./coordinates";

export enum GameType{
    firstType,
    secondType
}

export type RoundsInfo = { [key: number]: RoundInfo }

export interface RoundInfo {
    id:number,
    answerTitle?:string;
    answers: Answer[];
    gamePictures: GamePictures;
}


export interface Answer {
    answerName: string,
    isAnswerTrue: boolean;
}

export interface GamePictures{
    pictureId: number,
    pictureUrl:string,
    resultPictureUrl?:string;
    coordinates?:Coordinates;
}
