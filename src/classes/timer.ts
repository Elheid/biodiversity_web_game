export class Timer {
    private timeoutId: number | null = null;
    private callbacks: Array<() => void> = [];
    private startTime: number = 0; // Время старта таймера
    private remaining: number = 0; // Оставшееся время при паузе

    constructor(private durationMs: number) { }

    private isRunning: boolean = false;

    start():void {
        if (this.isRunning) {
            throw new Error("Timer is already running.");
        }
        
        this.isRunning = true;
        // Запоминаем время старта
        this.startTime = Date.now();
        // Корректируем durationMs если было прервано ранее
        const duration = this.remaining > 0 ? this.remaining : this.durationMs;

        this.timeoutId = window.setTimeout(() => {
            this.isRunning = false;
            this.remaining = 0; // Сбрасываем оставшееся время
            
            this.callbacks.forEach(callback => callback());
            console.log('Timer expired!');
        }, duration);
    }

    stop():void {
        if (!this.isRunning) return;
        
        // Сохраняем оставшееся время при остановке
        const elapsed = Date.now() - this.startTime;
        this.remaining = Math.max(this.durationMs - elapsed, 0);
        
        this.isRunning = false;
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }

    destroy(): void {
        this.stop();
        this.callbacks = []; // Очищаем все коллбэки
        this.remaining = 0;
        this.durationMs = 0;
    }


    // Прошедшее время в миллисекундах
    get elapsedTime(): number {
        if (!this.isRunning) return this.durationMs - this.remaining;
        return Date.now() - this.startTime;
    }

    // Оставшееся время в миллисекундах
    get remainingTime(): number {
        return Math.max(this.durationMs - this.elapsedTime, 0);
    }

    onTimeout(callback: () => void):void {
        if (!this.callbacks.includes(callback)) {
            this.callbacks.push(callback);
        }
    }

    
    getProgress(): number {
        return Math.min(this.elapsedTime / this.durationMs, 1);
    }
}