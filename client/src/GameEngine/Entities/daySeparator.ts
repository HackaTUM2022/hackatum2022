import { Entity } from "./entity";
import { Display } from "../display";
import { v4 as uuid } from "uuid";
import { Time } from "../time";

export class DaySeparator implements Entity {
    x: number = 0;
    y: number = 0;
    id = uuid();
    time: Time;
    constructor(time: Time) {
        this.time = time;
    }

    update(dt: number): void {}

    render(display: Display): void {
        display.drawRectangle(
            display.getXPositionFromTime(this.time.getCurrentTimeInPercentOfDay() * 24),
            0,
            20,
            display.cameraCanvasHeight,
            "rgba(255, 255, 255, 0.5)",
        );
    }
}
