
import { useEffect } from "react";
import { endSession, startSessionRequest } from "../../api/api";
import { GameType } from "../../interfaces/rounds";
import { TextForRoundStart } from "../TextForRoundStart";
import { StartButton } from "../StartButton";
import { setStartRoundsBodyStyle } from "../../utill";

export const RoundStart = ({ roundType }: { roundType: GameType }) => {

    useEffect(() => {
        endSession()//end prev session
        startSessionRequest()
        setStartRoundsBodyStyle()
    }, [])

    /**
     * Just a random request to back, to start a new session on start
     */

    const roundStartButton = roundType === GameType.firstType ? "first-round" : "second-round";
    
    return (
        <div>
            <TextForRoundStart roundType={roundType} />
            {/*<Button onClick={() => {
                startSessionRequest()
                nav(`/${roundStartButton}`)
            }}>
                Start
            </Button>*/}
            <StartButton variant="colored" text="Начать" to={`/${roundStartButton}`}/>
        </div>


    );
}