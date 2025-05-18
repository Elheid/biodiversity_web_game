
import { useEffect } from "react"
import { endSession } from "../../api/api"
import { StartButton } from "../StartButton"


import bear from "../../assets/img/bear.svg"
import wolf from "../../assets/img/wolf.svg"
import deer from "../../assets/img/deer.svg"

import beforeTitle from "../../assets/img/beforeTitle.svg"

import { setMainPageBodyStyle } from "../../utill"

//import tiger from "../../assets/img/tiger.svg"

import { AutoTextSize } from 'auto-text-size'
//import { useMinWidth } from "../../hooks/useMinWidth"
import { useResetPoints } from "../../hooks/resetPoints"
import { DialogLanguageChange } from "../DialogLanguageChange"
import { useTextLang } from "../../hooks/useTextLang"
import { AnimalImage } from "../AnimalImage"
import { LoadingForPreparedWithChildren } from "../LoadingForPrepared"

export const MainPage = () => {
    useResetPoints();
    useEffect(() => {
        endSession()//end prev session
        setMainPageBodyStyle()

    }, [])


    const { text: START_BUTTON_TEXT } = useTextLang('START_BUTTON_TEXT');

    const { text: MAIN_PAGE_TITLE, isLoading: isLoadingTitle } = useTextLang('MAIN_PAGE_TITLE');
    const { text: MAIN_PAGE_DESCRIPTION, isLoading: isLoadingDescription } = useTextLang('MAIN_PAGE_DESCRIPTION');
    const { text: MAIN_PAGE_AI_SUBTITLE, isLoading: isLoadingSubtitle } = useTextLang('MAIN_PAGE_AI_SUBTITLE');

    //const {isMinWidth : isMinWidth} = useMinWidth(700)

    //const {isMinWidth : isMinWidthBear} = useMinWidth(900)

    //document.body.classList.add("centred-root");
    const isLoading = (isLoadingTitle &&
        isLoadingDescription &&
        isLoadingSubtitle)
    /*const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const isLoading: boolean = (isLoadingTitle &&
            isLoadingDescription &&
            isLoadingSubtitle) ? false : true;
        setIsLoading(isLoading)
    })*/

    return (
        <LoadingForPreparedWithChildren isLoading={isLoading ? false : true}>
            <div className="main-page-container">
                <DialogLanguageChange />
                <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", padding: "20px", gap: "10px" }}>
                    <img style={{ width: "0.8vw", height: "auto" }} src={beforeTitle}></img>
                    <h1 style={{ margin: 0, padding: 0 }} className="main-title">{MAIN_PAGE_TITLE}</h1>
                </div>


                {/*<img style={{position:"absolute", right: 0, top:"5vh", width:"40vw"}} src={tiger} alt="tiger" />*/}
                <div className="description-container">
                    {/*isMinWidthBear && <img style={{ maxWidth: "10vw" }} src={bear} alt="bear" /> /*меньше 900*/}
                    <AnimalImage img={bear} minWidthToHide={900} imageStyle={{ maxWidth: "10vw" }} alt="bear" />
                    <div className="container-image container-image-size">

                        <AutoTextSize maxFontSizePx={30} mode={'box'} style={{ padding: "30px" }}>
                            {MAIN_PAGE_DESCRIPTION}
                        </AutoTextSize>

                    </div>
                </div>

                <div className="subtitle-container container-image container-image-size">
                    {/* className="inframe-text" */}
                    <AutoTextSize maxFontSizePx={30} mode={'box'} style={{ padding: "20px" }}>
                        {MAIN_PAGE_AI_SUBTITLE}
                    </AutoTextSize>

                </div>

                <div className="bottom-container">
                    {/*isMinWidth && <img className="wolf-image" style={{ maxWidth: "15vw" }} src={wolf} alt="wolf" />*/}
                    <AnimalImage img={wolf} minWidthToHide={700} imageStyle={{ maxWidth: "15vw" }} alt={"wolf"} className="wolf-image" />
                    <StartButton text={START_BUTTON_TEXT} to={"choice-level"/*"/first-round-start"*/} />
                    { /*isMinWidth && <img style={{ maxWidth: "10vw" }} src={deer} alt="deer"/>*/}
                    <AnimalImage img={deer} minWidthToHide={700} imageStyle={{ maxWidth: "10vw" }} alt={"deer"} />
                </div>

            </div>

        </LoadingForPreparedWithChildren>
    )
}