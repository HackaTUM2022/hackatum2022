import { Entity } from "./entity";
import { Display } from "../display";
import { v4 as uuid } from "uuid";

export class Chart implements Entity {
    dayData: number[];
    color: string;
    x: number = 0;
    y: number = 0;
    id = uuid();
    constructor(dayData: number[], color: string) {
        this.dayData = dayData;
        this.color = color;
    }

    update(dt: number): void {}

    render(display: Display): void {
        if (this.dayData.length === 0) return;

        const offset = 170;

        // generate points for the chart from dayData array and draw them on the canvas using full width of the canvas
        let points = [];
        const width = display.getDrawableWidth();
        const height = display.getDrawableHeight();
        for (let i = 0; i < this.dayData.length; i++) {
            points.push({
                x: (i / this.dayData.length) * width + 25,
                y: height - offset - this.dayData[i] * height * 0.3,
            });
        }
        display.drawSmoothCurve(points, this.color);
    }
}
