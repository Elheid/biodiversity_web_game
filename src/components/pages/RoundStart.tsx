
import { useEffect } from "react";
import { endSession, startSessionRequest } from "../../api/api";
import { GameType } from "../../interfaces/rounds";
import { TextForRoundStart } from "../TextForRoundStart";
import { StartButton } from "../StartButton";
import { setStartRoundsBodyStyle } from "../../utill";
import { useParams } from "react-router";
import { useTextLang } from "../../hooks/useTextLang";

import { useMinWidth } from "../../hooks/useMinWidth";

/**
 * RoundStart component renders the start screen for a game round.
 * It manages session start/end, applies styles, and renders start button.
 * 
 * @param roundType - The type of the game round (first or second).
 */
export const RoundStart = ({ roundType }: { roundType: GameType }) => {
    const { isMinWidth } = useMinWidth(1250);

    useEffect(() => {
        endSession(); // End previous session
        startSessionRequest(); // Start new session
        if (isMinWidth) setStartRoundsBodyStyle(roundType === GameType.firstType ? "first-full" : "second-full");
        else setStartRoundsBodyStyle();
    }, [isMinWidth]);

    const { onlyFirst } = useParams<{ onlyFirst: string }>();

    const urlParam = onlyFirst ? `first-round${"/" + onlyFirst}` : `first-round`;
    const roundStartButton = roundType === GameType.firstType ? urlParam : "second-round";

    const { text: RAUND_START__BUTTON_TEXT, isLoading } = useTextLang('RAUND_START__BUTTON_TEXT');

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
                <TextForRoundStart isLoading={isLoading ? false : true} roundType={roundType} />
                <StartButton variant="colored" text={RAUND_START__BUTTON_TEXT} to={`/${roundStartButton}`} />
            </div>
        </div>
    );
};
