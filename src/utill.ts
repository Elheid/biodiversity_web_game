import { Game } from "./classes/game";
import { FirstRoundLevelDTO, SecondRoundLevelDTO } from "./interfaces/backendDTO";
import { Answer, RoundInfo, RoundsInfo } from "./interfaces/rounds";



export const getCurrAnswers = (game: Game | undefined): Answer[] => {
    if (game)
        return game.getRoundAnswers();
    throw new Error("game not found")
}

//маппинг информации с бека на фронт


export const mapFirstRoundLevelDTOToRoundInfo = (dto: FirstRoundLevelDTO): RoundInfo => {
    return {
        answerTitle: dto.correctAnimalName, // Название правильного ответа
        answers: dto.animalNames.map((name) => ({
            answerName: name,
            isAnswerTrue: name === dto.correctAnimalName, // Проверка, является ли ответ правильным
        })),
        gamePictures: {
            pictureId: dto.id,
            pictureUrl: `data:image/jpeg;base64,${dto.levelImage}`, // Основное изображение
            resultPictureUrl: `data:image/jpeg;base64,${dto.imageWithAnimal}`, // Изображение с выделенным животным
        },
    };
};
const mapSecondRoundLevelDTOToRoundInfo = (dto: SecondRoundLevelDTO): RoundInfo => {
    return {
        answerTitle: dto.animalNameInQuestion, // Название животного, о котором задан вопрос
        answers: dto.animalNames.map((name) => ({
            answerName: name,
            isAnswerTrue: name === dto.correctAnimalName, // Проверка, является ли ответ правильным
        })),
        gamePictures: {
            pictureId: dto.id,
            pictureUrl: `data:image/jpeg;base64,${dto.imageWithAnimal}`, // Основное изображение
            resultPictureUrl: `data:image/jpeg;base64,${dto.imageWithAnimal}`, // Изображение с выделенным животным
        },
    };
};
export const mapDTOsToRoundsInfo = (firstRoundDTOs: FirstRoundLevelDTO[], secondRoundDTOs: SecondRoundLevelDTO[]): RoundsInfo => {
    const roundsInfo: RoundsInfo = {};
    // Маппинг для первого раунда
    firstRoundDTOs.forEach((dto, index) => {
        roundsInfo[index + 1] = mapFirstRoundLevelDTOToRoundInfo(dto);
    });

    // Маппинг для второго раунда
    secondRoundDTOs.forEach((dto, index) => {
        const roundNumber = firstRoundDTOs.length + index + 1;
        roundsInfo[roundNumber] = mapSecondRoundLevelDTOToRoundInfo(dto);
    });

    return roundsInfo;
};
