import { Container, Typography } from "@mui/material";
import { GameType } from "../interfaces/rounds";
import { AutoTextSize } from "auto-text-size";
import { useMinWidth } from "../hooks/useMinWidth";
import { useTextLang } from "../hooks/useTextLang";

import { LoadingForPreparedWithChildren } from "./LoadingForPrepared";

/**
 * Props for the TextForRoundStart component.
 */
interface TextForRoundStartProps {
    roundType: GameType;
    isLoading: boolean;
}

/**
 * TextForRoundStart component displays localized text for the start of a game round.
 * It adjusts text size responsively and shows a loading state while texts are loading.
 */
export const TextForRoundStart = ({ roundType, isLoading }: TextForRoundStartProps) => {
    const { text: ROUND_TARGET, isLoading: isLoadingTarget } = useTextLang('ROUND_TARGET');
    const { text: ROUND_TARGET_TITLE_AI, isLoading: isLoadingTitleAi } = useTextLang('ROUND_TARGET_TITLE_AI');
    const { text: ROUND_TARGET_TITLE, isLoading: isLoadingTitle } = useTextLang('ROUND_TARGET_TITLE');
    const { text: RAUND_TEXT, isLoading: isLoadingText } = useTextLang('RAUND_TEXT');

    let roundNum = 1;
    let target = ROUND_TARGET_TITLE;
    if (roundType === GameType.secondType) {
        roundNum = 2;
        target = ROUND_TARGET_TITLE_AI;
    }

    const { isMinWidth } = useMinWidth(740);

    const isLoadingAllText = isLoadingTarget
        && isLoadingTitleAi
        && isLoadingTitle
        && isLoadingText;

    return (
        <LoadingForPreparedWithChildren isLoading={(isLoadingAllText ? false : true) && isLoading}>
            <Container className="white-container" sx={{ marginBottom: "8vh" }}>
                <div className="container-image">
                    <Container>
                        <AutoTextSize className="text-block-auto-size" maxFontSizePx={30} mode={'box'} style={{ padding: "20px" }}>
                            <Typography className="gradient-text" variant={isMinWidth ? "h1" : "h2"}>
                                {RAUND_TEXT} {roundNum}
                            </Typography>
                            <Typography variant={isMinWidth ? "h3" : "h5"}>
                                {target}
                            </Typography>
                            <Typography variant={isMinWidth ? "h5" : "h6"}>
                                <div dangerouslySetInnerHTML={{ __html: ROUND_TARGET }} />
                            </Typography>
                        </AutoTextSize>
                    </Container>
                </div>
            </Container>
        </LoadingForPreparedWithChildren>
    );
};
