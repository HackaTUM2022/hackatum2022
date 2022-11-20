export class Time {
    private dayLength: number;
    private startTime: number;
    private currentTime: number;
    private currentDay: number;

    constructor(dayLength: number, startTime: number = 0) {
        this.dayLength = dayLength;
        this.startTime = startTime;
        this.currentTime = startTime;
        this.currentDay = 1;
    }

    update(time_stamp: number, onDayStart: () => void) {
        this.currentTime = time_stamp;
        if (this.currentTime - this.startTime > this.dayLength){

            this.currentDay++;
            this.startTime = time_stamp;
            onDayStart();
        }
    }

    setStartTime(startTime: number) {
        this.startTime = startTime;
        this.currentTime = startTime;
    }

    getDayLength(): number {
        return this.dayLength;
    }

    setDayLength(dayLength: number) {
        this.dayLength = dayLength;
    }

    getCurrentTimeInPercentOfDay(): number {
        let dt = (this.currentTime - this.startTime) % this.dayLength;
        let currentTime = dt / this.dayLength;
        return currentTime;
    }

    getDaysCount(): number {
        return this.currentDay;
    }
}
