import { Entity } from "./entity";
import { Display } from "../display";
import { v4 as uuid } from "uuid";

export class Chart implements Entity {
    dayData: number[];
    x: number = 0;
    y: number = 0;
    id = uuid();
    constructor(dayData: number[]) {
        this.dayData = dayData;
    }

    update(dt: number): void {}

    render(display: Display): void {
        if (this.dayData.length === 0) return;

        // generate points for the chart from dayData array and draw them on the canvas using full width of the canvas
        let points = [];
        const width = display.cameraCanvasWidth;
        const height = display.cameraCanvasHeight;
        for (let i = 0; i < this.dayData.length; i++) {
            points.push({
                x: (i / this.dayData.length) * width,
                y: height - this.dayData[i] * height,
            });
        }
        console.log(points);
        display.drawSmoothCurve(points, "red");
    }
}