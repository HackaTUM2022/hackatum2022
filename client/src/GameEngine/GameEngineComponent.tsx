import "./GameEngineComponent.scss";
import React, { Component } from "react";
import { TrashGame } from "./trash-game";
import { GameOverPopUp } from "../components/GameOverPopUp/GameOverPopUp";
import { GameInfo } from "../components/GameInfo/GameInfo";

interface IProps { }

interface IState {
    bottomHeight: string;
    gameOverScore: number | undefined;
    score: number;
    days: number;
    money: number;
}

export class GameEngineComponent extends Component<IProps, IState> {
    game: TrashGame | undefined;
    serverId: string | undefined;

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            bottomHeight: "60px",
            gameOverScore: undefined,
            score: 0,
            days: 1,
            money: 100,
        };
        this.serverId = props.serverId;
    }

    render() {
        return (
            <div className="game-engine-component">
                <canvas></canvas>

                {this.state.gameOverScore !== undefined && (
                    <GameOverPopUp score={this.state.gameOverScore} />
                )}

                <GameInfo days={this.state.days} money={this.state.money} />
            </div>
        );
    }

    componentDidMount() {
        this.game = new TrashGame(this.serverId);
        (window as any).handsfree.unpause();

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

        window.addEventListener("resize", this.updateDimensions.bind(this));
        this.updateDimensions();
    }

    updateDimensions() {
        if (!this.game) return;
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
}
