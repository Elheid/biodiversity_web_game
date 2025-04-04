import { Typography } from "@mui/material"

import { useEffect } from "react"
import { endSession } from "../../api/api"
import { StartButton } from "../StartButton"
import { MAIN_PAGE_AI_SUBTITLE, MAIN_PAGE_DESCRIPTION, MAIN_PAGE_TITLE } from "../../config"

import bear from "../../assets/img/bear.svg"
import wolf from "../../assets/img/wolf.svg"
import deer from "../../assets/img/deer.svg"
import { setMainPageBodyStyle } from "../../utill"

//import tiger from "../../assets/img/tiger.svg"

import { AutoTextSize } from 'auto-text-size'

export const MainPage = () => {
    useEffect(() => {
        endSession()//end prev session
        setMainPageBodyStyle()
    }, [])

    
    //document.body.classList.add("centred-root")
    
    return (
        <div className="main-page-container">
            <h1 className="main-title">{MAIN_PAGE_TITLE}</h1>

            {/*<img style={{position:"absolute", right: 0, top:"5vh", width:"40vw"}} src={tiger} alt="tiger" />*/}
            <div className="description-container">
                {<img style={{ maxWidth: "10vw" }} src={bear} alt="bear" />}
                <div className="container-image">
                   
                    <AutoTextSize  maxFontSizePx={30} mode={'box'} style={{padding:"30px"}}>{MAIN_PAGE_DESCRIPTION}</AutoTextSize>
                  
                </div>
            </div>

            <div className="subtitle-container container-image">
                {/* className="inframe-text" */}
                    <AutoTextSize maxFontSizePx={30} mode={'box'} style={{padding:"20px"}}>{MAIN_PAGE_AI_SUBTITLE}</AutoTextSize>
               
            </div>

            <div className="bottom-container">
                {<img className="wolf-image" style={{ maxWidth: "15vw" }} src={wolf} alt="wolf" />}
                <StartButton to={"/first-round-start"} />
                {<img style={{ maxWidth: "10vw" }} src={deer} alt="deer" />}
            </div>

        </div>

    )
}