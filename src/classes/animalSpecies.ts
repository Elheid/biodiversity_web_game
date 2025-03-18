export enum Species{
    roeDeer = "Косуля",
    giraffe = "Жираф",
    deer="Олень",
    hog="Кабан"

}

export const isSpecies = (choice: string): boolean =>{
    return Object.values(Species).includes(choice as Species);
}