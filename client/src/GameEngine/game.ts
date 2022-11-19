import { Player } from "./Entities/player";
import { Entity } from "./Entities/entity";
import { Controller } from "./controller";
import { Display } from "./display";
import { Scoreboard } from "./Entities/scoreboard";
import { GameEventController } from "./Events/gameEventController";
import { Task } from "./Entities/task";
import { getPlayerPostionData } from "./handsfreeController";
import { Time } from "./time";
import { DaySeparator } from "./Entities/daySeparator";

export class Game {
    // "entities" gets rendered on a layer under "gui"
    public entities: Entity[] = [];
    private gui: Entity[] = [];
    public tasks: Task[] = [];

    private lastUpdate: number | undefined;

    private player: Player;
    private scoreboard = new Scoreboard(this);
    private time: Time;

    public currentWidth = 0;
    public currentHeight = 0;

    public cameraCanvasWidth: number;
    public cameraCanvasHeight: number;

    public difficultyLevel: number = 1;
    public readonly maxLevel: number = 10;
    // One out of 4 changes of increasing difficulty on addPoints
    public readonly increaseDiffChance: number = 1 / 4;

    public isGamePaused: boolean = false;
    public isGameOver: boolean = false;

    public gameEvents: GameEventController;

    constructor(display: Display, serverId: string) {
        this.currentWidth = display.context.canvas.width;
        this.currentHeight = display.context.canvas.height;

        this.cameraCanvasWidth = display.cameraCanvasWidth;
        this.cameraCanvasHeight = display.cameraCanvasHeight;

        this.gameEvents = new GameEventController();
        this.time = new Time(10000);
        this.player = new Player(0, 0, this, display);

        this.initAssets();
    }

    onStart(time_stamp: number): void {
        this.time.setStartTime(time_stamp);
    }

    initAssets() {
        this.initGUI();
        this.addEntity(new DaySeparator(this.time));
    }

    initGUI() {
        this.gui = [];
        this.tasks = [];
        this.tasks.push(new Task(50, 50, "washing-machine", this));
        this.tasks.push(new Task(50, 150, "dish-washer", this));
        this.tasks.push(new Task(50, 250, "working", this));
        this.tasks.push(new Task(50, 350, "solana", this));
        // this.gui.push(Task.createRandom(this));
    }

    update(time_stamp: number) {
        if (!this.lastUpdate) this.lastUpdate = time_stamp;

        let dt = time_stamp - this.lastUpdate;
        if (dt === 0) return;

        this.lastUpdate = time_stamp;

        //Update the player
        this.player.update(dt);

        if (!this.isGamePaused) {
            // Update all the entities
            for (let entity of this.entities) {
                entity.update(dt);
            }
        }
        this.time.update(time_stamp, () => this.onDayStart());
    }

    render(display: Display) {
        //For every object to render

        this.player.render(display);

        for (let entity of this.entities) {
            entity.render(display);
        }

        for (let gui of this.gui) {
            gui.render(display);
        }

        for (let task of this.tasks) {
            task.render(display);
        }
    }

    handleInput(controller: Controller) {
        this.player.handleInput(controller);
    }

    resizeEvent(display: Display) {
        this.currentWidth = display.context.canvas.width;
        this.currentHeight = display.context.canvas.height;

        this.cameraCanvasHeight = display.cameraCanvasHeight;
        this.cameraCanvasWidth = display.cameraCanvasWidth;

        // Update the GUI to the new size
        this.initGUI();
    }

    getEntityByUUId(uuid: string): Entity | undefined {
        let entity = this.entities.find((value) => value.id === uuid);
        if (entity) {
            return entity;
        }

        return this.gui.find((value) => value.id === uuid);
    }

    addEntity(e: Entity) {
        this.entities.push(e);
    }

    addPoints(p: number) {
        this.scoreboard.score += p;
        if (p !== 0) {
            this.gameEvents.onScorePoint.next(this.scoreboard.score);

            // Increase difficulty
            const incDiff = Math.random() < this.increaseDiffChance;
            if (incDiff && this.difficultyLevel < this.maxLevel) {
                this.difficultyLevel++;
            }
        }
    }

    subtractLife() {
        this.scoreboard.lifes -= 1;

        if (this.scoreboard.lifes === 0) {
            this.onGameOver();
        }
    }

    removeEntity(uuid: string) {
        let i = this.entities.findIndex((value) => value.id === uuid);
        if (i > -1) {
            this.entities.splice(i, 1);
        } else {
            let i = this.gui.findIndex((value) => value.id === uuid);
            if (i > -1) this.gui.splice(i, 1);
        }
    }

    stop() {
        this.gameEvents.stop();
    }

    private onGameOver() {
        this.isGameOver = true;
        this.gameEvents.onGameOver.next(this.scoreboard.score);
        this.pause();
    }

    pause() {
        this.isGamePaused = true;
    }

    resume() {
        this.isGamePaused = false;
    }

    onDayStart() {
        this.gameEvents.onDaysChange.next(this.time.getDaysCount());
        console.log(this.time.getDaysCount());
    }
}
