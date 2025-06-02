import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { Timer } from '../classes/timer';
import { AutoTextSize } from 'auto-text-size';

/**
 * Props for the TimerComponent.
 */
interface TimerComponentProps {
    timer: Timer;
}

/**
 * TimerComponent displays a countdown timer.
 * It updates every 100ms and formats the remaining time as MM:SS.
 */
export const TimerComponent = ({ timer }: TimerComponentProps) => {
    const [timeLeft, setTimeLeft] = useState(timer.remainingTime);

    useEffect(() => {
        // Function to update the remaining time state
        const updateTime = () => {
            setTimeLeft(timer.remainingTime);
        };

        // Update immediately on mount
        updateTime();

        // Set interval to update time every 100ms
        const interval = setInterval(updateTime, 100);

        // Callback when timer finishes
        const timeoutCallback = () => {
            setTimeLeft(0);
        };

        // Subscribe to timer timeout event
        timer.onTimeout(timeoutCallback);

        // Cleanup on unmount
        return () => {
            clearInterval(interval);
            // Remove timeout callback from timer
            timer.offTimeout(timeoutCallback); // Ensure this method exists in Timer class
        };
    }, [timer, timer.isRunning]);

    // Format milliseconds to MM:SS string
    const formatTime = (ms: number) => {
        const seconds = Math.ceil(ms / 1000);
        return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
    };

    return (
        <Box className="timer-container timer-container-big" style={{ alignItems: "center" }}>
            {/* Uncomment Typography if needed for different styling */}
            {/*<Typography
                variant={window.innerWidth < 600 ? 'h6' : 'h3'}
                component="h3"
            >
                {formatTime(timeLeft)}
            </Typography>*/}
            <AutoTextSize maxFontSizePx={40} minFontSizePx={10} mode={"boxoneline"} style={{ alignItems: "center" }}>
                {formatTime(timeLeft)}
            </AutoTextSize>
        </Box>
    );
};
