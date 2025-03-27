export class Timer {
    private timeoutId: number | null = null;
    private callbacks: Array<() => void> = [];
    private startTime: number = 0;
    private remaining: number = 0;
    private originalDuration: number;
    private currentDuration: number;
    public isRunning: boolean = false;

    constructor(durationMs: number) {
        this.originalDuration = durationMs;
        this.currentDuration = durationMs;
    }

    start(): void {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.startTime = Date.now();
        const duration = this.remaining > 0 ? this.remaining : this.originalDuration;
        this.currentDuration = duration;

        this.timeoutId = window.setTimeout(() => {
            this.isRunning = false;
            this.remaining = 0;
            this.currentDuration = this.originalDuration;
            this.callbacks.forEach(callback => callback());
        }, duration);
    }

    pause(): void {
        if (!this.isRunning) return;
        
        const elapsed = Date.now() - this.startTime;
        this.remaining = Math.max(this.currentDuration - elapsed, 0);
        this.isRunning = false;
        
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }

    stop(): void {
        this.remaining = 0;
        this.isRunning = false;
        this.currentDuration = this.originalDuration;
        
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }

    destroy(): void {
        this.stop();
        this.callbacks = [];
    }

    get remainingTime(): number {
        if (!this.isRunning) return this.remaining;
        return Math.max(this.currentDuration - (Date.now() - this.startTime), 0);
    }

    get elapsedTime(): number {
        return this.originalDuration - this.remainingTime;
    }

    getProgress(): number {
        return Math.min(this.elapsedTime / this.originalDuration, 1);
    }

    onTimeout(callback: () => void): void {
        if (!this.callbacks.includes(callback)) {
            this.callbacks.push(callback);
        }
    }

    offTimeout(callback: () => void): void {
        this.callbacks = this.callbacks.filter(cb => cb !== callback);
    }
}
