import { Answer, GamePictures } from "./classes/gameRound";
import { Species } from "./classes/animalSpecies";

import { RoundsInfo } from "./classes/game";


import giraff from "../src/assets/img/giraff.png"
import deer from "../src/assets/img/deer.png"

import giraffRes from "../src/assets/img/giraffRes.png"
import deerRes from "../src/assets/img/deerRes.png"
import { Coordinates } from "./components/GameImage/GameImage";



const answers: Answer[] = [
    {
        answerName: Species.deer,
        isAnswerTrue: true
    },
    {
        answerName: Species.giraffe,
        isAnswerTrue: false
    },
    {
        answerName: Species.hog,
        isAnswerTrue: false
    },
]

const answers2: Answer[] = [
    {
        answerName: Species.deer,
        isAnswerTrue: false
    },
    {
        answerName: Species.giraffe,
        isAnswerTrue: true
    },
    {
        answerName: Species.hog,
        isAnswerTrue: false
    },
]

const gamePictures: GamePictures[] = [
    { pictureId: 1, pictureUrl: deer, resultPictureUrl: deerRes },
    { pictureId: 2, pictureUrl: giraff, resultPictureUrl: giraffRes }
]

const gameInfo: RoundsInfo = {
    0: { answers: answers, gamePictures: gamePictures[0] },
    1: { answers: answers2, gamePictures: gamePictures[1] }
}

const answers12: Answer[] = [
    {
        answerName: "Yes",
        isAnswerTrue: true
    },
    {
        answerName: "false",
        isAnswerTrue: false
    },
]

const answers22: Answer[] = [
    {
        answerName: "Yes",
        isAnswerTrue: false
    },
    {
        answerName: "false",
        isAnswerTrue: true
    },
]


const gameInfo2: RoundsInfo = {
    0: { answers: answers12, gamePictures: gamePictures[0], answerTitle:"Это Олень?", },
    1: { answers: answers22, gamePictures: gamePictures[1], answerTitle:"Это Кобан?", }
}


export const getGameInfo = ()=>{
    return gameInfo
}

export const getGameInfo2 = ()=>{
    return gameInfo2;
}

export const getGamePictures = ()=>{
    return gamePictures;
}


const coordinates:Coordinates[] = [
    {x:336,y:14,width:860,height:886},
    {x:356,y:20,width:402,height:761},
    {x:0,y:0,width:0,height:0}
]

export const getPicturesCoordinate = ()=>{
    return coordinates;
}

