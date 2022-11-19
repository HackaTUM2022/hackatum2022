import "./GameOverPopUp.scss";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { sendDataToDatabase } from "../../Scoreboard/serverapi.js";
import Table from 'rc-table';
interface IProps {
    score: number;
}

interface IState {
    username: string;
}

export class GameOverPopUp extends Component<IProps, IState> {
    data: { buyer: string; seller: string; security: string; qty: number; price: number }[];
    columns: { title: string; dataIndex: string; key: string; width: number; }[];
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            username: "",
        };
        this.columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: 100,
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                width: 100,
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
                width: 100,
            },
            {
                title: 'Operations',
                dataIndex: '',
                key: 'operations',
                width: 100,
            },
        ];

        this.data = [
            { buyer: 'John Brown', seller: 'Jim Green', security: 'Apple', qty: 32, price: 100 },
            { buyer: 'John', seller: 'Jim', security: 'Ap', qty: 3, price: 10 },
        ];
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
        title = "Game Over";

        return (
            <div className="container">
                <div className="gameover">
                    <h2>{title}</h2>
                    <p>{this.props.score} days survived!</p>
                    <input
                        className="usernameInputEndGamePopup"
                        type="text"
                        placeholder="Your username"
                        value={this.state.username}
                        onChange={(evt) => this.updateInputValue(evt)}
                    />

                    <Table columns={this.columns} data={this.data} />

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
