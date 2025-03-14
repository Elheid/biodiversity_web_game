export interface FirstRoundLevelDTO {
    id: number;
    imageWithAnimal: string; // base64
    animalNames: string[];
    correctAnimalName: string;
    levelImage: string; // base64
    animalCoordinates: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}

export interface SecondRoundLevelDTO {
    id: number;
    imageWithAnimal: string; // base64
    animalNames: string[];
    correctAnimalName: string;
    animalNameInQuestion: string;
}