import { Container, Stack, Typography } from "@mui/material";
import { useGamePointsContext } from "../../context/GamePointsProvider";
import { HomeButton } from "../HomeButtons";
import { useEffect } from "react";
import { setEndBodyStyle } from "../../utill";
import { QRcode } from "../QRcode";
import { useTextLang } from "../../hooks/useTextLang";
import { LoadingForPreparedWithChildren } from "../LoadingForPrepared";
import { QRcontent_ai, QRcontent_self, QRdescription_ai, QRdescription_self } from "../../config";

/**
 * GameEnd component displays the end of game summary with scores and QR codes.
 * It shows localized text and uses context to get game points.
 */
export const GameEnd = () => {
    const { firstRoundPoints, secondRoundPoints } = useGamePointsContext();

    useEffect(() => {
        setEndBodyStyle();
    }, []);

    const { text: END_TITLE, isLoading: isLoadingTitle } = useTextLang('END_TITLE');
    const { text: TRUE_AMOUNT_PHOTO_TEXT, isLoading: isLoadingAmountPhoto } = useTextLang('TRUE_AMOUNT_PHOTO_TEXT');
    const { text: TYPE_OF_SCORE_TEXT_ai, isLoading: isLoadingScoreAi } = useTextLang('TYPE_OF_SCORE_TEXT_ai');
    const { text: TYPE_OF_SCORE_TEXT_self, isLoading: isLoadingScoreSelf } = useTextLang('TYPE_OF_SCORE_TEXT_self');

    const isLoading = isLoadingTitle
        && isLoadingAmountPhoto
        && isLoadingScoreAi
        && isLoadingScoreSelf;

    return (
        <LoadingForPreparedWithChildren isLoading={isLoading ? false : true}>
            <Container sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                textTransform: "uppercase"
            }}>
                <Typography variant="h2">
                    {END_TITLE}
                </Typography>
                <Typography className="gradient-text" variant="h4">
                    {TRUE_AMOUNT_PHOTO_TEXT}
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div className="">
                        {TYPE_OF_SCORE_TEXT_self}:
                        <br /><span className="result-score">{firstRoundPoints}</span>
                        <QRcode qrContent={QRcontent_self} description={QRdescription_self}></QRcode>
                    </div>
                    <div className="">
                        {TYPE_OF_SCORE_TEXT_ai}:
                        <br /><span className="result-score">{secondRoundPoints}</span>
                        <QRcode qrContent={QRcontent_ai} description={QRdescription_ai}></QRcode>
                    </div>
                </Stack>

                <HomeButton />
            </Container>
        </LoadingForPreparedWithChildren>
    );
};
