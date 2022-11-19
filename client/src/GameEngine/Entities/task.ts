import { Entity } from "./entity";
import { Display } from "../display";
import { v4 as uuid } from "uuid";
import { Game } from "../game";

export class Task implements Entity {
    private static tasks = [
        "washing-machine",
        "working",
        "solana",
        "dish-washer",
        "television",
        "heater",
        "bitcoin",
    ];

    public width = 64;
    public height = 64;
    id = uuid();
    name: string;
    game: Game;

    public x = 0;
    public y = 0;

    constructor(x: number, y: number, name: string, game: Game) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.game = game;
    }

    render(display: Display): void {
        display.drawCircle(100, 100, 5, "blue");

        display.drawImage(this.x, this.y, this.width, this.height, "actions/" + this.name + ".png");
    }

    update(dt: number): void {}

    /// Returns the positionX at a given time
    private static getPositionX(x: number, elapsedTime: number) {
        return x + Math.sin(elapsedTime * 0.002) * 50;
    }

    private getTileCenter(tileId: number) {
        return this.game.currentWidth * (0.333 * tileId - 0.166);
    }

    static createRandom(game: Game) {
        let x = Math.floor(Math.random() * (game.cameraCanvasWidth - 100) + 50);

        return new Task(x, 0, Task.tasks[Math.floor(Math.random() * Task.tasks.length)], game);
    }

    static getImagesToLoad() {
        let paths = [];
        for (let i = 0; i < this.tasks.length; i++) {
            paths.push("actions" + "/" + this.tasks[i] + ".png");
        }

        return paths;
    }
}
