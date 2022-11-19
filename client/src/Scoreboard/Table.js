import { Component } from "react";
import "./Table.css";

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
    }

    getKeys = function () {
        return Object.keys(this.props.data[0]);
    };

    getHeader = function () {
        var keys = this.getKeys();
        return keys.map((key, index) => {
            return <th key={key}>{key.toUpperCase()}</th>;
        });
    };

    getRowsData = function () {
        var items = this.props.data;
        var keys = this.getKeys();
        return items.map((row, index) => {
            return (
                <tr key={index}>
                    <RenderRow key={index} data={row} keys={keys} index={index} />
                </tr>
            );
        });
    };
    render() {
        return (
            <div className="tableContainer">
                <div className="tablePlaceImages"></div>
                <table className="scoreboardTable">
                    <thead className="scoreboardThead">
                        <tr>{this.getHeader()}</tr>
                    </thead>
                    <tbody>{this.getRowsData()}</tbody>
                </table>
            </div>
        );
    }
}

const RenderRow = (props) => {
    return props.keys.map((key, index) => {
        if (props.index === 0 && index === 0) {
            return (
                <td key={props.data[key]}>
                    <img className="firstPlaceImg" alt="First place" src="/places/medal.png"></img>{" "}
                    {props.data[key]}
                </td>
            );
        } else if (props.index === 1 && index === 0) {
            return (
                <td key={props.data[key]}>
                    <img
                        className="firstPlaceImg"
                        alt="Second place"
                        src="/places/place2.png"
                    ></img>{" "}
                    {props.data[key]}
                </td>
            );
        } else if (props.index === 2 && index === 0) {
            return (
                <td key={props.data[key]}>
                    <img className="firstPlaceImg" alt="Third place" src="/places/place3.png"></img>{" "}
                    {props.data[key]}
                </td>
            );
        }
        return <td key={props.data[key]}>{props.data[key]}</td>;
    });
};
