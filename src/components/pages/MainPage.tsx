
import { useEffect } from "react"
import { endSession } from "../../api/api"
import { StartButton } from "../StartButton"


import bear from "../../assets/img/bear.svg"
import wolf from "../../assets/img/wolf.svg"
import deer from "../../assets/img/deer.svg"
import { setMainPageBodyStyle } from "../../utill"

//import tiger from "../../assets/img/tiger.svg"

import { AutoTextSize } from 'auto-text-size'
import { useMinWidth } from "../../hooks/useMinWidth"
import { useResetPoints } from "../../hooks/resetPoints"
import {DialogLanguageChange} from "../DialogLanguageChange"
import { useTextLang } from "../../hooks/useTextLang"

export const MainPage = () => {
    useResetPoints();
    useEffect(() => {
        endSession()//end prev session
        setMainPageBodyStyle()
        
    }, [])
    

    const { text:START_BUTTON_TEXT } = useTextLang('START_BUTTON_TEXT');

    const { text:MAIN_PAGE_TITLE } = useTextLang('MAIN_PAGE_TITLE');
    const { text:MAIN_PAGE_DESCRIPTION } = useTextLang('MAIN_PAGE_DESCRIPTION');
    const { text:MAIN_PAGE_AI_SUBTITLE } = useTextLang('MAIN_PAGE_AI_SUBTITLE');


    
    const {isMinWidth : isMinWidth} = useMinWidth(700)

    const {isMinWidth : isMinWidthBear} = useMinWidth(900)

    //document.body.classList.add("centred-root")

    return (
        <div className="main-page-container">
            <DialogLanguageChange />
            <h1 className="main-title">{MAIN_PAGE_TITLE}</h1>

            {/*<img style={{position:"absolute", right: 0, top:"5vh", width:"40vw"}} src={tiger} alt="tiger" />*/}
            <div className="description-container">
                {isMinWidthBear && <img style={{ maxWidth: "10vw" }} src={bear} alt="bear" /> /*меньше 900*/}
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
                {isMinWidth && <img className="wolf-image" style={{ maxWidth: "15vw" }} src={wolf} alt="wolf" />}
                <StartButton text={START_BUTTON_TEXT} to={"choice-level"/*"/first-round-start"*/} />
                { isMinWidth && <img style={{ maxWidth: "10vw" }} src={deer} alt="deer" /*меньше 700*//>}
            </div>

        </div>

    )
}