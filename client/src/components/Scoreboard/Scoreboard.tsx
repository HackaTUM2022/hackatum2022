import "./Scoreboard.scss";
import React, { Component } from "react";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";

interface IProps {
    score: number;
    adversaryScore: number;
    isMultiplayer: boolean;
}

interface IState {
    isExploding: boolean;
}

export class Scoreboard extends Component<IProps, IState> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            isExploding: false,
        };
    }

    render() {
        return (
            <div>
                {this.state.isExploding && (
                    <div className="confettis">
                        <ConfettiExplosion />
                    </div>
                )}
                <div className="scoreboard-container left">
                    <div className="score">
                        <p>
                            {this.props.isMultiplayer && (
                                <span className="multiplayer-label you">You: </span>
                            )}
                            Score: {this.props.score}
                        </p>
                    </div>
                </div>

                {this.props.isMultiplayer && (
                    <div className="scoreboard-container right">
                        <div className="score">
                            <p>
                                {this.props.isMultiplayer && (
                                    <span className="multiplayer-label">Adv: </span>
                                )}
                                Score: {this.props.adversaryScore}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    componentDidUpdate(prevProps: IProps) {
        if (this.props.score > prevProps.score) {
            // Confetti !
            this.setState({ isExploding: true });
            setTimeout(() => {
                this.setState({ isExploding: false });
            }, 1500);
        }
    }
}
