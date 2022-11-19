export class Time {
    private dayLength: number;
    private startTime: number;

    constructor(dayLength: number, startTime: number = 0) {
        this.dayLength = dayLength;
        this.startTime = startTime;
    }

    setStartTime(startTime: number) {
        this.startTime = startTime;
    }

    getCurrentTimeInPercentOfDay(time_stamp: number): number {
        let dt = (time_stamp - this.startTime) % this.dayLength;
        let currentTime = dt / this.dayLength;
        return currentTime;
    }
}
