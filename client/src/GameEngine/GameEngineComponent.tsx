import "./GameEngineComponent.scss";
import React, { Component } from "react";
import { TrashGame } from "./trash-game";
import { GameOverPopUp } from "../components/GameOverPopUp/GameOverPopUp";
import { GameInfo } from "../components/GameInfo/GameInfo";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";

interface IProps {}

interface IState {
    bottomHeight: string;
    gameOverScore: number | undefined;
    score: number;
    days: number;
    money: number;
    gameState: "initial" | "running";
    isExploding: boolean;
}

export class GameEngineComponent extends Component<IProps, IState> {
    game: TrashGame | undefined;
    handsfreeLoaded: boolean | undefined;

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            bottomHeight: "60px",
            gameOverScore: undefined,
            score: 0,
            days: 1,
            money: 100,
            gameState: "initial",
            isExploding: false,
        };
        this.handsfreeLoaded = props.handsfreeLoaded;
    }

    render() {
        return (
            <>
                {this.state.isExploding && (
                    <div className="confettis">
                        <ConfettiExplosion />
                    </div>
                )}
                {this.state.gameState === "initial" && (
                    <div className="start-screen-overlay">
                        <button
                            className="button"
                            onClick={() => {
                                this.setState({ gameState: "running" });
                                if (this.game !== undefined) {
                                    this.restartGame();

                                    if (!this.game) return;
                                    if (!this.game.game) return;

                                    let gameEvents = this.game.game.gameEvents;
                                    gameEvents.onGameOver.subscribe((score) => {
                                        this.setState({
                                            gameOverScore: score,
                                        });
                                    });
                                    gameEvents.onDaysChange.subscribe((days) => {
                                        this.setState({ days: days });
                                    });
                                    gameEvents.onMoneyChange.subscribe((money) => {
                                        this.setState({ money: money });
                                    });
                                    this.game.start();
                                }
                            }}
                            disabled={!this.handsfreeLoaded}
                        >
                            <span>{this.handsfreeLoaded ? "START GAME" : "LOADING MODEL..."}</span>
                        </button>
                    </div>
                )}

                <div
                    className="game-engine-component"
                    style={{
                        filter: this.state.gameState !== "running" ? "blur(30px)" : "none",
                    }}
                >
                    <canvas></canvas>

                    {this.state.gameOverScore !== undefined && (
                        <GameOverPopUp score={this.state.gameOverScore} />
                    )}

                    <GameInfo days={this.state.days} money={this.state.money} />
                </div>
            </>
        );
    }

    restartGame() {
        if (!this.game) return;
        this.game.restart();
    }

    componentDidMount() {
        this.game = new TrashGame();
        (window as any).handsfree.unpause();
        this.restartGame();

        window.addEventListener("resize", this.updateDimensions.bind(this));
        this.updateDimensions();
    }

    updateDimensions() {
        if (!this.game) return;
        if (!this.game.display) return;
        const height = this.game.display.cameraCanvasHeight;
        this.setState({
            bottomHeight: `calc(100vh - ${height}px + 5px)`,
        });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
        this.game?.stop();
        delete this.game;
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        console.log("componentDidUpdate", this.state.money);
        console.log("prevState", prevState.money);

        if (this.state.money > prevState.money) {
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa", this.state.money);
            console.log(this.state.isExploding);
            // Confetti !
            this.setState({ isExploding: true });
            setTimeout(() => {
                this.setState({ isExploding: false });
            }, 1500);
        }
    }
}
