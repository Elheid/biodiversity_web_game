import { useEffect } from "react"
import { endSession } from "../../api/api"
import { StartButton } from "../StartButton"

import bear from "../../assets/img/bear.svg"
import wolf from "../../assets/img/wolf.svg"
import deer from "../../assets/img/deer.svg"

import beforeTitle from "../../assets/img/beforeTitle.svg"

import { setMainPageBodyStyle } from "../../utill"

import { AutoTextSize } from 'auto-text-size'
import { useResetPoints } from "../../hooks/resetPoints"
import { DialogLanguageChange } from "../DialogLanguageChange"
import { useTextLang } from "../../hooks/useTextLang"
import { AnimalImage } from "../AnimalImage"
import { LoadingForPreparedWithChildren } from "../LoadingForPrepared"

/**
 * MainPage component renders the main landing page with title, description, and start button.
 * It manages session reset and applies page styles on mount.
 */
export const MainPage = () => {
    useResetPoints();

    useEffect(() => {
        endSession(); // End previous session
        setMainPageBodyStyle(); // Apply main page body styles
    }, []);

    const { text: START_BUTTON_TEXT } = useTextLang('START_BUTTON_TEXT');

    const { text: MAIN_PAGE_TITLE, isLoading: isLoadingTitle } = useTextLang('MAIN_PAGE_TITLE');
    const { text: MAIN_PAGE_DESCRIPTION, isLoading: isLoadingDescription } = useTextLang('MAIN_PAGE_DESCRIPTION');
    const { text: MAIN_PAGE_AI_SUBTITLE, isLoading: isLoadingSubtitle } = useTextLang('MAIN_PAGE_AI_SUBTITLE');

    const isLoading = isLoadingTitle && isLoadingDescription && isLoadingSubtitle;

    return (
        <LoadingForPreparedWithChildren isLoading={isLoading ? false : true}>
            <div className="main-page-container">
                <DialogLanguageChange />
                <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", padding: "20px", gap: "10px" }}>
                    <img style={{ width: "0.8vw", height: "auto" }} src={beforeTitle} alt="Before Title" />
                    <h1 style={{ margin: 0, padding: 0 }} className="main-title">{MAIN_PAGE_TITLE}</h1>
                </div>

                <div className="description-container">
                    <AnimalImage img={bear} minWidthToHide={900} imageStyle={{ maxWidth: "10vw" }} alt="bear" />
                    <div className="container-image container-image-size">
                        <AutoTextSize maxFontSizePx={30} mode={'box'} style={{ padding: "30px" }}>
                            {MAIN_PAGE_DESCRIPTION}
                        </AutoTextSize>
                    </div>
                </div>

                <div className="subtitle-container container-image container-image-size">
                    <AutoTextSize maxFontSizePx={30} mode={'box'} style={{ padding: "20px" }}>
                        {MAIN_PAGE_AI_SUBTITLE}
                    </AutoTextSize>
                </div>

                <div className="bottom-container">
                    <AnimalImage img={wolf} minWidthToHide={700} imageStyle={{ maxWidth: "15vw" }} alt={"wolf"} className="wolf-image" />
                    <StartButton text={START_BUTTON_TEXT} to={"choice-level"} />
                    <AnimalImage img={deer} minWidthToHide={700} imageStyle={{ maxWidth: "10vw" }} alt={"deer"} />
                </div>
            </div>
        </LoadingForPreparedWithChildren>
    );
};
