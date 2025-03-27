
import { useEffect } from "react";
import { endSession } from "../../api/api";
import axios from "axios";
import { GameType } from "../../interfaces/rounds";
import { TextForRoundStart } from "../TextForRoundStart";
import { StartButton } from "../StartButton";

export const RoundStart = ({ roundType }: { roundType: GameType }) => {
    useEffect(() => {
        endSession()//end prev session
    }, [])

    /**
     * Just a random request to back, to start a new session on start
     */
    const startSessionRequest = () => {
        axios.get("/animals/Олень");
    }

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
            <StartButton to={`/${roundStartButton}`} onClick={()=>startSessionRequest()}/>
        </div>


    );
}