import "./GameOverPopUp.scss";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { sendDataToDatabase } from "../../Scoreboard/serverapi.js";
interface IProps {
    score: number;
    adversaryScore: number;
    isMultiplayer: boolean;
}

interface IState {
    username: string;
}

export class GameOverPopUp extends Component<IProps, IState> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            username: "",
        };
    }

    onSubmit(score: number, username: string) {
        if (!username) {
            username = "anonymous";
        }

        console.log("score", score);
        console.log("username", username);
        sendDataToDatabase(username, score);
    }

    updateInputValue(evt: any) {
        this.setState({
            username: evt.target.value,
        });
    }

    render() {
        let title;
        if (!this.props.isMultiplayer) {
            title = "Game Over";
        } else {
            if (this.props.score > this.props.adversaryScore) {
                title = "You won !!!";
            } else {
                title = "Game Over";
            }
        }

        return (
            <div className="container">
                <div className="gameover">
                    <h2>{title}</h2>
                    <p>You got a score of {this.props.score}!</p>
                    <input
                        className="usernameInputEndGamePopup"
                        type="text"
                        placeholder="Your username"
                        value={this.state.username}
                        onChange={(evt) => this.updateInputValue(evt)}
                    />

                    <Link
                        to="/scoreboard"
                        className="scoreSubmitButton"
                        onClick={(event) => this.onSubmit(this.props.score, this.state.username)}
                    >
                        <span>Submit to Scoreboard!</span>
                    </Link>
                    {/* <button
                        className="scoreSubmitButton"
                        onClick={(event) => this.onSubmit(this.props.score, this.state.username)}
                    >
                        Submit to Scoreboard!
                    </button> */}

                    <div className="returnHomeButton">
                        <Link to="/" className="scoreSubmitButton">
                            <span>Return to Homepage</span>
                        </Link>

                        <Link to="/game" className="playAgainButton">
                            <span>Play Again!</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
