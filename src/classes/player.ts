
/**
 * Player class represents a player in the game, tracking their choice and round state.
 */
export class Player {
    public choiceName: string | null;
    public roundState: "process" | "win" | "loose"  = "process";

    /**
     * Constructs a new Player instance.
     */
    constructor() {
        this.choiceName = null;
    }

    /**
     * Resets the player state for a new round.
     */
    public newRound(): void {
        this.roundState = "process";
        this.choiceName = null;
    }

    /**
     * Marks the player as having won the round.
     */
    public playerWin() {
        this.roundState = "win";
        console.log("Win");
    }

    /**
     * Marks the player as having lost the round.
     */
    playerLose() {
        this.roundState = "loose";
        console.log("loose");
    }

    /**
     * Gets the current round state of the player.
     * @returns The round state as a string.
     */
    playerGetRoundState() {
        return this.roundState;
    }

    /**
     * Gets the player's selected choice.
     * @returns The choice name or null if none selected.
     */
    public selectChoice(): string | null {
        if (this.choiceName)
            return this.choiceName;
        return null;
    }
}
