import "./GameOverPopUp.scss";
import React, { Component, useEffect, useState } from "react";

import Table from "rc-table";

type Props = {
    score: number;
};

const GameOverPopUp = ({ score }: Props) => {
    const username = "";
    const defaultColumns = [
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

    const [columns, setColumns] = useState(defaultColumns);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/matches")
            .then((response) => response.json())
            .then((data) => {
                const newData = data.data.filter(
                    (item: any) => item.buyer === username || item.seller === username || true
                );
                setData(newData);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="container">
            <div className="gameover">
                <h2>Game Over</h2>
                <p>{score} days survived!</p>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Table columns={columns} data={data} />
                </div>
            </div>
        </div>
    );
};

export default GameOverPopUp;
