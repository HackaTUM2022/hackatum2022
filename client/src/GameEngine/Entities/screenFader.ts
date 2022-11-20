import { Entity } from "./entity";
import { Display } from "../display";
import { v4 as uuid } from "uuid";
import { Time } from "../time";

export class ScreenFader implements Entity {
    x: number = 0;
    y: number = 0;
    width: number;
    height: number;
    time: Time;
    color: string;
    alpha: number;
    id = uuid();

    constructor(width: number, height: number, time: Time, color: string, alpha: number) {
        this.width = width;
        this.height = height;
        this.time = time;
        this.color = color;
        this.alpha = alpha;
    }

    update(dt: number): void {}

    render(display: Display): void {
        this.width = display.getXPositionFromTime(this.time.getCurrentTimeInPercentOfDay() * 24);

        display.drawRectangle(
            this.x,
            this.y,
            this.width,
            display.getDrawableHeight(),
            this.color,
            this.alpha
        );
    }
}
