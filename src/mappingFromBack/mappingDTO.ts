
import { getFirstRoundFromStorage, getSecondRoundFromStorage } from "../context/GamePointsProvider";
import { FirstRoundLevelDTO, SecondRoundLevelDTO } from "../interfaces/backendDTO";
import { RoundInfo } from "../interfaces/rounds";

type typeOfEnd  = "first"|"second";
const ifNoDataEndRound = (dto: object, type:typeOfEnd)=>{
    if (typeof(dto) === "string"){
            const score = type === "first" ? getFirstRoundFromStorage() : getSecondRoundFromStorage();
            const endEvent = new CustomEvent<number>("game-end", { detail: score })
            window.dispatchEvent(endEvent)
            throw new Error("Get invalid round data");
    }
}

//маппинг информации с бека на фронт
export const mapFirstRound = (dto: FirstRoundLevelDTO): RoundInfo => {
    //const picture = dto.id === 2 ?  deer : giraff;

    ifNoDataEndRound(dto,"first")
    return ({
        id: dto.id,
        answers: dto.animalNames.map(name => ({
            answerName: name,
            isAnswerTrue: name === dto.correctAnimalName,
        })),
        gamePictures: {
            pictureId: dto.id,
            coordinates:dto.animalCoordinates,
            pictureUrl: `data:image/jpeg;base64,${dto.levelImage}`,//picture,//`data:image/jpeg;base64,${dto.levelImage}`,
            //resultPictureUrl:`data:image/jpeg;base64,${dto.imageWithAnimal}`, //picture//`data:image/jpeg;base64,${dto.imageWithAnimal}`,
        },
    })
};

export const mapSecondRound = (dto: SecondRoundLevelDTO): RoundInfo =>
    {
        ifNoDataEndRound(dto,"second")
        //const picture = dto.id === 2 ?  deer : giraff;
        return {
            id: dto.id,
            answerTitle: dto.animalNameInQuestion,
            answers: dto.animalNames ? dto.animalNames.map(name => ({
                answerName: name,
                isAnswerTrue: name === dto.correctAnimalName,
            })) : [],
            gamePictures: {
                pictureId: dto.id,
                coordinates:dto.animalCoordinates,
                pictureUrl: `data:image/jpeg;base64,${dto.levelImage}`,//`data:image/jpeg;base64,${dto.imageWithAnimal}`,
                //resultPictureUrl: picture //`data:image/jpeg;base64,${dto.imageWithAnimal}`,
            },
        };
    }
