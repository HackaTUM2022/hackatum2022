import { Subject } from "rxjs";

export class GameEventController {
    stop() {
        this.onGameOver.complete();
        this.onScorePoint.complete();
        this.onDaysChange.complete();
        this.onMoneyChange.complete();
    }

    /// Returns score on game over
    public onGameOver = new Subject<number>();
    public onScorePoint = new Subject<number>();
    public onDaysChange = new Subject<number>();
    public onMoneyChange = new Subject<number>();
}
