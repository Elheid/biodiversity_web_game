
import { useEffect } from "react";
import { endSession, startSessionRequest } from "../../api/api";
import { GameType } from "../../interfaces/rounds";
import { TextForRoundStart } from "../TextForRoundStart";
import { StartButton } from "../StartButton";
import { setStartRoundsBodyStyle } from "../../utill";
import { useParams } from "react-router";
import { useTextLang } from "../../hooks/useTextLang";
import { Loading } from "../Loading";
import { useMinWidth } from "../../hooks/useMinWidth";

/*
import bear from "../../assets/img/bear.svg"
import wolf from "../../assets/img/wolf.svg"
import deer from "../../assets/img/deer.svg"
import puma from "../../assets/img/puma.svg"
import { AnimalImage } from "../AnimalImage";*/

export const RoundStart = ({ roundType }: { roundType: GameType }) => {
    const {isMinWidth : isMinWidth} = useMinWidth(1250)
    useEffect(() => {
        endSession()//end prev session
        startSessionRequest()
        if (isMinWidth) setStartRoundsBodyStyle(roundType === GameType.firstType ? "first-full" : "second-full")
        else setStartRoundsBodyStyle()
    }, [isMinWidth])
    const { onlyFirst } = useParams<{ onlyFirst: string }>()

    //console.log(onlyFirst)
    const urlParam = onlyFirst ? `first-round${"/" + onlyFirst}` : `first-round`;
    const roundStartButton = roundType === GameType.firstType ? urlParam : "second-round";

    const { text: RAUND_START__BUTTON_TEXT, isLoading } = useTextLang('RAUND_START__BUTTON_TEXT');

    if (isLoading) {
        return (
            <Loading />
        )
    }
    /*const imagesObjUp = {
        img: roundType === GameType.firstType ? deer : bear,
        alt: roundType === GameType.firstType ? "deer" : "bear",
    }
    const imagesObjBottom = {
        img: roundType === GameType.firstType ? puma : wolf,
        alt: roundType === GameType.firstType ? "puma" : "wolf",
    }*/
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {/*<AnimalImage
                img={imagesObjUp.img}
                minWidthToHide={740}
                imageStyle={{ maxWidth: "25vw", position: "absolute", top: 0, left: "10%" }}
                alt={imagesObjUp.alt} />*/}
            <div>
                <TextForRoundStart roundType={roundType} />
                {/*<Button onClick={() => {
                startSessionRequest()
                nav(`/${roundStartButton}`)
            }}>
                Start
            </Button>*/}
                <StartButton variant="colored" text={RAUND_START__BUTTON_TEXT} to={`/${roundStartButton}`} />
                {/*<AnimalImage
                    img={imagesObjBottom.img}
                    minWidthToHide={740}
                    imageStyle={{ maxWidth: "25vw", position: "absolute", bottom: 0, right: "10%" }}
                    alt={imagesObjBottom.alt} />*/}
            </div>
        </div>
    );
}