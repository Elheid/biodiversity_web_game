import { getRandomRound, MyRoutes } from "../api/api";
import { FirstRoundLevelDTO, SecondRoundLevelDTO } from "../interfaces/backendDTO";
import { GameType, RoundInfo } from "../interfaces/rounds";

export class RoundService {
    private cache = new Map<number, RoundInfo>();

    //маппинг информации с бека на фронт
    mapFirstRound(dto: FirstRoundLevelDTO): RoundInfo {
        return ({
            answerTitle: dto.correctAnimalName,
            answers: dto.animalNames.map(name => ({
                answerName: name,
                isAnswerTrue: name === dto.correctAnimalName,
            })),
            gamePictures: {
                pictureId: dto.id,
                pictureUrl: `data:image/jpeg;base64,${dto.levelImage}`,
                resultPictureUrl: `data:image/jpeg;base64,${dto.imageWithAnimal}`,
            },
        });
    }

    mapSecondRound(dto: SecondRoundLevelDTO): RoundInfo{
            return ({
            answerTitle: dto.animalNameInQuestion,
            answers: dto.animalNames.map(name => ({
                answerName: name,
                isAnswerTrue: name === dto.correctAnimalName,
            })),
            gamePictures: {
                pictureId: dto.id,
                pictureUrl: `data:image/jpeg;base64,${dto.imageWithAnimal}`,
                resultPictureUrl: `data:image/jpeg;base64,${dto.imageWithAnimal}`,
            }
        });
    }

    async fetchRound(roundNumber: number, type: GameType): Promise < RoundInfo > {
        if(this.cache.has(roundNumber)) {
        return this.cache.get(roundNumber)!;
    }

    const currRound = type === GameType.firstType
        ? MyRoutes.FIRST_ROUND
        : MyRoutes.SECOND_ROUND;

    const dto = await getRandomRound(currRound);

    const roundInfo = type === GameType.firstType
        ? this.mapFirstRound(dto)
        : this.mapSecondRound(dto);

    this.cache.set(roundNumber, roundInfo);
    return roundInfo;
}
}