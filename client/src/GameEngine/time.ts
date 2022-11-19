export class Time {
    private dayLength: number;
    private startTime: number;
    private currentTime: number;

    constructor(dayLength: number, startTime: number = 0) {
        this.dayLength = dayLength;
        this.startTime = startTime;
        this.currentTime = startTime;
    }

    update(time_stamp: number) {
        this.currentTime = time_stamp;
    }

    setStartTime(startTime: number) {
        this.startTime = startTime;
        this.currentTime = startTime;
    }

    getCurrentTimeInPercentOfDay(): number {
        let dt = (this.currentTime - this.startTime) % this.dayLength;
        let currentTime = dt / this.dayLength;
        return currentTime;
    }
}
