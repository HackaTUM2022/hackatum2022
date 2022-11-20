import "./GameOverPopUp.scss";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { sendDataToDatabase } from "../../Scoreboard/serverapi.js";
import Table from "rc-table";
interface IProps {
    score: number;
}

interface IState {
    username: string;
}

export class GameOverPopUp extends Component<IProps, IState> {
    data: { buyer: string; seller: string; security: string; qty: number; price: number }[];
    columns: { title: string; dataIndex: string; key: string; width: number }[];
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            username: "",
        };
        this.columns = [
            {
                title: "Buyer",
                dataIndex: "buyer",
                key: "buyer",
                width: 100,
            },
            {
                title: "Seller",
                dataIndex: "seller",
                key: "seller",
                width: 100,
            },
            {
                title: "Security",
                dataIndex: "security",
                key: "security",
                width: 100,
            },
            {
                title: "QTY",
                dataIndex: "qty",
                key: "qty",
                width: 100,
            },
            {
                title: "Price",
                dataIndex: "price",
                key: "price",
                width: 100,
            },
        ];

        this.data = [];
    }

    onSubmit(score: number, username: string) {
        if (!username) {
            username = "anonymous";
        }
        sendDataToDatabase(username, score);
    }

    updateInputValue(evt: any) {
        this.setState({
            username: evt.target.value,
        });
    }

    componentDidMount() {
        fetch("http://localhost:8080/matches")
            .then((response) => response.json())
            .then((data) => {
                this.data = data.data.filter(
                    (item: any) =>
                        item.buyer === this.state.username || item.seller === this.state.username
                );
            })
            .catch((error) => console.log(error));
    }

    render() {
        let title;
        title = "Game Over";

        return (
            <div className="container">
                <div className="gameover">
                    <h2>{title}</h2>
                    <p>{this.props.score} days survived!</p>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Table columns={this.columns} data={this.data} />
                    </div>

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
