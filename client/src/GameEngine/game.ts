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
import { ClientNetworking } from "./ClientNetworking";
import { TimeIndicator } from "./Entities/timeIndicator";
import { Chart } from "./Entities/chart";
import { WeatherIcon } from "./Entities/weatherIcon";

export class Game {
    // "entities" gets rendered on a layer under "gui"
    public entities: Entity[] = [];
    private gui: Entity[] = [];
    private networkInterface = new ClientNetworking();
    public tasks: Task[] = [];
    private weatherIcons: WeatherIcon[] = [];
    public timeLines: Entity[] = [];

    private lastUpdate: number | undefined;

    private player: Player;
    private chart = new Chart([]);
    private scoreboard = new Scoreboard(this);
    public time: Time;
    private money: number;
    private dayConsumption: [number] = [0];
    private dayProduction: [number] = [0];
    private dayWeather: [number] = [0]; // encoding: 0 = sunny, 1 = cloudy, 2 = rainy

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
        this.money = 100; // TODO: decide on starting money
        this.player = new Player(0, 0, this, display);

        this.initAssets();
    }

    getTime() {
        return this.time;
    }

    onStart(time_stamp: number): void {
        this.time.setStartTime(time_stamp);
        this.onDayStart();
    }

    initAssets() {
        this.initGUI();
        this.addEntity(new DaySeparator(this.time));
    }

    initGUI() {
        this.gui = [];

        // time line
        for (let i = 3; i < 24; i += 3) {
            this.gui.push(new TimeIndicator(i));
        }

        //add grass
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

            for (let task of this.tasks) {
                task.update(dt);
            }
        }
        this.time.update(time_stamp, () => this.onDayStart());
    }

    render(display: Display) {
        //For every object to render

        this.player.render(display);
        display.drawImage(
            0,
            display.getDrawableHeight() - 110,
            display.getDrawableWidth(),
            110,
            "gras.png"
        );

        for (let entity of this.entities) {
            entity.render(display);
        }

        for (let gui of this.gui) {
            gui.render(display);
        }

        for (let task of this.tasks) {
            task.render(display);
        }

        this.chart.render(display);
        for (let weatherIcon of this.weatherIcons) {
            weatherIcon.render(display);
        }

        for (let timeLine of this.timeLines) {
            timeLine.render(display);
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

    addToTimeLine(entity: Entity) {
        this.timeLines.push(entity);
    }

    stop() {
        this.gameEvents.stop();
    }

    private onGameOver() {
        this.isGameOver = true;
        this.gameEvents.onGameOver.next(this.scoreboard.score);
        this.pause();
        this.stop();
    }

    pause() {
        this.isGamePaused = true;
    }

    resume() {
        this.isGamePaused = false;
    }

    onDayStart() {
        if (this.time.getDaysCount() !== 1) {
            this.tasks.forEach((task) => {
                if (!task.selected) {
                    this.onGameOver();
                    return;
                }
            });
        }

        this.timeLines = [];
        this.gameEvents.onDaysChange.next(this.time.getDaysCount());

        this.tasks = this.addDifferentTasks();
        this.networkInterface
            .getNewDay()
            .then((data) => {
                this.dayConsumption = data.consumption.map((value: any) => value[1]);
                this.dayProduction = data.production.map((value: any) => value[1]);
                this.dayWeather = data.weather;
                this.chart = new Chart(this.dayProduction);

                // day weather icons
                this.weatherIcons = [];
                for (let i = 0; i < 24; i += 3) {
                    const averageWeather = Math.round(
                        (this.dayWeather[i] + this.dayWeather[i + 1] + this.dayWeather[i + 2]) / 3
                    );
                    this.weatherIcons.push(
                        new WeatherIcon(i + 1.5, WeatherIcon.weatherTypes[averageWeather])
                    );
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    addDifferentTasks() {
        let tasks = [];
        while (tasks.length < 4) {
            const randomIndex = Math.floor(Math.random() * 6);
            const task = Task.tasks[randomIndex];

            let selectedIndex = tasks.findIndex((value) => value.getName() === task);

            if (selectedIndex === -1) {
                tasks.push(
                    new Task((this.cameraCanvasWidth / 5) * (tasks.length + 1), 200, task, this)
                );
            }
        }

        return tasks;
    }

    onTaskPlaced(hour: number) {
        const energyDelta = this.dayProduction[hour] - this.dayConsumption[hour];
        console.log(
            "[HAMUDI] Task placed at " +
                hour +
                " with money " +
                this.money +
                " and energy delta: " +
                energyDelta
        );
        if (energyDelta > 0) {
            this.networkInterface
                .addOrder({
                    user: "test", // TODO: Get user from login
                    price: 10, // TODO: decide on price
                    side: "sell",
                    security: "solar",
                    qty: energyDelta * 5, // TODO: decide on qty
                })
                .then((data) => {
                    // log here maybe
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (energyDelta < 0) {
            this.networkInterface
                .addOrder({
                    user: "test", // TODO: Get user from login
                    price: 10, // TODO: decide on price
                    side: "buy",
                    security: "coal",
                    qty: energyDelta * 5, // TODO: decide on qty
                })
                .then((data) => {
                    // log here maybe
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        this.money += Math.floor(energyDelta * 10 * 5); // * price * scale factor
        // this.money = -1; // use for testing game over transition
        console.log("[HAMUDI] Updating money at hour " + hour + " to " + this.money);

        if (this.money <= 0) {
            this.onGameOver();
        }

        this.gameEvents.onMoneyChange.next(this.money);
        console.log("[HAMUDI] Money is now " + this.money);
    }
}
