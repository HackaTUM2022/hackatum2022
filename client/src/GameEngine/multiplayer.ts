import { useState } from "react";
import socketIOClient from "socket.io-client";
import { Game } from "./game";
import { getPlayerPostionData, PlayerPostionData } from "./handsfreeController";
import { TrashItem } from "./Entities/trash-item";

const ENDPOINT = "https://sheltered-forest-46021.herokuapp.com/";
// const ENDPOINT = "http://localhost:8080";

const socket = socketIOClient(ENDPOINT);

export function useMultiplayerId() {
    const [id, setId] = useState(socket.id);

    socket.on("connect", () => {
        setId(socket.id);
    });

    return id;
}

export class MultiplayerController {
    private multiplayerData: {
        player: PlayerPostionData;
        trash_items: any[];
        new_item: { cat: number; name: string };
        score: number;
        isAlive: boolean;
    };
    private oldScore = -1;
    private game: Game;
    constructor(game: Game) {
        this.game = game;
        // this format has to be same as in game.ts (requestBody)
        this.multiplayerData = {
            player: getPlayerPostionData(),
            trash_items: [],
            new_item: { cat: -1, name: "" },
            score: 0,
            isAlive: true,
        };

        socket.on("game update", (body) => {
            this.multiplayerData = body;
            game.updateMultiplayerTrashItems(body.trash_items);

            if (body.score !== this.oldScore) {
                this.game.gameEvents.onEnemyScoreChange.next(body.score);
                this.oldScore = body.score;
            }
            if (body.new_item.cat >= 0) {
                let trash = TrashItem.createRandom(this.game);
                trash.category = body.new_item.cat;
                trash.name = body.new_item.name;
                game.addEntity(trash);
            }
        });
    }

    public getMultiplayerData = () => {
        return this.multiplayerData;
    };
}

export default socket;
