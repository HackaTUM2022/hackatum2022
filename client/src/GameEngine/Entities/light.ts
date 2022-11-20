import { Entity } from "./entity";
import { Display } from "../display";
import { v4 as uuid } from "uuid";
import { Time } from "../time";

export class Light implements Entity {
    x: number;
    y: number;
    width: number = 64;
    height: number = 64;
    time: Time;
    id = uuid();

    constructor(x: number, y: number, time: Time) {
        this.x = x;
        this.y = y;
        this.time = time;
    }

    update(dt: number): void {}

    render(display: Display): void {
        this.x = display.getXPositionFromTime(this.time.getCurrentTimeInPercentOfDay() * 24);
        const readableTime = this.time.getCurrentTimeInPercentOfDay() * 24;

        if (readableTime <= 6 || readableTime >= 19) {
            display.drawImage(
                this.x - this.width / 2 + 10,
                display.getDrawableHeight() - 150,
                this.width,
                this.height,
                "moon.png"
            );
        } else {
            display.drawImage(
                this.x - this.width / 2 + 10,
                display.getDrawableHeight() - 150,
                this.width,
                this.height,
                "weather/sunny.png"
            );
        }
    }
}
