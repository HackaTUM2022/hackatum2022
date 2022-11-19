import { Entity } from "./entity";
import { Display } from "../display";
import { Controller } from "../controller";
import { v4 as uuid } from "uuid";
import { Game } from "../game";
import { getPlayerPostionData } from "../handsfreeController";

export class Player implements Entity {
    x: number;
    y: number;
    id = uuid();

    game: Game;
    width = 64;
    height = 64;
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


        if (this.game.isGamePaused) return;

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
