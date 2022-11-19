import { EntityEnterTileEvent } from "./entityEnterTileEvent";
import { EntityLeaveTileEvent } from "./entityLeaveTileEvent";

export class EventManager {
    static OnEntityEnterTileEvent(e: EntityEnterTileEvent) {
        e.tile.containsPlayer = true;
    }

    static OnEntityLeaveTileEvent(e: EntityLeaveTileEvent) {
        e.tile.containsPlayer = false;
    }
}
