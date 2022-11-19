import { Entity } from "./entity";
import { Display } from "../display";
import { Controller } from "../controller";
import { v4 as uuid } from "uuid";
import { Game } from "../game";
import { getPlayerPostionData } from "../handsfreeController";
import { Task } from "./task";

export class Player implements Entity {
    x: number;
    y: number;
    id = uuid();
    display: Display;
    game: Game;
    width = 64;
    height = 64;
    /// If the player is under the y threshold
    isInExercise = false;

    constructor(x: number, y: number, game: Game, display: Display) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.display = display;
    }

    convertRelativePos(relPos: number, absLength: number, offset: number) {
        return relPos * absLength - offset;
    }

    update(dt: number) {
        const handsfreeX = (window as any).handsfree?.data?.pose?.poseLandmarks?.[0]?.x;
        const handsfreeY = (window as any).handsfree?.data?.pose?.poseLandmarks?.[0]?.y;
        this.x =
            this.convertRelativePos(1 - handsfreeX, this.game.cameraCanvasWidth, this.width / 2) ||
            this.x;
        this.y =
            this.convertRelativePos(handsfreeY, this.game.cameraCanvasHeight, this.height / 2) ||
            this.y;

        if (this.game.isGamePaused) return;

        if (this.firstTaskPose(this.display)) {
            // console.log("FIRST");
        }

        if (this.secondTaskPose(this.display)) {
            // console.log("SECOND");
        }

        if (this.thirdTaskPose(this.display)) {
            // console.log("THIRD");
        }

        if (this.fourthTaskPose(this.display)) {
            // console.log("FOURTH");
        }
    }

    render(display: Display) {
        //Render the player to the screen
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

    playerTouchesTask(task: Task, display: Display) {
        const playerPositionLandmarks = getPlayerPostionData().landmarks;
        const wrists = playerPositionLandmarks.wrists;

        const correctLeftY =
            display.relYToAbs(wrists.left.y) >= task.y &&
            display.relYToAbs(wrists.left.y) <= task.y + task.height;
        const correctLeftX =
            task.x <= display.relXToAbs(wrists.left.x) &&
            display.relXToAbs(wrists.left.x) <= task.x + task.width;

        const correctRightY =
            display.relYToAbs(wrists.right.y) >= task.y &&
            display.relYToAbs(wrists.right.y) <= task.y + task.height;
        const correctRightX =
            task.x <= display.relXToAbs(wrists.right.x) &&
            display.relXToAbs(wrists.right.x) <= task.x + task.width;

        return (correctLeftX && correctLeftY) || (correctRightY && correctRightX);
    }

    firstTaskPose(display: Display) {
        return this.playerTouchesTask(this.game.tasks[0], display);
    }

    secondTaskPose(display: Display) {
        return this.playerTouchesTask(this.game.tasks[1], display);
    }

    thirdTaskPose(display: Display) {
        return this.playerTouchesTask(this.game.tasks[2], display);
    }

    fourthTaskPose(display: Display) {
        return this.playerTouchesTask(this.game.tasks[3], display);
    }
}
