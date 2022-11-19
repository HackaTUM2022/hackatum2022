import "./GameInfo.scss";
import React, { Component } from "react";

type Props = {
    days: number;
    money: number;
};

export const GameInfo = ({ days, money }: Props) => {
    return (
        <div>
            <div className="scoreboard-container right">
                <div className="score">
                    <p>Days: {days}</p>
                </div>
                <div className="score">
                    <p>Money: {money}</p>
                </div>
            </div>
        </div>
    );
};
