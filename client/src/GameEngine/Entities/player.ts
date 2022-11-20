import { Entity } from "./entity";
import { Display } from "../display";
import { Controller } from "../controller";
import { v4 as uuid } from "uuid";
import { Game } from "../game";
import { getPlayerPostionData } from "../handsfreeController";
import { Task } from "./task";
import { Rectangle } from "./rectangle";

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

        if (this.firstTaskPose(this.display) && !this.game.tasks[0].selected) {
            const hour = Math.floor(this.game.time.getCurrentTimeInPercentOfDay() * 24);
            this.game.onTaskPlaced(hour);
            this.setSelectedPosition(this.game.tasks[0], this.display, 0);
        }

        if (this.secondTaskPose(this.display) && !this.game.tasks[1].selected) {
            const hour = Math.floor(this.game.time.getCurrentTimeInPercentOfDay() * 24);
            this.game.onTaskPlaced(hour);
            this.setSelectedPosition(this.game.tasks[1], this.display, 1);
        }

        if (this.thirdTaskPose(this.display) && !this.game.tasks[2].selected) {
            const hour = Math.floor(this.game.time.getCurrentTimeInPercentOfDay() * 24);
            this.game.onTaskPlaced(hour);
            this.setSelectedPosition(this.game.tasks[2], this.display, 2);
        }

        if (this.fourthTaskPose(this.display) && !this.game.tasks[3].selected) {
            const hour = Math.floor(this.game.time.getCurrentTimeInPercentOfDay() * 24);
            this.game.onTaskPlaced(hour);
            this.setSelectedPosition(this.game.tasks[3], this.display, 3);
        }
    }

    render(display: Display) {
        //Render the player to the screen
        const playerPositionLandmarks = getPlayerPostionData().landmarks;

        const shoulders = playerPositionLandmarks.shoulders;
        const elbows = playerPositionLandmarks.elbows;
        const wrists = playerPositionLandmarks.wrists;
        const hips = playerPositionLandmarks.hips;
        const indexFingers = playerPositionLandmarks.index_finger;

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

        const drawCircle = (point: { x: number; y: number }) => {
            display.drawCircle(
                display.relXToAbs(point.x),
                display.relYToAbs(point.y),
                20,
                "#FF2E2E"
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
        drawCircle(indexFingers.left);
        drawCircle(indexFingers.right);
    }

    handleInput(controller: Controller) {}

    setSelectedPosition(task: Task, display: Display, index: number) {
        const time = this.game.getTime().getCurrentTimeInPercentOfDay() * 24;
        const duration = task.getDuration(task.name);
        task.selected = true;

        const newX = display.getXPositionFromTime(time);
        const newY = display.getDrawableHeight() - 50;
        this.game.addToTimeLine(
            new Rectangle(
                newX,
                newY - index * task.height,
                display.getXPositionFromTime(time + (duration ? duration : 0)) - newX,
                task.height - 20,
                "#746C70",
                0.9,
                "#4E4F50"
            )
        );

        this.game.addToTimeLine(
            new Task(newX, newY - index * task.height - 10, task.name, this.game)
        );
    }

    playerTouchesTask(task: Task, display: Display) {
        const playerPositionLandmarks = getPlayerPostionData().landmarks;
        const indexFingers = playerPositionLandmarks.index_finger;

        const correctLeftY =
            display.relYToAbs(indexFingers.left.y) >= task.y &&
            display.relYToAbs(indexFingers.left.y) <= task.y + task.height;
        const correctLeftX =
            task.x <= display.relXToAbs(indexFingers.left.x) &&
            display.relXToAbs(indexFingers.left.x) <= task.x + task.width;

        const correctRightY =
            display.relYToAbs(indexFingers.right.y) >= task.y &&
            display.relYToAbs(indexFingers.right.y) <= task.y + task.height;
        const correctRightX =
            task.x <= display.relXToAbs(indexFingers.right.x) &&
            display.relXToAbs(indexFingers.right.x) <= task.x + task.width;

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
