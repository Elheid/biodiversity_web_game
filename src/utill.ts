
import { Game } from "./classes/game";
import { FirstRoundLevelDTO, SecondRoundLevelDTO } from "./interfaces/backendDTO";
import { Answer, RoundInfo } from "./interfaces/rounds";



export const getCurrAnswers = (game: Game | undefined): Answer[] => {
    if (game)
        return game.getRoundAnswers();
    throw new Error("game not found")
}

//маппинг информации с бека на фронт
export const mapFirstRound = (dto: FirstRoundLevelDTO): RoundInfo => ({
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

export const mapSecondRound = (dto: SecondRoundLevelDTO): RoundInfo => ({
    answerTitle: dto.animalNameInQuestion,
    answers: dto.animalNames.map(name => ({
        answerName: name,
        isAnswerTrue: name === dto.correctAnimalName,
    })),
    gamePictures: {
        pictureId: dto.id,
        pictureUrl: `data:image/jpeg;base64,${dto.imageWithAnimal}`,
        resultPictureUrl: `data:image/jpeg;base64,${dto.imageWithAnimal}`,
    },
});

/*
export const useRounds = () => {
    const [rounds, setRounds] = useState<RoundsInfo>({});
    const service = useMemo(() => new RoundService(), []);

    const loadRound = async (roundNumber: number, type: GameType) => {
        const round = await service.fetchRound(roundNumber, type);
        setRounds(prev => ({ ...prev, [roundNumber]: round }));
    };

    return {
        rounds,
        loadRound,
    };
};
*/