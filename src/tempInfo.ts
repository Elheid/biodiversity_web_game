import { Answer, GamePictures } from "./classes/gameRound";
import { Species } from "./classes/animalSpecies";

import { RoundsInfo } from "./classes/game";


import giraff from "../src/assets/img/giraff.png"
import deer from "../src/assets/img/deer.png"

import giraffRes from "../src/assets/img/giraffRes.png"
import deerRes from "../src/assets/img/deerRes.png"


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

export const getGameInfo = ()=>{
    return gameInfo
}

export const getGamePictures = ()=>{
    return gamePictures;
}
