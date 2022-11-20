import { Display } from "../display";
import { Rectangle } from "./rectangle";

/**
 * Tile is a rectangle which is transparent but can blink once when calling blink()
 */
export class BlinkingRectangle extends Rectangle {
    private blinkStart: number | undefined;
    private timeElapsed = 0;
    private duration = 500; // 0.5s

    update(dt: number) {
        super.update(dt);
        this.timeElapsed += dt;
    }

    render(display: Display) {
        if (this.blinkStart && this.timeElapsed < this.blinkStart + this.duration) {
            display.drawRectangle(this.x, this.y, this.width, this.height, this.color);
        }
    }

    blink() {
        this.blinkStart = this.timeElapsed;
    }
}
