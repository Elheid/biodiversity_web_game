import { Container, Typography } from "@mui/material";
import { useGamePointsContext } from "../../context/GamePointsProvider";
import { AutoTextSize } from "auto-text-size";
import { setStartRoundsBodyStyle } from "../../utill";
import { useEffect } from "react";
import { StartButton } from "../StartButton";
import { useMinWidth } from "../../hooks/useMinWidth";
import { useTextLang } from "../../hooks/useTextLang";

import { LoadingForPreparedWithChildren } from "../LoadingForPrepared";

/**
 * InterEnd component displays intermediate end screen with score and option to try AI.
 */
export const InterEnd = () => {
    const { firstRoundPoints } = useGamePointsContext();

    useEffect(() => {
        setStartRoundsBodyStyle();
    }, []);

    const { isMinWidth } = useMinWidth(824);

    const { text: TRUE_AMOUNT_PHOTO_TEXT, isLoading: isLoadingAmountPhoto } = useTextLang('TRUE_AMOUNT_PHOTO_TEXT');
    const { text: TRY_AI_BUTTON_TEXT, isLoading: isLoadingTryAi } = useTextLang('TRY_AI_BUTTON_TEXT');
    const { text: YOUR_SCORE_TEXT, isLoading: isLoadingScore } = useTextLang('YOUR_SCORE_TEXT');

    const isLoading = isLoadingAmountPhoto
        && isLoadingTryAi
        && isLoadingScore;

    return (
        <LoadingForPreparedWithChildren isLoading={isLoading ? false : true}>
            <Container className="container-with-gap">
                <div className="white-container" style={{ marginBottom: "8vh" }}>
                    <div className="container-image" style={{ justifyContent: "center" }}>
                        <AutoTextSize className="text-block-auto-size" maxFontSizePx={50} mode={"box"} style={{ padding: "20px" }}>
                            <Typography variant={isMinWidth ? "h1" : "h3"}>
                                {YOUR_SCORE_TEXT}
                            </Typography>
                            <Typography variant="h5">
                                {TRUE_AMOUNT_PHOTO_TEXT}
                            </Typography>
                            <Typography>
                                <span className="result-score">{firstRoundPoints}</span>
                            </Typography>
                        </AutoTextSize>
                    </div>
                </div>
                <StartButton variant="interEnd" text={TRY_AI_BUTTON_TEXT} to={"/second-round-start"} />
            </Container>
        </LoadingForPreparedWithChildren>
    );
};
