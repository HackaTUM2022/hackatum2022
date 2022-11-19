import { Controller } from "./controller";
import { Display } from "./display";
import { Game } from "./game";
import { Engine } from "./engine";

export class TrashGame {
    constructor(serverId) {
        /* Controller handles user input */
        this.controller = new Controller();
        /* Display handles window resizing */
        this.display = new Display(document.querySelector("canvas"));

        /* Display handles the game logic */
        this.game = new Game(this.display, serverId);

        let fps = 30;
        /* Engine combines the controller, display and game */
        this.engine = new Engine(
            1000 / fps,
            this.renderGame.bind(this),
            this.updateGame.bind(this),
            this.onStart.bind(this),
        );

        window.addEventListener("resize", this.resize.bind(this));
        window.addEventListener("keydown", this.keyDown.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this));

        this.resize();
        this.engine.start();
    }

    onStart(time_stamp) {
        if(this.game !== undefined) 
            this.game.onStart(time_stamp);
    }

    // Gets called before render, updates things like position of entities
    updateGame(time_stamp) {
        if (this.game === undefined) {
            return;
        }

        this.game.update(time_stamp);
        this.game.handleInput(this.controller);
    }

    // Renders the entities etc at their position
    renderGame(time_stamp) {
        if (this.game === undefined) {
            return;
        }

        this.display.clear();

        this.game.render(this.display);

        this.display.render();
    }

    resize(event) {
        //the events default action should not be taken as it normally would be
        if (event) event.preventDefault();

        let height, width;

        height = document.documentElement.clientHeight;
        width = document.documentElement.clientWidth;

        if (this.display) {
            // Update the correct values on the display class
            this.display.resize(width, height);
        }

        if (this.game) {
            // Finally tell the game that a resize happened
            this.game.resizeEvent(this.display);
        }
    }

    keyDown(event) {
        // event.preventDefault()

        this.triggerController(event.keyCode, true);
    }

    keyUp(event) {
        // event.preventDefault()
        this.triggerController(event.keyCode, false);
    }

    triggerController(keyCode, status) {
        if (this.controller === undefined) return;

        switch (keyCode) {
            case 90:
                this.controller.up.trigger(status);
                break;
            case 81:
                this.controller.left.trigger(status);
                break;
            case 68:
                this.controller.right.trigger(status);
                break;
            case 83:
                this.controller.down.trigger(status);
                break;
            case 32:
                this.controller.space.trigger(status);
                break;
            case 13:
                this.controller.enter.trigger(status);
                break;
            default:
                break;
        }
    }

    stop() {
        window.removeEventListener("resize", this.resize.bind(this));
        window.removeEventListener("keydown", this.keyDown.bind(this));
        window.removeEventListener("keyup", this.keyUp.bind(this));

        this.game.stop();

        delete this.controller;
        delete this.display;
        delete this.engine;
        delete this.game;
    }
}
