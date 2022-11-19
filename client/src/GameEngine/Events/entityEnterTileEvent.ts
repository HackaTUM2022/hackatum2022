import { Tile } from "../Entities/tile";
import { Player } from "../Entities/player";

export class EntityEnterTileEvent {
    tile: Tile;
    player: Player;

    constructor(tile: Tile, player: Player) {
        this.tile = tile;
        this.player = player;
    }
}
