import { Entity } from "./entity";
import { Display } from "../display";
import { Controller } from "../controller";
import { v4 as uuid } from "uuid";
import { Tile } from "./tile";
import { Game } from "../game";
import { EventManager } from "../Events/eventManager";
import { EntityEnterTileEvent } from "../Events/entityEnterTileEvent";
import { EntityLeaveTileEvent } from "../Events/entityLeaveTileEvent";
import { TrashItem } from "./trash-item";
import { getPlayerPostionData } from "../handsfreeController";

export class Player implements Entity {
    x: number;
    y: number;
    id = uuid();

    game: Game;
    width = 64;
    height = 64;
    currentTile: Tile | undefined;
    /// If the player is under the y threshold
    isInExercise = false;

    constructor(x: number, y: number, game: Game) {
        this.x = x;
        this.y = y;
        this.game = game;
    }

    update(dt: number) {
        const convertRelativePos = (relPos: number, absLength: number, offset: number) =>
            relPos * absLength - offset;
        const handsfreeX = (window as any).handsfree?.data?.pose?.poseLandmarks?.[0]?.x;
        const handsfreeY = (window as any).handsfree?.data?.pose?.poseLandmarks?.[0]?.y;
        this.x =
            convertRelativePos(1 - handsfreeX, this.game.cameraCanvasWidth, this.width / 2) ||
            this.x;
        this.y =
            convertRelativePos(handsfreeY, this.game.cameraCanvasHeight, this.height / 2) || this.y;

        // Get the current tile
        let oldTile = this.currentTile;
        this.currentTile = this.game.getTileByPos(this.x);
        if (oldTile !== this.currentTile) {
            if (oldTile) {
                EventManager.OnEntityLeaveTileEvent(new EntityLeaveTileEvent(oldTile, this));
            }
            EventManager.OnEntityEnterTileEvent(new EntityEnterTileEvent(this.currentTile, this));
        }

        if (this.game.isGamePaused) return;

        if (handsfreeY > 0.6 && !this.isInExercise) {
            this.isInExercise = true;
            let activeTrash = this.game.getActiveTrashIcon();
            if (activeTrash != null && activeTrash.category === this.currentTile.num) {
                // Put in the right basket
                this.game.addPoints(100);
                activeTrash.active = false;
                this.game.removeEntity(activeTrash.id);
                if (!this.game.isMultiplayer())
                    this.game.addEntity(TrashItem.createRandom(this.game));
                if (this.game.isMultiplayer()) {
                    if (this.game.multiplayerController.getMultiplayerData().isAlive) {
                        // Other player is alive: Then we send the item over to the other player
                        this.game.requestNewTrashItemForEnemy(
                            activeTrash.category,
                            activeTrash.name
                        );
                    } else {
                        // Enemy dead, then we get a new item
                        this.game.addEntity(TrashItem.createRandom(this.game));
                    }
                }
            } else if (activeTrash != null) {
                // Put in the wrong basket
                this.game.subtractLife();
                activeTrash.active = false;
                this.game.removeEntity(activeTrash.id);
                if (!this.game.isGameOver) {
                    if (!this.game.isMultiplayer() && this.game.amountOfTrashItems === 0) {
                        this.game.addEntity(TrashItem.createRandom(this.game));
                    }
                    if (this.game.isMultiplayer() && this.game.playerTrashItems.length === 0) {
                        this.game.addEntity(TrashItem.createRandom(this.game));
                    }
                }
            }
        } else if (handsfreeY < 0.4 && this.isInExercise) {
            this.isInExercise = false;
        }
    }

    render(display: Display) {
        //Render the player to the screen
        // display.drawRectangle(this.x, this.y, this.width, this.height, "#00FF00");

        const playerPositionLandmarks = getPlayerPostionData().landmarks;

        const shoulders = playerPositionLandmarks.shoulders;
        const elbows = playerPositionLandmarks.elbows;
        const wrists = playerPositionLandmarks.wrists;
        const hips = playerPositionLandmarks.hips;

        const drawLine = (
            startPoint: { x: number; y: number },
            endPoint: { x: number; y: number }
        ) => {
            display.drawLine(
                display.relXToAbs(startPoint.x),
                display.relYToAbs(startPoint.y),
                display.relXToAbs(endPoint.x),
                display.relYToAbs(endPoint.y),
                "#00FF00"
            );
        };

        drawLine(shoulders.left, shoulders.right);
        // left arm
        drawLine(shoulders.left, elbows.left);
        drawLine(elbows.left, wrists.left);

        // right arm
        drawLine(shoulders.right, elbows.right);
        drawLine(elbows.right, wrists.right);

        drawLine(shoulders.left, hips.left);
        drawLine(shoulders.right, hips.right);
        drawLine(hips.left, hips.right);
    }

    handleInput(controller: Controller) {}
}
