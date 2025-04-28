import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { Timer } from '../classes/timer';
import { AutoTextSize } from 'auto-text-size';

interface TimerComponentProps {
    timer: Timer;
}

export const TimerComponent= ({ timer }: TimerComponentProps) =>{
    const [timeLeft, setTimeLeft] = useState(timer.remainingTime);

    useEffect(() => {
        // Функция для обновления времени
        const updateTime = () => {
            setTimeLeft(timer.remainingTime);
        };

        // Обновляем время сразу при монтировании
        updateTime();

        // Настраиваем интервал для обновления времени каждые 100 мс
        const interval = setInterval(updateTime, 100);

        // Коллбэк при завершении таймера
        const timeoutCallback = () => {
            setTimeLeft(0);
        };

        // Подписываемся на событие завершения таймера
        timer.onTimeout(timeoutCallback);

        // Очистка при размонтировании
        return () => {
            clearInterval(interval);
            // Удаляем коллбэк из таймера
            timer.offTimeout(timeoutCallback); // Добавьте этот метод в класс Timer
        };
    }, [timer, timer.isRunning]);
    
    const formatTime = (ms: number) => {
        const seconds = Math.ceil(ms / 1000);
        return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
    };

    return (
        <Box className="timer-container timer-container-big" style={{alignItems:"center"}}>
            {/*<Typography
                variant={window.innerWidth < 600 ? 'h6' : 'h3'}
                component="h3"
            >
                {formatTime(timeLeft)}
            </Typography>*/}
            <AutoTextSize maxFontSizePx={40} minFontSizePx={10} mode={"boxoneline"} style={{alignItems:"center"}}>
                {formatTime(timeLeft)}
            </AutoTextSize>
        </Box>
    );
}