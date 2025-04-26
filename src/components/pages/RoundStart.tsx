
import { useEffect } from "react";
import { endSession, startSessionRequest } from "../../api/api";
import { GameType } from "../../interfaces/rounds";
import { TextForRoundStart } from "../TextForRoundStart";
import { StartButton } from "../StartButton";
import { setStartRoundsBodyStyle } from "../../utill";
import { useParams } from "react-router";


export const RoundStart = ({ roundType }: { roundType: GameType }) => {

    useEffect(() => {
        endSession()//end prev session
        startSessionRequest()
        setStartRoundsBodyStyle()
    }, [])
    const {onlyFirst} = useParams<{onlyFirst:string}>()

    //console.log(onlyFirst)
    const urlParam = onlyFirst ? `first-round${"/" + onlyFirst}` : `first-round`;
    const roundStartButton = roundType === GameType.firstType ? urlParam : "second-round";
    
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