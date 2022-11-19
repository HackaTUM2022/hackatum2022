import { Entity } from "./entity";
import { Display } from "../display";
import { Controller } from "../controller";
import { v4 as uuid } from "uuid";
import { Game } from "../game";
import { MultiplayerController } from "../multiplayer";

export class Player2 implements Entity {
    x: number;
    y: number;
    id = uuid();

    game: Game;
    multiplayerController: MultiplayerController;

    width = 64;
    height = 64;

    constructor(game: Game, multiplayerController: MultiplayerController) {
        const multiplayerPos = multiplayerController.getMultiplayerData().player;
        this.x = multiplayerPos.x;
        this.y = multiplayerPos.y;
        this.game = game;
        this.multiplayerController = multiplayerController;
    }

    update(dt: number) {
        const convertRelativePos = (relPos: number, absLength: number, offset: number) =>
            relPos * absLength - offset;

        const multiplayerPos = this.multiplayerController.getMultiplayerData()?.player;
        this.x =
            convertRelativePos(multiplayerPos?.x, this.game.cameraCanvasWidth, this.width / 2) ||
            this.x;
        this.y =
            convertRelativePos(multiplayerPos?.y, this.game.cameraCanvasHeight, this.height / 2) ||
            this.y;
    }

    render(display: Display) {
        //Render the player to the screen
        // display.drawRectangle(this.x, this.y, this.width, this.height, "#0000FF");

        const multiplayerLandmarks =
            this.multiplayerController.getMultiplayerData().player.landmarks;

        const shoulders = multiplayerLandmarks.shoulders;
        const elbows = multiplayerLandmarks.elbows;
        const wrists = multiplayerLandmarks.wrists;
        const hips = multiplayerLandmarks.hips;

        const drawLine = (
            startPoint: { x: number; y: number },
            endPoint: { x: number; y: number }
        ) => {
            display.drawLine(
                display.relXToAbs(startPoint.x),
                display.relYToAbs(startPoint.y),
                display.relXToAbs(endPoint.x),
                display.relYToAbs(endPoint.y),
                "#FF0000"
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
