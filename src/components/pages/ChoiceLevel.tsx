import { Box, Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { setRoundsBodyStyle, setStartRoundsBodyStyle } from "../../utill";
import { NavLink } from "react-router";
import { AutoTextSize } from "auto-text-size";
import { useMinWidth } from "../../hooks/useMinWidth";
import { useResetPoints } from "../../hooks/resetPoints";
import { useTextLang } from "../../hooks/useTextLang";

import { LoadingForPreparedWithChildren } from "../LoadingForPrepared";
import { endSession, startSessionRequest } from "../../api/api";

/**
 * Props for the LevelCard component.
 */
export interface LevelCardProps {
    title: string;
    description?: string;
    to: string;
    removeAnimation?: boolean;
}

/**
 * LevelCard component renders a clickable card for a game level.
 * It resets points on mount and adjusts styles based on screen width.
 */
export const LevelCard = ({ title, /*description, */to, removeAnimation }: LevelCardProps) => {
    useResetPoints();

    const { isMinWidth } = useMinWidth(1250);

    useEffect(() => {
        endSession(); // End previous session
        startSessionRequest(); // Start new session
        if (isMinWidth) setStartRoundsBodyStyle("second-full");
        else setStartRoundsBodyStyle();
    }, [isMinWidth]);

    return (
        <Box className={removeAnimation ? "level-box" : ""}>
            <div className="white-container" style={{ display: "block", textDecoration: "none", padding: 0 }}>
                <div className="container-image">
                    <NavLink to={to} className={"level-text"} style={{ color: "rgba(51, 63, 72, 1)" }}>
                        <div style={{ justifyContent: "center" }}>
                            <AutoTextSize maxFontSizePx={40} mode={'box'} style={{ padding: "20px" }}>
                                {title}
                            </AutoTextSize>
                        </div>
                        <div>
                            <AutoTextSize maxFontSizePx={30} mode={'box'} style={{ padding: "20px", color: "rgba(51, 63, 72, 1)" }}>
                                {/* description */}
                            </AutoTextSize>
                        </div>
                    </NavLink>
                </div>
            </div>
        </Box>
    );
};

/**
 * ChoiceLevel component renders the level selection page.
 * It displays a list of LevelCard components and handles responsive layout.
 */
export const ChoiceLevel = () => {
    const { isMinWidth } = useMinWidth(862);

    useEffect(() => {
        setRoundsBodyStyle();
    }, []);

    const { text: CHOICE_LEVEL_TEXT, isLoading } = useTextLang('CHOICE_LEVEL_TEXT');

    const levelCards = [
        { title: "Full game", description: "Тут будет описаниe", to: "/first-round-start" },
        { title: "1 level", description: "Тут будет описаниe", to: "/first-round-start/onlyFirst" },
        { title: "2 level", description: "Тут будет описаниe", to: "/second-round-start" },
    ];

    const style: object = isMinWidth
        ? {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            minHeight: "5vh",
            boxSizing: "content-box",
            gap: "2vw",
        }
        : {
            display: "flex",
            flexDirection: "column",
            minHeight: "5vh",
            boxSizing: "content-box",
            gap: "2vw",
        };

    return (
        <LoadingForPreparedWithChildren isLoading={isLoading ? false : true}>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography className="gradient-text" variant="h3" style={{ padding: "20px", margin: "0 auto" }}>
                    {CHOICE_LEVEL_TEXT}
                </Typography>
                <Container sx={{ padding: "0 !important", ...style }}>
                    {levelCards.map(item => (
                        <LevelCard
                            removeAnimation={isMinWidth}
                            key={item.title}
                            title={item.title}
                            description={item.description}
                            to={item.to}
                        />
                    ))}
                </Container>
            </Box>
        </LoadingForPreparedWithChildren>
    );
};
