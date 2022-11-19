import { Subject } from "rxjs";

export class GameEventController {
    stop() {
        this.onGameOver.complete();
        this.onScorePoint.complete();
        this.onEnemyScoreChange.complete();
    }

    /// Returns score on game over
    public onGameOver = new Subject<number>();
    public onScorePoint = new Subject<number>();
    public onEnemyScoreChange = new Subject<number>();
}
