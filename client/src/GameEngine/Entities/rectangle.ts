import { Entity } from "./entity";
import { Display } from "../display";
import { v4 as uuid } from "uuid";

export class Rectangle implements Entity {
    x: number;
    y: number;
    id = uuid();

    width: number;
    height: number;
    color: string;
    alpha: number;
    strokeStyle: string;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        color: string,
        alpha: number = 1,
        strokeStyle: string
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.alpha = alpha;
        this.strokeStyle = strokeStyle;
    }

    update(dt: number): void {}

    render(display: Display): void {
        display.drawRectangle(
            this.x,
            this.y,
            this.width,
            this.height,
            this.color,
            this.alpha,
            this.strokeStyle
        );
    }
}
