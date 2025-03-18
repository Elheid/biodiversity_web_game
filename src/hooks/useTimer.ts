import { useState, useEffect, useRef } from 'react';
import { useGameContext } from '../context/GameContextProvider';

export const useTimer = () => {
    const {game} = useGameContext();

    const [timeLeft, setTimeLeft] = useState(0);
    const timerRef = useRef<number>(0);
    const abortControllerRef = useRef(new AbortController());

    useEffect(() => {
        if (!game || !game.timer.isRunning) return;

        const updateTimer = () => {
            if (abortControllerRef.current.signal.aborted) return;

            const remaining = game.getTimerValue();
            setTimeLeft(remaining);

            if (remaining <= 0) {
                window.clearInterval(timerRef.current);
            }
        };

        // Запускаем обновление таймера
        timerRef.current = window.setInterval(updateTimer, 100);

        // Обработчик для остановки при закрытии страницы
        const handleBeforeUnload = () => game.stopGame();
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Очистка
        return () => {
            window.clearInterval(timerRef.current);
            game.stopGame();
            window.removeEventListener('beforeunload', handleBeforeUnload);
            abortControllerRef.current.abort();
        };
    }, [game, game?.timer.isRunning]);

    const formatTime = (ms: number) => {
        const seconds = Math.ceil(ms / 1000);
        return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
    };

    return { timeLeft, formatTime };
};