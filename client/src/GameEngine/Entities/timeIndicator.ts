import { Display } from "../display";
import { Entity } from "./entity";
import { v4 as uuid } from "uuid";

export class TimeIndicator implements Entity {
    height: number;
    color: string;
    time: number;
    x = 0;
    y = 0;
    id = uuid();

    constructor(time: number) {
        this.height = 20;
        this.color = "black";
        this.time = time;
    }

    update(dt: number) {}

    render(display: Display): void {
        const x = display.getXPositionFromTime(this.time);
        const y = display.getDrawableHeight() - 50;
        display.drawText(x, y, this.time.toFixed() + ":00", "bold 40px Arial", "white", true);
        console.log(this.time.toFixed());
    }
}
