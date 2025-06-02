/**
 * Timer class manages a countdown timer with start, pause, stop, and callback functionality.
 */
export class Timer {
    private timeoutId: number | null = null;
    private callbacks: Array<() => void> = [];
    private startTime: number = 0;
    private remaining: number = 0;
    private originalDuration: number;
    private currentDuration: number;
    public isRunning: boolean = false;

    /**
     * Constructs a new Timer instance.
     * @param durationMs - Duration of the timer in milliseconds.
     */
    constructor(durationMs: number) {
        this.originalDuration = durationMs;
        this.currentDuration = durationMs;
    }

    /**
     * Starts the timer if not already running.
     */
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

    /**
     * Pauses the timer if running.
     */
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

    /**
     * Stops the timer and resets remaining time.
     */
    stop(): void {
        this.remaining = 0;
        this.isRunning = false;
        this.currentDuration = this.originalDuration;
        
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }

    /**
     * Destroys the timer and clears callbacks.
     */
    destroy(): void {
        this.stop();
        this.callbacks = [];
    }

    /**
     * Gets the remaining time on the timer.
     */
    get remainingTime(): number {
        if (!this.isRunning) return this.remaining;
        return Math.max(this.currentDuration - (Date.now() - this.startTime), 0);
    }

    /**
     * Gets the elapsed time since the timer started.
     */
    get elapsedTime(): number {
        return this.originalDuration - this.remainingTime;
    }

    /**
     * Gets the progress of the timer as a fraction between 0 and 1.
     */
    getProgress(): number {
        return Math.min(this.elapsedTime / this.originalDuration, 1);
    }

    /**
     * Registers a callback to be called when the timer times out.
     * @param callback - The callback function.
     */
    onTimeout(callback: () => void): void {
        if (!this.callbacks.includes(callback)) {
            this.callbacks.push(callback);
        }
    }

    /**
     * Unregisters a previously registered timeout callback.
     * @param callback - The callback function to remove.
     */
    offTimeout(callback: () => void): void {
        this.callbacks = this.callbacks.filter(cb => cb !== callback);
    }
}
