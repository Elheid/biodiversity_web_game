import { useEffect, useState } from "react";

/**
 * Custom React hook to track if the window width is greater than a specified minimum width.
 * @param width - The minimum width to check against.
 * @returns Object containing a boolean isMinWidth indicating if window width is greater than the specified width.
 */
export const useMinWidth = (width: number) => {
    const [isMinWidth, setIsMinWidth] = useState(false);

    useEffect(() => {
        const checkWidth = () => {
            setIsMinWidth(window.innerWidth > width);
        };

        checkWidth();
        window.addEventListener('resize', checkWidth);

        return () => window.removeEventListener('resize', checkWidth);
    }, [width]);

    return { isMinWidth };
};
