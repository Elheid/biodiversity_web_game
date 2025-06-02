import { Button } from "@mui/material";
import { NavLink } from "react-router";
import startButton from "../assets/img/start.svg";
//import startButtonHover from "../assets/img/startHover.svg";

import coloredButton from "../assets/img/coloredButton.svg";
import interEndButton from "../assets/img/interEndButton.svg";
import { useMinWidth } from "../hooks/useMinWidth";

/**
 * Props for the StartButton component.
 */
interface StartButton {
    to: string;
    onClick?: () => void;
    variant?: "white" | "colored" | "interEnd";
    text?: string;
}

/**
 * StartButton component renders a styled button with optional variants and responsive text size.
 * It supports navigation via react-router NavLink and displays an image background.
 */
export const StartButton = ({ to, onClick, variant = "white", text }: StartButton) => {
    const { isMinWidth } = useMinWidth(700);
    let fontSize = isMinWidth ? "1.5rem" : "1rem";

    const { isMinWidth: isMinWidthSecond } = useMinWidth(436);
    if (!isMinWidthSecond) fontSize = "0.6rem";

    let imageSrc = startButton;
    if (variant === "colored") imageSrc = coloredButton;

    if (variant == "white")
        return (
            <Button
                className="icon-button"
                component={NavLink}
                to={to}
                onClick={onClick}
                sx={{
                    position: "relative",
                    height: "fit-content",
                    margin: "auto 0",
                    padding: 0,
                    minWidth: "auto",
                    overflow: "hidden", // Clip pseudo-element
                    "&:hover": {
                        backgroundColor: "transparent",
                        "&::after": {
                            opacity: 1, // Control pseudo-element opacity on hover
                        },
                    },
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: `var(--start-button-img-hover) center/contain no-repeat`,
                        opacity: 0,
                        transition: "opacity 0.3s",
                    },
                }}
            >
                <img
                    src={imageSrc}
                    className="button-icon"
                    alt="Start button"
                    style={{
                        display: "block",
                        width: "100%",
                        height: "auto",
                        transition: "opacity 0.3s",
                        position: "relative", // Position above pseudo-element
                        zIndex: 1, // Raise above pseudo-element
                    }}
                />
                {text && (
                    <span
                        className="start-button-text"
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "rgba(73, 93, 177, 1)",
                            fontSize: fontSize,
                            pointerEvents: "none",
                            whiteSpace: "nowrap",
                            zIndex: 2, // Text above all
                        }}
                    >
                        {text}
                    </span>
                )}
            </Button>
        );
    if (variant == "colored" || variant == "interEnd") {
        const imageSrc = variant === "colored" ? coloredButton : interEndButton;

        return (
            <Button
                component={NavLink}
                to={to}
                onClick={onClick}
                sx={{
                    position: "relative",
                    padding: 0,
                    minWidth: "auto",
                    "&:hover": {
                        background: "none", // Remove MUI hover effect
                    },
                }}
            >
                <img
                    className="start-button-img"
                    src={imageSrc}
                    alt="Start button"
                    style={{ display: "block", width: "100%", height: "auto" }}
                />
                {text && (
                    <span
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "white",
                            fontSize: fontSize,
                            pointerEvents: "none", // Makes the text non-interactive
                            whiteSpace: "nowrap",
                        }}
                    >
                        {text}
                    </span>
                )}
            </Button>
        );
    }
};
