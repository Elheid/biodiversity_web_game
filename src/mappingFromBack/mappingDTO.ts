
import { FirstRoundLevelDTO, SecondRoundLevelDTO } from "../interfaces/backendDTO";
import { RoundInfo } from "../interfaces/rounds";

//маппинг информации с бека на фронт
export const mapFirstRound = (dto: FirstRoundLevelDTO): RoundInfo => {
    //const picture = dto.id === 2 ?  deer : giraff;
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
