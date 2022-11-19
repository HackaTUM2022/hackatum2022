export class Time {
    private dayLength: number;
    private startTime: number;
    private currentTime: number;
    private currentDay: number;

    constructor(dayLength: number, startTime: number = 0) {
        this.dayLength = dayLength;
        this.startTime = startTime;
        this.currentTime = startTime;
        this.currentDay = this.getDaysCount();
    }

    update(time_stamp: number, onDayStart: () => void) {
        this.currentTime = time_stamp;
        const newDate = this.getDaysCount();
        if (newDate !== this.currentDay) {
            this.currentDay = newDate;
            onDayStart();
        }
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

    getDaysCount(): number {
        let days = Math.ceil((this.currentTime - this.startTime) / this.dayLength);
        return days;
    }
}
