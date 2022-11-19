import { Entity } from "./entity";
import { Display } from "../display";
import { v4 as uuid } from "uuid";
import { Game } from "../game";

export class TrashItem implements Entity {
    private static categories = ["restmuell", "gelbersack", "bio"];
    private static names = [
        ["cigarette", "diapers", "gallery", "light-bulb", "pen", "poop", "porcelain"],
        ["can", "food-container", "milk", "shopping-bag", "takeaway-cups", "toothpaste"],
        ["apple", "drip", "green-tea", "orange", "tea"],
    ];

    width = 64;
    height = 64;
    id = uuid();
    name: string;
    category: number;
    game: Game;
    active = true;
    enemy: boolean;

    get isFollowingPlayer(): boolean {
        let iconId = this.game.getActiveTrashIcon()?.id;
        return !iconId ? false : iconId === this.id;
    }

    x = 0;
    y = 0;
    spawnX = 0;

    private readonly startVelocity = 0.2;
    private get maxVelocity() {
        return this.level * 3;
    }
    private velocityY = this.startVelocity;
    private level: number; // 1 easiest - 10 hardest

    // Either tile 1 2 or 3
    private selectedTile = 2;
    private elapsedTime = 0;

    // Tile Transition
    private tileTransitionStartTime = 0;
    private readonly tileTransitionDuration = 0.5 * 1000; // 0.5s
    private tileTransitionStartX = 0;

    constructor(
        x: number,
        y: number,
        category: number,
        name: string,
        enemy: boolean,
        game: Game,
        level: number = 1
    ) {
        this.x = x;
        this.y = y;
        this.spawnX = x;
        this.category = category;
        this.name = name;
        this.enemy = enemy;
        this.game = game;
        this.level = level;
    }

    render(display: Display): void {
        if (this.game.isMultiplayer()) {
            /*display.drawCircle(
                this.x - this.width / 2 - 8,
                this.y - this.height / 2 - 8,
                this.width / 2 + 8,
                this.enemy ? "rgba(255, 0, 0, 0.5)" : "rgba(0,255,0,0.5)"
            );*/
            display.drawImage(
                this.x - (this.width + 64) / 2,
                this.y - (this.height + 64) / 2,
                this.width + 64,
                this.height + 64,
                this.enemy ? "red.png" : "green.png"
            );
        }
        display.drawImage(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height,
            TrashItem.categories[this.category] + "/" + this.name + ".png"
        );
    }

    update(dt: number): void {
        this.elapsedTime += dt;

        if (this.active) {
            const convertRelativePos = (relPos: number, absLength: number) => relPos * absLength;
            const handsfreeX = (window as any).handsfree?.data?.pose?.poseLandmarks?.[0]?.x;
            const convertedX =
                convertRelativePos(1 - handsfreeX, this.game.cameraCanvasWidth) || this.x;

            let newSelectedTile;
            if (convertedX < this.game.currentWidth * 0.333) {
                newSelectedTile = 1;
            } else if (convertedX < this.game.currentWidth * 0.666) {
                newSelectedTile = 2;
            } else {
                newSelectedTile = 3;
            }

            if (this.isFollowingPlayer) {
                if (this.selectedTile !== newSelectedTile) {
                    // Tile changed since last time
                    this.selectedTile = newSelectedTile;

                    this.tileTransitionStartX = this.x;

                    // Transition between the tiles on the x axis
                    this.tileTransitionStartTime = this.elapsedTime;
                    this.doTileTransition(dt);
                } else if (
                    this.elapsedTime <
                    this.tileTransitionStartTime + this.tileTransitionDuration
                ) {
                    this.doTileTransition(dt);
                } else {
                    // Tile the same as before

                    this.x = this.getTileCenter(this.selectedTile);

                    // "Leaf swing" animation
                    this.x = TrashItem.getPositionX(this.x, this.elapsedTime);
                }
            } else {
                // "Leaf swing" animation
                this.x = TrashItem.getPositionX(this.spawnX, this.elapsedTime);
            }

            // Adapt the speed depending on height, so that it always takes same amount of time
            // for different heights of screens
            let heightRatio = this.game.cameraCanvasHeight / 1080;

            if (this.velocityY < this.maxVelocity) {
                this.velocityY += dt * 0.003 * this.level * 0.5 * heightRatio;
            }

            if (!this.enemy) this.y += this.velocityY;

            // If the user didn't squat before end of the game
            if (this.y + this.height / 2 >= this.game.cameraCanvasHeight) {
                this.game.subtractLife();
                this.active = false;
                this.game.removeEntity(this.id);
                if (!this.game.isGameOver) {
                    this.game.addEntity(TrashItem.createRandom(this.game));
                }
            }
        }
    }

    /// Returns the positionX at a given time
    private static getPositionX(x: number, elapsedTime: number) {
        return x + Math.sin(elapsedTime * 0.002) * 50;
    }

    private getTileCenter(tileId: number) {
        return this.game.currentWidth * (0.333 * tileId - 0.166);
    }

    private doTileTransition(dt: number) {
        if (this.enemy) return;
        let startX = this.tileTransitionStartX;
        let endTileCenter = this.getTileCenter(this.selectedTile);
        let endX = TrashItem.getPositionX(
            endTileCenter,
            this.tileTransitionStartTime + this.tileTransitionDuration
        );

        let t = (this.elapsedTime - this.tileTransitionStartTime) / this.tileTransitionDuration;

        // Interpolate between start and endX
        this.x = startX + t * (endX - startX);
    }

    static createRandom(game: Game) {
        let x = Math.floor(Math.random() * (game.cameraCanvasWidth - 100) + 50);
        let cat = Math.floor(Math.random() * 3);
        return new TrashItem(
            x,
            0,
            cat,
            TrashItem.names[cat][Math.floor(Math.random() * TrashItem.names[cat].length)],
            false,
            game,
            game.difficultyLevel
        );
    }

    static getImagesToLoad() {
        let paths = [];
        for (let i = 0; i < this.categories.length; i++) {
            for (let j = 0; j < this.names[i].length; j++) {
                paths.push(this.categories[i] + "/" + this.names[i][j] + ".png");
            }
        }
        return paths;
    }
}
