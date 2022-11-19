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

    constructor(x: number, y: number, width: number, height: number, color: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    update(dt: number): void {}

    render(display: Display): void {
        display.drawRectangle(this.x, this.y, this.width, this.height, this.color);
    }
}
