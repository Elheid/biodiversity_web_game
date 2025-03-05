import { useState, useEffect, useRef } from 'react';
import { Game } from '../classes/game';

export const useTimer = (game?: Game) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const timerRef = useRef<number>(0);

    useEffect(() => {
        if (!game) return;

        const updateTimer = () => {
            const remaining = game.getTimerValue();
            setTimeLeft(remaining);
            if (remaining <= 0) window.clearInterval(timerRef.current);
        };

        timerRef.current = window.setInterval(updateTimer, 100);
        return () => window.clearInterval(timerRef.current);
    }, [game]);

    const formatTime = (ms: number) => {
        const seconds = Math.ceil(ms / 1000);
        return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
    };

    return { timeLeft, formatTime };
};