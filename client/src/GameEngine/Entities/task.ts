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
    private elapsedTime = 0;
    private offset = 0;

    constructor(x: number, y: number, name: string, game: Game) {
        this.x = x;
        this.y = y;
        this.name = name;
        this.game = game;
        this.offset = Math.random() * 2;
    }

    render(display: Display): void {
        display.drawImage(this.x, this.y, this.width, this.height, "actions/" + this.name + ".png");
    }

    update(dt: number): void {
        this.elapsedTime += dt;
        this.y = Task.getPositionX(this.y, this.elapsedTime, this.offset);
    }

    /// Returns the positionX at a given time
    private static getPositionX(x: number, elapsedTime: number, offset: number) {
        return x + Math.sin(elapsedTime * 0.005 + offset) * 3;
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
